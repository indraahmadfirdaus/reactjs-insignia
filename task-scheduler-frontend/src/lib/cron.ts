// Utilities for normalizing and validating standard 5-field cron expressions
// minute hour day-of-month month day-of-week

const TOKEN_RE = /^[A-Za-z0-9*/?,#LW-]+$/; // allow common cron tokens and names

export function normalizeCron(input: string): string {
  const trimmed = input.replace(/\s+/g, " ").trim();
  if (!trimmed) return "";
  const parts = trimmed.split(" ");
  // Handle crons with seconds (6) or with year (7)
  if (parts.length === 6) {
    // drop seconds
    return parts.slice(1).join(" ");
  }
  if (parts.length >= 7) {
    // drop seconds and/or year if present; keep first 5 meaningful fields
    return parts.slice(parts.length - 6, parts.length - 1).slice(1).join(" ");
  }
  if (parts.length > 5) {
    return parts.slice(0, 5).join(" ");
  }
  return parts.join(" ");
}

export function isValidCron(cron: string): boolean {
  const parts = cron.split(" ");
  if (parts.length !== 5) return false;
  return parts.every((p) => TOKEN_RE.test(p));
}