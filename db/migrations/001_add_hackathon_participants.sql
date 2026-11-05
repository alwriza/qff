-- Existing applications keep NULL for participants whose names were not collected.
ALTER TABLE hackathon.registrations
  ADD COLUMN IF NOT EXISTS participant_1_full_name VARCHAR(120)
    CHECK (LENGTH(BTRIM(participant_1_full_name)) > 0),
  ADD COLUMN IF NOT EXISTS participant_2_full_name VARCHAR(120)
    CHECK (LENGTH(BTRIM(participant_2_full_name)) > 0);
