import { NextRequest, NextResponse } from "next/server";
import { generateCV } from "@/lib/cv-generator";
import { techStack } from "@/lib/config";

export async function GET(
    request: NextRequest,
) {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get("locale") as "en" | "es") || "en";

    try {
        // Dynamic import of messages based on locale
        // We use the relative path from the server-side context
        const messages = (await import(`../../../../messages/${locale}.json`)).default;

        const cvData = {
            name: "Luis Arteaga",
            role: messages.hero["animated-word-1"] || messages.preloader.role,
            intro: messages.about.intro,
            experience: Object.values(messages.experience.roles).map((role: any) => ({
                company: role.company,
                role: role.role,
                period: role.period,
                description: role.description,
                achievements: Object.values(role.achievements),
            })),
            techStack: [
                { category: messages.tech.frontend, items: techStack.frontend.join(", ") },
                { category: messages.tech.backend, items: techStack.backend.join(", ") },
                { category: messages.tech.database, items: techStack.database.join(", ") },
                { category: messages.tech.devops, items: techStack.devops.join(", ") },
                { category: messages.tech.others, items: techStack.others.join(", ") },
            ],
            labels: {
                experience: messages.experience.title,
                techStack: messages.tech.title,
            },
        };

        // Generate PDF using Puppeteer
        const pdfBuffer = await generateCV(cvData, locale);

        const filename = `Luis_Arteaga_CV_${locale.toUpperCase()}.pdf`;

        return new NextResponse(pdfBuffer as any, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-cache",
            },
        });
    } catch (error: any) {
        console.error("CV Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate CV", details: error.message },
            { status: 500 }
        );
    }
}
