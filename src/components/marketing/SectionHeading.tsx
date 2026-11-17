import React from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  accent?: "iris" | "cyan" | "blue";
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = "center",
  className = "",
  accent = "iris",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  const eyebrowStyles =
    accent === "cyan"
      ? "bg-[#e8f9fa] border-[#cbf0f3] text-[#269ca8]"
      : accent === "blue"
      ? "bg-[#eff6ff] border-[#dbeafe] text-[#2563eb]"
      : "bg-[#edeaff] border-[#dedaf5] text-[#6757f5]";

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 border ${eyebrowStyles} ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {eyebrowIcon}
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171a2b] tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3.5 text-base sm:text-lg text-[#474d66] leading-relaxed max-w-2xl font-normal mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
