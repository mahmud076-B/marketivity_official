"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tc = useTranslations("common");

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }

      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  // ── Success State ──────────────────────────────────────────────────────────
  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-green-800">
          {t("successTitle")}
        </h3>
        <p className="mb-6 text-green-700">{t("success")}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="touch-target rounded-full border border-green-300 px-6 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  // ── Input Styles ───────────────────────────────────────────────────────────
  const inputCls =
    "w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-brand-charcoal outline-none transition-all focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 disabled:opacity-50";

  const isLoading = state === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Row: Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-brand-charcoal">
            {tc("name")} <span className="text-brand-orange">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={isLoading}
            placeholder={t("namePlaceholder")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-brand-charcoal">
            {tc("phone")}
            <span className="ml-1 text-xs text-brand-charcoal/40">{tc("optional")}</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={isLoading}
            placeholder="01XXXXXXXXX"
            className={inputCls}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-charcoal">
          {tc("email")} <span className="text-brand-orange">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isLoading}
          placeholder={t("emailPlaceholder")}
          className={inputCls}
        />
      </div>

      {/* Service Interest */}
      <div>
        <label htmlFor="service" className="mb-1 block text-sm font-medium text-brand-charcoal">
          {t("serviceLabel")}
          <span className="ml-1 text-xs text-brand-charcoal/40">{tc("optional")}</span>
        </label>
        <select
          id="service"
          name="service"
          disabled={isLoading}
          className={`${inputCls} cursor-pointer`}
          defaultValue=""
        >
          <option value="" disabled>{t("servicePlaceholder")}</option>
          <option value="SEO Services">{t("options.seo")}</option>
          <option value="Social Media Marketing">{t("options.social")}</option>
          <option value="Paid Advertising">{t("options.ads")}</option>
          <option value="Content Marketing">{t("options.content")}</option>
          <option value="Branding & Identity">{t("options.branding")}</option>
          <option value="Full Package">{t("options.full")}</option>
          <option value="Other">{t("options.other")}</option>
        </select>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-brand-charcoal">
          {tc("subject")} <span className="text-brand-orange">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          disabled={isLoading}
          placeholder={t("subjectPlaceholder")}
          className={inputCls}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-brand-charcoal">
          {tc("message")} <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={isLoading}
          placeholder={t("messagePlaceholder")}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Error Banner */}
      {state === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="touch-target flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-bold text-white transition-all hover:bg-brand-orange-light hover:shadow-lg hover:shadow-brand-orange/25 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("sending")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {tc("sendMessage")}
          </>
        )}
      </button>

      <p className="text-center text-xs text-brand-charcoal/40">
        {t("privacyNote")}
      </p>
    </form>
  );
}
