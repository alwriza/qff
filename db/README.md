# Hackathon registration

The form at `/ru/register`, `/kk/register`, and `/en/register` submits to
`POST /api/registrations`. It stores the full names of the captain and two participants, the captain's Telegram
username and email, team name, and participation format (`offline` or `online`).

## Database setup

1. Set `DATABASE_URL` (or `POSTGRES_URL`) to the Neon/PostgreSQL connection string.
2. Run `db/hackathon.sql` in the database SQL editor. It creates the
   `hackathon` schema, `hackathon.registrations` table, and indexes.
   For an existing table, the same script adds the two participant columns.
   Alternatively run `db/migrations/001_add_hackathon_participants.sql`. Existing
   applications retain NULL participant names; new submissions require all three names.
3. Deploy the updated application with the same connection string.

The application also initializes this schema on the first valid submission if
its database role has schema/table creation permissions. The SQL script can be
run repeatedly. Existing festival applications in `public.registrations` remain
in their original table; `db/schema.sql` describes that legacy table.

Each captain email can register one team. Email uniqueness is case insensitive.
Telegram handles are accepted with or without `@` and stored with `@`.

## Verification

```sh
node --test tests/hackathon-registration.test.cjs
npx tsc --noEmit
npm run build
```

The automated API tests mock the database. To verify a real deployment, submit
a team, check its row in `hackathon.registrations`, then repeat the email and
confirm that the form reports a duplicate.
