#!/usr/bin/env deno run --allow-read



import { parse } from "@std/toml";

const configPath = `${Deno.cwd()}/config/services.toml`;
const configContent = await Deno.readTextFile(configPath);
const config = parse(configContent) as any;

function generatePostgresEnv(postgres: any): string {
  const lines = [
    "# PostgreSQL Connection",
    `POSTGRES_HOST=${postgres.host}`,
    `POSTGRES_PORT=${postgres.port}`,
    `POSTGRES_USER=${postgres.default_user}`,
    `POSTGRES_PASSWORD=${postgres.default_password}`,
    `POSTGRES_DB=${postgres.default_database}`,
    "# Required project config",
    "POSTGRES_DB_NAME=your_database_name",
    "",
  ];
  return lines.join("\n");
}

function generateMongoEnv(mongodb: any): string {
  const lines = [
    "# MongoDB Connection",
    `MONGODB_HOST=${mongodb.host}`,
    `MONGODB_PORT=${mongodb.port}`,
    `MONGODB_USER=${mongodb.default_user}`,
    `MONGODB_PASSWORD=${mongodb.default_password}`,
    `MONGODB_AUTH_DATABASE=${mongodb.auth_database}`,
    "# Required project config",
    "MONGODB_DB_NAME=your_database_name",
    "",
  ];
  return lines.join("\n");
}

function generateRedisEnv(redis: any): string {
  const lines = [
    "# Redis Connection",
    `REDIS_HOST=${redis.host}`,
    `REDIS_PORT=${redis.port}`,
    `REDIS_PASSWORD=${redis.default_password}`,
    // "# Required project config",
    // "REDIS_DB_INDEX=your_redis_db_index",
    "",
  ];
  return lines.join("\n");
}

function main() {
  const envLines: string[] = [];

  if (config.postgres) {
    envLines.push(generatePostgresEnv(config.postgres));
  }

  if (config.mongodb) {
    envLines.push(generateMongoEnv(config.mongodb));
  }

  if (config.redis) {
    envLines.push(generateRedisEnv(config.redis));
  }

  console.log(envLines.join("\n").trim());
}

await main();
