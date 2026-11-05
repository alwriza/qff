"use client";

import { FormEvent, useState } from "react";
import type { RegistrationCopy } from "@/config/registration";

export default function RegistrationForm({ copy }: { copy: RegistrationCopy }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error" | "duplicate">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;
    const form = event.currentTarget;
    setState("submitting");
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      if (response.ok) {
        form.reset();
        setState("success");
      } else {
        setState(response.status === 409 ? "duplicate" : "error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card p-8 md:p-12" role="status">
        <h2 className="h2 h2--bare">{copy.successTitle}</h2>
        <p className="mt-5 max-w-[52ch] text-lg text-muted">{copy.successBody}</p>
        <button type="button" onClick={() => setState("idle")} className="btn btn--secondary mt-8">
          {copy.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} aria-busy={state === "submitting"}>
      <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      <fieldset disabled={state === "submitting"} className="grid gap-6 md:grid-cols-2 md:gap-x-8">
        <label className="block text-sm font-medium text-text">
          {copy.fields.fullName} *
          <input name="fullName" required maxLength={120} pattern={".*\\S.*"} autoComplete="name" placeholder={copy.placeholders.fullName} className="field" />
        </label>
        <label className="block text-sm font-medium text-text">
          {copy.fields.captainTelegram} *
          <input name="captainTelegram" required minLength={5} maxLength={33} pattern="@?[A-Za-z][A-Za-z0-9_]{4,31}" autoComplete="off" placeholder={copy.placeholders.captainTelegram} className="field" />
        </label>
        <label className="block text-sm font-medium text-text">
          {copy.fields.captainEmail} *
          <input name="captainEmail" required type="email" maxLength={254} autoComplete="email" placeholder={copy.placeholders.captainEmail} className="field" />
        </label>
        <label className="block text-sm font-medium text-text">
          {copy.fields.teamName} *
          <input name="teamName" required maxLength={120} pattern={".*\\S.*"} placeholder={copy.placeholders.teamName} className="field" />
        </label>
        <label className="block text-sm font-medium text-text md:col-span-2">
          {copy.fields.participationFormat} *
          <select name="participationFormat" required defaultValue="" className="field">
            <option value="" disabled>{copy.placeholders.select}</option>
            <option value="offline">{copy.options.offline}</option>
            <option value="online">{copy.options.online}</option>
          </select>
        </label>
      </fieldset>
      {(state === "error" || state === "duplicate") && (
        <p className="mt-6 border-l-2 border-danger pl-4 text-danger" role="alert">
          {state === "duplicate" ? copy.duplicate : copy.error}
        </p>
      )}
      <button type="submit" disabled={state === "submitting"} className="btn btn--primary mt-8 min-h-12 disabled:cursor-wait">
        {state === "submitting" ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
