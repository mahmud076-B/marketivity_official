import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { site } from "@/lib/site";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? site.email;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

const MIN_MS = 3000;
const MAX_MS = 12 * 60 * 60 * 1000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(value: string, max: number): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    phone?: string;
    service?: string;
    company?: string;
    startedAt?: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < MIN_MS || elapsed > MAX_MS) {
    return NextResponse.json(
      { error: "Please wait a moment and try again." },
      { status: 400 }
    );
  }

  const name = singleLine(body.name ?? "", 100);
  const email = singleLine(body.email ?? "", 200);
  const subject = singleLine(body.subject || "New contact form message", 200);
  const message = (body.message ?? "").replace(/\u0000/g, "").trim().slice(0, 5000);
  const phone = singleLine(body.phone ?? "", 40);
  const service = singleLine(body.service ?? "", 120);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email is not configured. Please use WhatsApp." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message),
    phone: escapeHtml(phone),
    service: escapeHtml(service),
  };

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Marketivity] ${subject}`,
      html: notificationHtml(safe),
    });
  } catch {
    console.error("[Contact API] notification failed");
    return NextResponse.json(
      { error: "Failed to send message. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

function notificationHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  service: string;
}): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:8px 0;color:#4A4553;font-size:13px;width:120px">${label}</td><td style="padding:8px 0;color:#24202C;font-size:15px">${value}</td></tr>`
      : "";

  return `<!DOCTYPE html><html><body style="margin:0;background:#F7F3F1;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:24px auto;background:#fff;border-radius:16px;padding:28px">
    <h1 style="margin:0 0 12px;color:#24202C;font-size:20px">New enquiry</h1>
    <table style="width:100%;border-collapse:collapse">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Service", data.service)}
      ${row("Subject", data.subject)}
    </table>
    <p style="color:#4A4553;font-size:13px;margin:20px 0 8px">Message</p>
    <div style="background:#F7F3F1;border-radius:12px;padding:16px;color:#24202C;white-space:pre-wrap">${data.message}</div>
    <p style="color:#4A4553;font-size:12px;margin-top:20px">Reply goes to the sender. No automatic reply was sent to them.</p>
  </div>
</body></html>`;
}
