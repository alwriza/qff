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
);

CREATE UNIQUE INDEX IF NOT EXISTS registrations_email_unique
  ON registrations (LOWER(email));

CREATE INDEX IF NOT EXISTS registrations_created_at_idx
  ON registrations (created_at DESC);
