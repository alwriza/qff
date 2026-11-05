import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  client ??= neon(connectionString);
  return client;
}

export function ensureHackathonSchema() {
  if (schemaReady) return schemaReady;
  const sql = getDatabase();
  schemaReady = (async () => {
    await sql`CREATE SCHEMA IF NOT EXISTS hackathon`;
    await sql`
      CREATE TABLE IF NOT EXISTS hackathon.registrations (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        full_name VARCHAR(120) NOT NULL CHECK (LENGTH(BTRIM(full_name)) > 0),
        participant_1_full_name VARCHAR(120) NOT NULL CHECK (LENGTH(BTRIM(participant_1_full_name)) > 0),
        participant_2_full_name VARCHAR(120) NOT NULL CHECK (LENGTH(BTRIM(participant_2_full_name)) > 0),
        captain_telegram VARCHAR(33) NOT NULL
          CHECK (captain_telegram ~ '^@[A-Za-z][A-Za-z0-9_]{4,31}$'),
        captain_email VARCHAR(254) NOT NULL CHECK (LENGTH(BTRIM(captain_email)) > 0),
        team_name VARCHAR(120) NOT NULL CHECK (LENGTH(BTRIM(team_name)) > 0),
        participation_format VARCHAR(7) NOT NULL
          CHECK (participation_format IN ('offline', 'online'))
      )
    `;
    await sql`
      ALTER TABLE hackathon.registrations
        ADD COLUMN IF NOT EXISTS participant_1_full_name VARCHAR(120)
          CHECK (LENGTH(BTRIM(participant_1_full_name)) > 0),
        ADD COLUMN IF NOT EXISTS participant_2_full_name VARCHAR(120)
          CHECK (LENGTH(BTRIM(participant_2_full_name)) > 0)
    `;
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS hackathon_captain_email_unique
      ON hackathon.registrations (LOWER(captain_email))
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS hackathon_registrations_created_at_idx
      ON hackathon.registrations (created_at DESC)
    `;
  })().catch((error) => {
    schemaReady = null;
    throw error;
  });
  return schemaReady;
}
