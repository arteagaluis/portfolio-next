import { useTranslations } from "next-intl";
import {
    Layers,
    ShieldCheck,
    Link2,
    Settings2,
    Radio
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StrategySection() {
    const t = useTranslations("strategy");

    const pillars = [
        {
            id: "architecture",
            icon: Layers,
        },
        {
            id: "quality",
            icon: ShieldCheck,
        },
        {
            id: "integration",
            icon: Link2,
        },
        {
            id: "transformation",
            icon: Settings2,
        },
        {
            id: "iot",
            icon: Radio,
        }
    ];

    return (
        <section id="strategy" className="w-full py-12 md:py-24 bg-muted/30 flex justify-center">
            <div className="container px-4 md:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                        {t("title")}
                    </h2>
                    <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <Card key={pillar.id} className="border-none bg-background/50 backdrop-blur-sm hover:bg-background transition-colors duration-300">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold">{t(`pillars.${pillar.id}.title`)}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {t(`pillars.${pillar.id}.description`)}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
