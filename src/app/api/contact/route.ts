import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "marketivitybd@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse body
  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    phone?: string;
    service?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message, phone, service } = body;

  // Validate required fields
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Sanitize inputs (prevent injection)
  const safeName = name.trim().slice(0, 100);
  const safeEmail = email.trim().slice(0, 200);
  const safeSubject = (subject ?? "New Contact Form Submission").trim().slice(0, 200);
  const safeMessage = message.trim().slice(0, 5000);
  const safePhone = phone?.trim().slice(0, 50) ?? "";
  const safeService = service?.trim().slice(0, 100) ?? "";

  // ── Step 1: Send notification email TO Marketivity team ──────────────────
  try {
    const notifResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: safeEmail,           // ← clicking Reply goes straight to client
      subject: `[Marketivity] New Lead: ${safeSubject}`,
      html: buildNotificationEmail({
        name: safeName,
        email: safeEmail,
        subject: safeSubject,
        message: safeMessage,
        phone: safePhone,
        service: safeService,
      }),
    });
    console.log("[Contact API] Notification email sent:", notifResult);
  } catch (err) {
    // Notification failed — this is critical, return error
    console.error("[Contact API] NOTIFICATION email failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  // ── Step 2: Send auto-reply TO the client ─────────────────────────────────
  // NOTE: Resend free tier may restrict sending to emails outside your
  // verified domain. We attempt it but NEVER fail the whole request if it fails.
  // The client still benefits from the notification email's replyTo header.
  try {
    const replyResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: safeEmail,
      replyTo: TO_EMAIL,            // ← client replies go back to marketivitybd@gmail.com
      subject: `We received your message — Marketivity`,
      html: buildConfirmationEmail({ name: safeName }),
    });
    console.log("[Contact API] Auto-reply email sent:", replyResult);
  } catch (err) {
    // Auto-reply failed — log it but don't fail the request
    // The client's message was already received, notification already sent
    console.warn(
      "[Contact API] Auto-reply FAILED (likely Resend domain restriction):",
      err
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// ─── Email Templates ─────────────────────────────────────────────────────────

function buildNotificationEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  service: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:'Segoe UI',Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#6B3FA0 0%,#F26522 100%);padding:32px 40px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700">🎉 New Lead!</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Someone just filled out your contact form</p>
    </div>

    <!-- Body -->
    <div style="padding:32px 40px">
      
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE;width:120px">
            <span style="font-size:13px;font-weight:600;color:#6B3FA0;text-transform:uppercase;letter-spacing:0.5px">Name</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <span style="font-size:15px;color:#2D2D2D;font-weight:500">${data.name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <span style="font-size:13px;font-weight:600;color:#6B3FA0;text-transform:uppercase;letter-spacing:0.5px">Email</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <a href="mailto:${data.email}" style="font-size:15px;color:#F26522;text-decoration:none">${data.email}</a>
          </td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <span style="font-size:13px;font-weight:600;color:#6B3FA0;text-transform:uppercase;letter-spacing:0.5px">Phone</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <a href="tel:${data.phone}" style="font-size:15px;color:#F26522;text-decoration:none">${data.phone}</a>
          </td>
        </tr>` : ""}
        ${data.service ? `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <span style="font-size:13px;font-weight:600;color:#6B3FA0;text-transform:uppercase;letter-spacing:0.5px">Service</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <span style="font-size:15px;color:#2D2D2D">${data.service}</span>
          </td>
        </tr>` : ""}
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <span style="font-size:13px;font-weight:600;color:#6B3FA0;text-transform:uppercase;letter-spacing:0.5px">Subject</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F0F0EE">
            <span style="font-size:15px;color:#2D2D2D">${data.subject}</span>
          </td>
        </tr>
      </table>

      <div style="margin-top:24px">
        <p style="font-size:13px;font-weight:600;color:#6B3FA0;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 12px">Message</p>
        <div style="background:#F7F7F5;border-radius:12px;padding:20px;border-left:4px solid #F26522">
          <p style="margin:0;font-size:15px;color:#2D2D2D;line-height:1.7;white-space:pre-wrap">${data.message}</p>
        </div>
      </div>

      <!-- Quick Reply Buttons -->
      <div style="margin-top:32px;display:flex;gap:12px">
        <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" 
           style="display:inline-block;background:#F26522;color:#fff;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;margin-right:12px">
          📧 Reply via Email
        </a>
        <a href="https://wa.me/8801767644696" 
           style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px">
          💬 Open WhatsApp
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#F7F7F5;padding:20px 40px;text-align:center;border-top:1px solid #EEEEED">
      <p style="margin:0;font-size:12px;color:#999">
        This notification was sent from your <strong>Marketivity</strong> contact form.<br>
        Reply to this email to respond directly to ${data.name}.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildConfirmationEmail(data: { name: string }): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:'Segoe UI',Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#6B3FA0 0%,#F26522 100%);padding:40px;text-align:center">
      <div style="font-size:48px;margin-bottom:16px">✅</div>
      <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700">We got your message!</h1>
      <p style="margin:12px 0 0;color:rgba(255,255,255,0.85);font-size:15px">Thank you for reaching out to Marketivity</p>
    </div>

    <!-- Body -->
    <div style="padding:40px">
      <p style="font-size:16px;color:#2D2D2D;line-height:1.7;margin:0 0 16px">
        Hi <strong>${data.name}</strong>,
      </p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 16px">
        Thank you for contacting <strong>Marketivity</strong> — Rajshahi's trusted digital marketing partner. 
        We've received your message and will get back to you within <strong>24 hours</strong>.
      </p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 32px">
        In the meantime, feel free to browse our services or reach out to us directly on WhatsApp for a faster response.
      </p>

      <!-- WhatsApp CTA -->
      <div style="text-align:center;margin-bottom:32px">
        <a href="https://wa.me/8801767644696" 
           style="display:inline-block;background:#25D366;color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px">
          💬 Chat on WhatsApp
        </a>
      </div>

      <!-- What to Expect -->
      <div style="background:#F7F7F5;border-radius:12px;padding:24px">
        <h3 style="margin:0 0 16px;font-size:15px;color:#2D2D2D;font-weight:700">What happens next?</h3>
        <div style="display:flex;align-items:flex-start;margin-bottom:12px">
          <span style="color:#F26522;font-weight:700;margin-right:10px;font-size:15px">01</span>
          <span style="font-size:14px;color:#555;line-height:1.6">Our team reviews your message and understands your needs</span>
        </div>
        <div style="display:flex;align-items:flex-start;margin-bottom:12px">
          <span style="color:#F26522;font-weight:700;margin-right:10px;font-size:15px">02</span>
          <span style="font-size:14px;color:#555;line-height:1.6">We prepare a tailored strategy and proposal for you</span>
        </div>
        <div style="display:flex;align-items:flex-start">
          <span style="color:#F26522;font-weight:700;margin-right:10px;font-size:15px">03</span>
          <span style="font-size:14px;color:#555;line-height:1.6">We reach out within 24 hours to schedule a free consultation</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#2D2D2D;padding:24px 40px;text-align:center">
      <p style="margin:0 0 8px;color:#fff;font-weight:700;font-size:14px">Marketivity</p>
      <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.5)">
        Padma R/A, Chandrima, Rajshahi, Bangladesh
      </p>
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.5)">
        <a href="mailto:marketivitybd@gmail.com" style="color:#F26522;text-decoration:none">marketivitybd@gmail.com</a>
        &nbsp;·&nbsp;
        <a href="https://wa.me/8801767644696" style="color:#25D366;text-decoration:none">01767644696</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}
