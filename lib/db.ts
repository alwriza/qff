import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  client ??= neon(connectionString);
  return client;
}

export function ensureRegistrationSchema() {
  if (schemaReady) return schemaReady;

  const sql = getDatabase();
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        full_name VARCHAR(120) NOT NULL,
        email VARCHAR(254) NOT NULL,
        messenger VARCHAR(120) NOT NULL,
        institution VARCHAR(200) NOT NULL,
        education_level VARCHAR(20) NOT NULL,
        course_or_grade VARCHAR(60) NOT NULL,
        english_level VARCHAR(20) NOT NULL,
        quantum_level VARCHAR(24) NOT NULL,
        python_level VARCHAR(20) NOT NULL,
        attendance_commitment VARCHAR(20) NOT NULL,
        city VARCHAR(120) NOT NULL,
        travel_readiness VARCHAR(24) NOT NULL,
        heard_from VARCHAR(24) NOT NULL,
        comments VARCHAR(1500),
        locale VARCHAR(2) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'new'
      )
    `;
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS registrations_email_unique
      ON registrations (LOWER(email))
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS registrations_created_at_idx
      ON registrations (created_at DESC)
    `;
  })().catch((error) => {
    schemaReady = null;
    throw error;
  });

  return schemaReady;
}
