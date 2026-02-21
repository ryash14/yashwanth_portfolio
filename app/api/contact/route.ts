import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.warn(
        "\n⚠️  [Portfolio Contact] GMAIL_USER / GMAIL_APP_PASSWORD not set in .env.local\n" +
        "   Message from: " + name + " <" + email + ">\n" +
        "   See .env.local.example for setup instructions.\n"
      );
      return NextResponse.json({ ok: false, reason: "not_configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio • Contact" <${user}>`,
      to: user,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio Contact] ${name} reached out`,
      text: [
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "NEW MESSAGE — Yashwanth Reddy Portfolio",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "",
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Reply-To: ${email}`,
        "",
        "──── Message ────",
        message,
        "",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "Hit reply — it goes directly to " + name,
      ].join("\n"),
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#060606;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060606;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header bar -->
        <tr>
          <td style="background:linear-gradient(135deg,#0d2018 0%,#0a1a12 100%);border:1px solid #89c4ae30;border-radius:12px 12px 0 0;padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 6px;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#89c4ae;font-family:monospace;">
                    ● PORTFOLIO CONTACT
                  </p>
                  <h1 style="margin:0;font-size:22px;font-weight:800;color:#f0ebe3;letter-spacing:-0.04em;line-height:1.2;">
                    New message from ${name}
                  </h1>
                </td>
                <td align="right" valign="top">
                  <div style="width:44px;height:44px;border-radius:50%;background:#89c4ae;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#060606;text-align:center;line-height:44px;">
                    ${name.charAt(0).toUpperCase()}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Accent line -->
        <tr>
          <td style="background:linear-gradient(90deg,transparent,#89c4ae,transparent);height:2px;"></td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#0e0e0e;border:1px solid #1a1a1a;border-top:none;padding:28px 32px;">

            <!-- Sender info table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #1a1a1a;border-radius:8px;overflow:hidden;">
              <tr>
                <td style="background:#141414;padding:10px 16px;border-bottom:1px solid #1a1a1a;">
                  <p style="margin:0;font-size:8px;letter-spacing:0.16em;text-transform:uppercase;color:#555;font-family:monospace;">Sender</p>
                  <p style="margin:4px 0 0;font-size:14px;color:#d0d0d0;font-weight:600;">${name}</p>
                </td>
              </tr>
              <tr>
                <td style="background:#141414;padding:10px 16px;">
                  <p style="margin:0;font-size:8px;letter-spacing:0.16em;text-transform:uppercase;color:#555;font-family:monospace;">Email</p>
                  <a href="mailto:${email}" style="display:block;margin:4px 0 0;font-size:13px;color:#89c4ae;text-decoration:none;font-family:monospace;">${email}</a>
                </td>
              </tr>
            </table>

            <!-- Message label -->
            <p style="margin:0 0 10px;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-family:monospace;">Message</p>

            <!-- Message body -->
            <div style="background:#111;border:1px solid #1e1e1e;border-left:3px solid #89c4ae50;border-radius:0 6px 6px 0;padding:18px 20px;font-size:14px;color:#c8c8c8;line-height:1.8;white-space:pre-wrap;word-break:break-word;">
${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#090909;border:1px solid #1a1a1a;border-top:1px solid #222;border-radius:0 0 12px 12px;padding:16px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;font-size:10px;color:#444;font-family:monospace;letter-spacing:0.06em;">
                    Hit <strong style="color:#89c4ae;">Reply</strong> — goes directly to ${name} at ${email}
                  </p>
                </td>
                <td align="right">
                  <p style="margin:0;font-size:9px;color:#2a2a2a;font-family:monospace;">yashwanth.dev</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Portfolio Contact] Error sending email:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
