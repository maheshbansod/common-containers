#!/usr/bin/env deno run --allow-net --allow-env

import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

async function createDatabase(dbName: string) {
  if (!dbName) {
    console.error("Error: Database name is required");
    console.log("Usage: deno task create-db <database_name>");
    Deno.exit(1);
  }

  const client = new Client({
    hostname: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  });

  try {
    await client.connect();
    console.log(`Connected to PostgreSQL`);

    // Check if database already exists
    const result = await client.queryArray`
      SELECT 1 FROM pg_database WHERE datname = ${dbName}
    `;

    if (result.rows.length > 0) {
      console.log(`Database '${dbName}' already exists`);
      return;
    }

    // Create the database
    await client.queryArray(`CREATE DATABASE "${dbName}"`);
    console.log(`Database '${dbName}' created successfully`);
  } catch (error) {
    console.error("Error creating database:", error instanceof Error ? error.message : String(error));
    Deno.exit(1);
  } finally {
    await client.end();
  }
}

// Get database name from command line arguments
const dbName = Deno.args[0];
await createDatabase(dbName);