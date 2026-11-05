export function parseHackathonRegistration(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const read = (key: string) => typeof data[key] === "string" ? data[key].trim() : "";
  const fullName = read("fullName");
  const participant1FullName = read("participant1FullName");
  const participant2FullName = read("participant2FullName");
  const telegram = read("captainTelegram").replace(/^@/, "");
  const captainEmail = read("captainEmail").toLowerCase();
  const teamName = read("teamName");
  const participationFormat = read("participationFormat");

  if (
    [fullName, participant1FullName, participant2FullName].some(name => !name || Array.from(name).length > 120) ||
    !/^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(telegram) ||
    captainEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captainEmail) ||
    !teamName || Array.from(teamName).length > 120 ||
    (participationFormat !== "offline" && participationFormat !== "online")
  ) return null;

  return { fullName, participant1FullName, participant2FullName, captainTelegram: `@${telegram}`, captainEmail, teamName, participationFormat };
}
