import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { nom, email, sujet, message } = await req.json();

    // Validation
    if (!nom || !email || !sujet || !message) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const sujetLabels: Record<string, string> = {
      correction: "Signaler une erreur",
      suggestion: "Suggérer un article",
      partenariat: "Partenariat / Collaboration",
      autre: "Autre",
    };

    const { error } = await resend.emails.send({
      from: "Contact Dos Sans Douleur <contact@dossansdouleur.com>",
      to: [process.env.RESEND_TO_EMAIL!],
      replyTo: email, // ← répondre directement à l'expéditeur
      subject: `[Contact] ${sujetLabels[sujet] ?? sujet} — ${nom}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0;">
          <div style="background: #000; padding: 16px 24px; margin-bottom: 24px;">
            <h1 style="color: #10b981; font-size: 18px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em;">
              Dos Sans Douleur — Nouveau message
            </h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #94a3b8; width: 120px;">
                Nom
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">
                ${nom}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #94a3b8;">
                Email
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">
                <a href="mailto:${email}" style="color: #10b981;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #94a3b8;">
                Sujet
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">
                ${sujetLabels[sujet] ?? sujet}
              </td>
            </tr>
          </table>

          <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 16px 20px; margin-bottom: 24px;">
            <p style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #94a3b8; margin: 0 0 8px 0;">
              Message
            </p>
            <p style="font-size: 14px; color: #334155; line-height: 1.7; margin: 0; white-space: pre-wrap;">
              ${message}
            </p>
          </div>

          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
            Message reçu via dossansdouleur.com · Répondez directement à cet email pour contacter ${nom}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Erreur lors de l'envoi. Réessayez." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message envoyé avec succès !" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { message: "Erreur serveur. Réessayez plus tard." },
      { status: 500 }
    );
  }
}