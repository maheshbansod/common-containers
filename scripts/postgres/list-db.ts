#!/usr/bin/env deno run --allow-net --allow-env

import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

async function listDatabases() {
  const client = new Client({
    hostname: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    // List all databases
    const result = await client.queryArray`
      SELECT datname 
      FROM pg_database 
      WHERE datistemplate = false 
      ORDER BY datname
    `;

    console.log("\nAvailable databases:");
    console.log("==================");
    
    if (result.rows.length === 0) {
      console.log("No databases found");
    } else {
      result.rows.forEach((row, index) => {
        console.log(`${index + 1}. ${row[0]}`);
      });
    }
  } catch (error) {
    console.error("Error listing databases:", error instanceof Error ? error.message : String(error));
    Deno.exit(1);
  } finally {
    await client.end();
  }
}

await listDatabases();