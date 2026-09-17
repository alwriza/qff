import { NextResponse } from "next/server";
import { ensureRegistrationSchema, getDatabase } from "@/lib/db";

export const runtime = "nodejs";

const allowed = {
  educationLevel: ["school", "bachelor", "graduate", "other"],
  englishLevel: ["a1a2", "b1b2", "c1c2", "not_sure"],
  quantumLevel: ["none", "heard", "course", "qiskit"],
  pythonLevel: ["none", "basic", "intermediate", "advanced"],
  attendanceCommitment: ["all", "most", "unsure"],
  travelReadiness: ["in_astana", "can_travel", "unconfirmed"],
  heardFrom: ["university", "social", "community", "friend", "search", "other"],
  locale: ["en", "ru", "kk"],
} as const;

const textLimits = {
  fullName: 120,
  email: 254,
  messenger: 120,
  institution: 200,
  courseOrGrade: 60,
  city: 120,
  comments: 1500,
} as const;

type Payload = Record<string, unknown>;

function cleanText(value: unknown, max: number, optional = false) {
  if (typeof value !== "string") return optional ? "" : null;
  const clean = value.trim().replace(/\s+/g, " ");
  if ((!optional && !clean) || clean.length > max) return null;
  return clean;
}

function allowedValue<K extends keyof typeof allowed>(
  body: Payload,
  key: K,
) {
  const value = body[key];
  return typeof value === "string" && (allowed[key] as readonly string[]).includes(value)
    ? value
    : null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "invalid_request" }, { status: 413 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // Hidden field: bots tend to fill it, people never see it.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const fullName = cleanText(body.fullName, textLimits.fullName);
  const email = cleanText(body.email, textLimits.email)?.toLowerCase() ?? null;
  const messenger = cleanText(body.messenger, textLimits.messenger);
  const institution = cleanText(body.institution, textLimits.institution);
  const courseOrGrade = cleanText(body.courseOrGrade, textLimits.courseOrGrade);
  const city = cleanText(body.city, textLimits.city);
  const comments = cleanText(body.comments, textLimits.comments, true);
  const educationLevel = allowedValue(body, "educationLevel");
  const englishLevel = allowedValue(body, "englishLevel");
  const quantumLevel = allowedValue(body, "quantumLevel");
  const pythonLevel = allowedValue(body, "pythonLevel");
  const attendanceCommitment = allowedValue(body, "attendanceCommitment");
  const travelReadiness = allowedValue(body, "travelReadiness");
  const heardFrom = allowedValue(body, "heardFrom");
  const locale = allowedValue(body, "locale");

  const validEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const consent = body.consent === true;

  if (
    !fullName ||
    !validEmail ||
    !messenger ||
    !institution ||
    !educationLevel ||
    !courseOrGrade ||
    !englishLevel ||
    !quantumLevel ||
    !pythonLevel ||
    !attendanceCommitment ||
    !city ||
    !travelReadiness ||
    !heardFrom ||
    comments === null ||
    !locale ||
    !consent
  ) {
    return NextResponse.json({ error: "validation_error" }, { status: 400 });
  }

  try {
    await ensureRegistrationSchema();
    const sql = getDatabase();
    const rows = await sql`
      INSERT INTO registrations (
        full_name, email, messenger, institution, education_level,
        course_or_grade, english_level, quantum_level, python_level,
        attendance_commitment, city, travel_readiness, heard_from,
        comments, locale
      ) VALUES (
        ${fullName}, ${email}, ${messenger}, ${institution}, ${educationLevel},
        ${courseOrGrade}, ${englishLevel}, ${quantumLevel}, ${pythonLevel},
        ${attendanceCommitment}, ${city}, ${travelReadiness}, ${heardFrom},
        ${comments || null}, ${locale}
      )
      ON CONFLICT DO NOTHING
      RETURNING id
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "duplicate_email" }, { status: 409 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Registration submission failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
