import { NextResponse } from "next/server";
import { ensureHackathonSchema, getDatabase } from "@/lib/db";
import { parseHackathonRegistration } from "@/lib/hackathon-registration";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 8192) {
      return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
  }
  const registration = parseHackathonRegistration(body);
  if (!registration) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  try {
    await ensureHackathonSchema();
    const sql = getDatabase();
    const { fullName, participant1FullName, participant2FullName, captainTelegram, captainEmail, teamName, participationFormat } = registration;
    const rows = await sql`
      INSERT INTO hackathon.registrations
        (full_name, participant_1_full_name, participant_2_full_name, captain_telegram, captain_email, team_name, participation_format)
      VALUES (${fullName}, ${participant1FullName}, ${participant2FullName}, ${captainTelegram}, ${captainEmail}, ${teamName}, ${participationFormat})
      ON CONFLICT (LOWER(captain_email)) DO NOTHING
      RETURNING id
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "duplicate_email" }, { status: 409 });
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    console.error("Failed to save hackathon registration");
    return NextResponse.json({ error: "registration_failed" }, { status: 500 });
  }
}
