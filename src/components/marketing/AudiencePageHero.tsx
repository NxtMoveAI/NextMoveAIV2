import React from "react";
import { CheckCircle2, LucideIcon } from "lucide-react";
import { AudienceHeroCTA } from "./AudienceHeroCTA";

export interface AudiencePageHeroProps {
  audience: "school" | "college" | "professionals";
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  headlineMain: string;
  headlineAccent: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  trustPills: string[];
  visualSlot?: React.ReactNode;
}

export function AudiencePageHero({
  audience,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  headlineMain,
  headlineAccent,
  description,
  primaryCta,
  secondaryCta,
  trustPills,
  visualSlot,
}: AudiencePageHeroProps) {
  const accentTheme = {
    school: {
      eyebrow: "bg-[#e8f9fa] text-[#269ca8] border-[#cbf0f3]",
      headlineAccent: "text-[#269ca8]",
      btn: "bg-[#269ca8] hover:bg-[#1f808a] text-white shadow-[#35b8c5]/25",
      pillCheck: "text-[#269ca8]",
    },
    college: {
      eyebrow: "bg-[#edeaff] text-[#6757f5] border-[#dedaf5]",
      headlineAccent: "text-[#6757f5]",
      btn: "bg-[#6757f5] hover:bg-[#5342e8] text-white shadow-[#6757f5]/25",
      pillCheck: "text-[#6757f5]",
    },
    professionals: {
      eyebrow: "bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]",
      headlineAccent: "text-[#2563eb]",
      btn: "bg-[#171a2b] hover:bg-[#2563eb] text-white shadow-[#171a2b]/25",
      pillCheck: "text-[#2563eb]",
    },
  }[audience];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 bg-[#faf9f6] border-b border-[#e8e6f3]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#edeaff]/70 via-[#faf9f6]/40 to-transparent pointer-events-none -z-10 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Messaging */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Audience Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 border ${accentTheme.eyebrow}`}
            >
              {EyebrowIcon && <EyebrowIcon className="w-3.5 h-3.5" />}
              <span>{eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-extrabold text-[#171a2b] tracking-tight leading-[1.15]">
              {headlineMain}{" "}
              <span className={accentTheme.headlineAccent}>{headlineAccent}</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-[#31364f] leading-relaxed max-w-2xl font-normal">
              {description}
            </p>

            {/* CTAs */}
            <AudienceHeroCTA
              audience={audience}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              btnClass={accentTheme.btn}
            />

            {/* Trust Pills */}
            <div className="mt-8 pt-6 border-t border-[#e8e6f3] flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#626987]">
              {trustPills.map((pill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${accentTheme.pillCheck}`} />
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual / Interactive Shell */}
          <div className="lg:col-span-5 w-full">
            {visualSlot}
          </div>
        </div>
      </div>
    </section>
  );
}
