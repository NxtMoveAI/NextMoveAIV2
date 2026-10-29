import React from "react";
import { Check } from "lucide-react";

export interface StepItem {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: StepItem[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Signup Progress" className="w-full mb-6 sm:mb-8">
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <li
              key={step.number}
              className={`flex-1 flex items-center ${
                idx !== steps.length - 1 ? "after:content-[''] after:w-full after:h-0.5 after:border-b after:border-dashed after:inline-block after:mx-2 sm:after:mx-3" : ""
              } ${
                isCompleted
                  ? "after:border-[#6757F5]"
                  : "after:border-[#E8E6F3]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                    isCompleted
                      ? "bg-[#6757F5] text-white"
                      : isCurrent
                      ? "bg-[#6757F5] text-white ring-4 ring-[#EDEAFF]"
                      : "bg-[#FAF9F6] border border-[#E8E6F3] text-[#626987]"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                </span>
                <span
                  className={`text-xs font-semibold hidden md:inline whitespace-nowrap ${
                    isCurrent
                      ? "text-[#171A2B] font-bold"
                      : isCompleted
                      ? "text-[#6757F5]"
                      : "text-[#626987]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
