CREATE SCHEMA IF NOT EXISTS hackathon;

CREATE TABLE IF NOT EXISTS hackathon.registrations (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name VARCHAR(120) NOT NULL CHECK (LENGTH(BTRIM(full_name)) > 0),
  captain_telegram VARCHAR(33) NOT NULL
    CHECK (captain_telegram ~ '^@[A-Za-z][A-Za-z0-9_]{4,31}$'),
  captain_email VARCHAR(254) NOT NULL CHECK (LENGTH(BTRIM(captain_email)) > 0),
  team_name VARCHAR(120) NOT NULL CHECK (LENGTH(BTRIM(team_name)) > 0),
  participation_format VARCHAR(7) NOT NULL
    CHECK (participation_format IN ('offline', 'online'))
);

CREATE UNIQUE INDEX IF NOT EXISTS hackathon_captain_email_unique
  ON hackathon.registrations (LOWER(captain_email));

CREATE INDEX IF NOT EXISTS hackathon_registrations_created_at_idx
  ON hackathon.registrations (created_at DESC);
