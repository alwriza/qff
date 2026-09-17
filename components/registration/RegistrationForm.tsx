"use client";

import { FormEvent, useState } from "react";
import type { RegistrationCopy } from "@/config/registration";
import type { Locale } from "@/i18n/routing";

type Props = {
  copy: RegistrationCopy;
  locale: Locale;
};

// Вид поля описан классом .field в globals.css — там же, где радиус и
// фокус-кольцо, общие для всех форм сайта.
const inputClass = "field";
const labelClass = "block text-sm font-medium text-text";

type SelectProps = {
  label: string;
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
};

function SelectField({ label, name, placeholder, options }: SelectProps) {
  return (
    <label className={labelClass}>
      {label} *
      <select name={name} required defaultValue="" className={inputClass}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

export default function RegistrationForm({ copy, locale }: Props) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error" | "duplicate">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries()) as Record<string, unknown>;
    payload.locale = locale;
    payload.consent = data.get("consent") === "on";

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };

      if (response.ok) {
        form.reset();
        setState("success");
      } else if (response.status === 409 || result.error === "duplicate_email") {
        setState("duplicate");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card p-8 md:p-12" role="status">
        <p className="mono text-violet">QFFCA 2026 · OK</p>
        <h2 className="h2 h2--bare mt-5">
          {copy.successTitle}
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg text-muted">{copy.successBody}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn btn--secondary mt-8"
        >
          {copy.submitAnother}
        </button>
      </div>
    );
  }

  const o = copy.options;

  return (
    <form onSubmit={submit} noValidate={false}>
      <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

      <fieldset
        className="grid gap-6 border-b py-10 md:grid-cols-2 md:gap-x-8"
        style={{ borderColor: "var(--rule)" }}
      >
        <legend className="mono mb-6 w-full text-violet">01 / {copy.sections.contact}</legend>
        <label className={labelClass}>
          {copy.fields.fullName} *
          <input name="fullName" required maxLength={120} autoComplete="name" placeholder={copy.placeholders.fullName} className={inputClass} />
        </label>
        <label className={labelClass}>
          {copy.fields.email} *
          <input name="email" required maxLength={254} type="email" autoComplete="email" placeholder={copy.placeholders.email} className={inputClass} />
        </label>
        <label className={labelClass}>
          {copy.fields.messenger} *
          <input name="messenger" required maxLength={120} autoComplete="tel" placeholder={copy.placeholders.messenger} className={inputClass} />
        </label>
        <label className={labelClass}>
          {copy.fields.institution} *
          <input name="institution" required maxLength={200} autoComplete="organization" placeholder={copy.placeholders.institution} className={inputClass} />
        </label>
      </fieldset>

      <fieldset
        className="grid gap-6 border-b py-10 md:grid-cols-2 md:gap-x-8"
        style={{ borderColor: "var(--rule)" }}
      >
        <legend className="mono mb-6 w-full text-violet">02 / {copy.sections.background}</legend>
        <SelectField label={copy.fields.educationLevel} name="educationLevel" placeholder={copy.placeholders.select} options={[
          { value: "school", label: o.school }, { value: "bachelor", label: o.bachelor },
          { value: "graduate", label: o.graduate }, { value: "other", label: o.other },
        ]} />
        <label className={labelClass}>
          {copy.fields.courseOrGrade} *
          <input name="courseOrGrade" required maxLength={60} placeholder={copy.placeholders.courseOrGrade} className={inputClass} />
        </label>
        <SelectField label={copy.fields.englishLevel} name="englishLevel" placeholder={copy.placeholders.select} options={[
          { value: "a1a2", label: o.a1a2 }, { value: "b1b2", label: o.b1b2 },
          { value: "c1c2", label: o.c1c2 }, { value: "not_sure", label: o.notSure },
        ]} />
        <SelectField label={copy.fields.quantumLevel} name="quantumLevel" placeholder={copy.placeholders.select} options={[
          { value: "none", label: o.quantumNone }, { value: "heard", label: o.quantumHeard },
          { value: "course", label: o.quantumCourse }, { value: "qiskit", label: o.quantumQiskit },
        ]} />
        <SelectField label={copy.fields.pythonLevel} name="pythonLevel" placeholder={copy.placeholders.select} options={[
          { value: "none", label: o.pythonNone }, { value: "basic", label: o.pythonBasic },
          { value: "intermediate", label: o.pythonIntermediate }, { value: "advanced", label: o.pythonAdvanced },
        ]} />
      </fieldset>

      <fieldset
        className="grid gap-6 border-b py-10 md:grid-cols-2 md:gap-x-8"
        style={{ borderColor: "var(--rule)" }}
      >
        <legend className="mono mb-6 w-full text-violet">03 / {copy.sections.participation}</legend>
        <SelectField label={copy.fields.attendanceCommitment} name="attendanceCommitment" placeholder={copy.placeholders.select} options={[
          { value: "all", label: o.attendanceAll }, { value: "most", label: o.attendanceMost },
          { value: "unsure", label: o.attendanceUnsure },
        ]} />
        <label className={labelClass}>
          {copy.fields.city} *
          <input name="city" required maxLength={120} autoComplete="address-level2" placeholder={copy.placeholders.city} className={inputClass} />
        </label>
        <SelectField label={copy.fields.travelReadiness} name="travelReadiness" placeholder={copy.placeholders.select} options={[
          { value: "in_astana", label: o.inAstana }, { value: "can_travel", label: o.canTravel },
          { value: "unconfirmed", label: o.cannotTravel },
        ]} />
        <SelectField label={copy.fields.heardFrom} name="heardFrom" placeholder={copy.placeholders.select} options={[
          { value: "university", label: o.university }, { value: "social", label: o.social },
          { value: "community", label: o.community }, { value: "friend", label: o.friend },
          { value: "search", label: o.search }, { value: "other", label: o.sourceOther },
        ]} />
        <label className={`${labelClass} md:col-span-2`}>
          {copy.fields.comments}
          <textarea name="comments" maxLength={1500} rows={5} placeholder={copy.placeholders.comments} className="field resize-y" />
        </label>
      </fieldset>

      <div className="py-8">
        <label className="flex max-w-[70ch] cursor-pointer items-start gap-3 text-sm text-muted">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-violet" />
          <span>{copy.fields.consent} *</span>
        </label>

        {(state === "error" || state === "duplicate") && (
          <p className="mt-6 border-l-2 border-danger pl-4 text-danger" role="alert">
            {state === "duplicate" ? copy.duplicate : copy.error}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn btn--primary mt-8 min-h-12 disabled:cursor-wait"
        >
          {state === "submitting" ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  );
}
