import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Admin validation schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    message: z.string().min(10, "Message must be at least 10 characters."),
    honeypot: z.string().optional(), // Anti-spam field
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Validation
        const validatedData = contactSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json(
                { success: false, message: "Invalid data", errors: validatedData.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, message, honeypot } = validatedData.data;

        // 2. Honeypot check (if filled, it's likely a bot)
        if (honeypot) {
            console.warn("Spam detected via honeypot field.");
            return NextResponse.json(
                { success: true, message: "Message sent (spam filter)" },
                { status: 200 } // Return success to not give away that we know it's a bot
            );
        }

        // 3. Nodemailer Configuration
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.CONTACT_RECEIVER || "arteagaluis123@gmail.com",
            replyTo: email,
            subject: `Nuevo mensaje desde portafolio - ${name}`,
            text: `
        Nuevo mensaje recibido:
        
        Nombre: ${name}
        Email: ${email}
        
        Mensaje:
        ${message}
        
        ---
        Enviado desde el formulario de contacto del portafolio.
      `,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">Nuevo mensaje desde el portafolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 11px; color: #64748b; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
            Este correo fue enviado automáticamente desde tu portafolio web.
          </p>
        </div>
      `,
        };

        // 4. Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { success: false, message: "Failed to send message" },
            { status: 500 }
        );
    }
}
