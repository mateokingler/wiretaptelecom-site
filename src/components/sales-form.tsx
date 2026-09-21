"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, Loader2Icon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ZOHO_ENDPOINT = "https://crm.zoho.com/crm/WebToLeadForm";
const FORM_ID = "webform6854310000000631001";
const FORM_NAME = "WebToLeads6854310000000631001";

/**
 * Zoho web-to-lead tokens. These identify the CRM form and the lead module;
 * the names and values have to match Zoho's generated markup exactly.
 */
const zohoTokens = [
  {
    name: "xnQsjsdp",
    value: "297c9c985a24e3c41ac0f8fe6b4e3dbe41a29e43b73a5791eab1878665b6c3b6",
  },
  {
    name: "xmIwtLD",
    value:
      "71b9097bb9720f47103b5e8340030f07e3d500ee844f5118c22c0081d66229c6935b7f29f4247b47476c00430f8b9512",
  },
  { name: "actionType", value: "TGVhZHM=" },
  { name: "returnURL", value: "null" },
];

type FieldName = "First Name" | "Last Name" | "Company" | "Email" | "Phone";

type Field = {
  name: FieldName;
  label: string;
  type: string;
  autoComplete: string;
  maxLength: number;
  placeholder: string;
  half?: boolean;
};

const fields: Field[] = [
  {
    name: "First Name",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
    maxLength: 40,
    placeholder: "Alex",
    half: true,
  },
  {
    name: "Last Name",
    label: "Last name",
    type: "text",
    autoComplete: "family-name",
    maxLength: 80,
    placeholder: "Rivera",
    half: true,
  },
  {
    name: "Company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
    maxLength: 200,
    placeholder: "Northline IT",
  },
  {
    name: "Email",
    label: "Company email",
    type: "email",
    autoComplete: "email",
    maxLength: 100,
    placeholder: "alex@northlineit.com",
  },
  {
    name: "Phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    maxLength: 30,
    placeholder: "(555) 214-8890",
  },
];

const emptyValues: Record<FieldName, string> = {
  "First Name": "",
  "Last Name": "",
  Company: "",
  Email: "",
  Phone: "",
};

function validate(field: FieldName, raw: string): string | null {
  const value = raw.trim();
  if (!value) {
    const label = fields.find((f) => f.name === field)?.label ?? field;
    return `${label} is required.`;
  }
  if (field === "Email") {
    const at = value.indexOf("@");
    const dot = value.lastIndexOf(".");
    if (at < 1 || dot < at + 2 || dot + 2 >= value.length) {
      return "Enter a valid email address.";
    }
  }
  if (field === "Phone" && (value.match(/\d/g) ?? []).length < 10) {
    return "Enter a phone number with at least 10 digits.";
  }
  return null;
}

export function SalesForm() {
  const form = useRef<HTMLFormElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const fieldId = useId();
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const done = status === "done";

  // The submit button goes invisible along with the form, so send focus somewhere
  // meaningful instead of letting it fall back to the document.
  useEffect(() => {
    if (done) successHeading.current?.focus();
  }, [done]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) {
      const error = validate(field.name, values[field.name]);
      if (error) nextErrors[field.name] = error;
    }
    setErrors(nextErrors);
    setSubmitError(null);

    const firstInvalid = fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      form.current
        ?.querySelector<HTMLInputElement>(`[name="${firstInvalid.name}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const body = new FormData(form.current!);
      // Zoho passes this through when the visitor arrives from a smart URL.
      const service = new URLSearchParams(window.location.search).get("service");
      if (service === "smarturl") body.append("service", service);

      const response = await fetch(ZOHO_ENDPOINT, {
        method: "POST",
        body,
        cache: "no-cache",
      });
      const contentType = response.headers.get("Content-Type") ?? "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (typeof data !== "object" || data === null) {
        setStatus("done");
        return;
      }

      if (data.invalidCaptcha === "true") {
        throw new Error(data.actionvalue || "Captcha verification failed.");
      }

      switch (data.actionsubmit) {
        case "redirect_url":
        case "thankyou_page":
          window.location.assign(data.redirectUrl);
          return;
        case "parent_redirect":
          parent.window.location = data.redirectUrl;
          return;
        case "add_hash":
          document.location.hash = data.hash;
          break;
        case "error_msg":
        case "captcha_error":
          throw new Error(data.message || "Something went wrong.");
        default:
          if (typeof data.actionvalue === "string") setConfirmation(data.actionvalue);
      }
      setStatus("done");
    } catch (error) {
      setStatus("idle");
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : "We could not send that. Please try again, or call us at 1-877-471-8000."
      );
    }
  };

  return (
    <div className="grid rounded-[1.75rem] bg-card p-7 text-card-foreground shadow-xl ring-1 ring-navy/8 sm:p-8 lg:p-7 tall:p-9">
      {/*
        Both states share one grid cell. On desktop the submitted form stays
        mounted but invisible so the card keeps the height it had beside the hero
        copy; on mobile there is no column to match, so it is dropped outright.
      */}
      <div
        className={cn(
          "col-start-1 row-start-1",
          done && "hidden lg:block lg:invisible"
        )}
      >
        <h2 className="text-2xl font-semibold tracking-tight tall:text-3xl">
          Let&apos;s get started
        </h2>

        <form
          ref={form}
          id={FORM_ID}
          name={FORM_NAME}
          acceptCharset="UTF-8"
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 tall:mt-7"
        >
          {zohoTokens.map((token) => (
            <input key={token.name} type="hidden" name={token.name} defaultValue={token.value} />
          ))}
          <input type="hidden" id="zc_gad" name="zc_gad" defaultValue="" />
          <input
            type="text"
            name="aG9uZXlwb3Q"
            defaultValue=""
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:gap-3 tall:gap-5">
            {fields.map((field) => {
              const id = `${fieldId}-${field.name.replace(/\s+/g, "-")}`;
              const error = errors[field.name];
              return (
                <div key={field.name} className={cn(!field.half && "sm:col-span-2")}>
                  <label htmlFor={id} className="block text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    id={id}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    onChange={(event) =>
                      setValues((prev) => ({ ...prev, [field.name]: event.target.value }))
                    }
                    onBlur={(event) =>
                      setErrors((prev) => ({
                        ...prev,
                        [field.name]: validate(field.name, event.target.value) ?? undefined,
                      }))
                    }
                    className={cn(
                      "mt-1.5 h-11 w-full rounded-lg border bg-background px-4 text-[0.95rem] outline-none transition-colors lg:h-10 tall:mt-2 tall:h-12",
                      "placeholder:text-muted-foreground/55",
                      "focus:ring-3",
                      error
                        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                        : "border-input focus:border-ring focus:ring-ring/25"
                    )}
                  />
                  {error && (
                    <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {submitError && (
            <p
              role="alert"
              className="mt-6 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="mt-6 w-full tall:mt-7"
          >
            {status === "submitting" ? (
              <>
                <Loader2Icon className="animate-spin" />
                Sending
              </>
            ) : (
              "Talk to sales"
            )}
          </Button>

          <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
            We use this only to answer your request. No newsletters, no reselling your details.
          </p>
        </form>
      </div>

      {done && (
        <div className="col-start-1 row-start-1 flex flex-col">
          <span className="flex size-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
            <CheckIcon className="size-6" />
          </span>
          <h2
            ref={successHeading}
            tabIndex={-1}
            className="mt-6 text-2xl font-semibold tracking-tight outline-none tall:text-3xl"
          >
            Thanks{values["First Name"].trim() ? `, ${values["First Name"].trim()}` : ""}. We
            have your request.
          </h2>
          <p className="mt-3 text-muted-foreground">
            {confirmation ??
              `A specialist from our US team will reach out to ${values.Email.trim()} to talk through your traffic, your PBX, and pricing.`}
          </p>
          {/* Soaks up the height the invisible form is holding open. */}
          <div className="min-h-8 grow" />
          <div className="rounded-2xl bg-muted p-5">
            <p className="text-sm font-medium">Need an answer sooner?</p>
            <a
              href="tel:+18774718000"
              className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-brand-blue hover:underline"
            >
              <PhoneIcon className="size-4" />
              1-877-471-8000
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
