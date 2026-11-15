"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  isPassword?: boolean;
}

export function FormField({
  id,
  label,
  error,
  hint,
  isPassword = false,
  type = "text",
  required,
  className = "",
  ...props
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1.5 text-left">
      <label
        htmlFor={inputId}
        className="block text-xs font-bold text-[#171A2B]"
      >
        {label} {required && <span className="text-[#6757F5]">*</span>}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#171A2B] bg-[#FAF9F6] focus:bg-white transition-all placeholder:text-[#9EA3B5] focus:outline-hidden focus:ring-2 focus:ring-[#6757F5] focus:border-[#6757F5] ${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
              : "border-[#E8E6F3] hover:border-[#DDD8FE]"
          } ${isPassword ? "pr-10" : ""} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626987] hover:text-[#171A2B] focus:outline-hidden p-1 rounded-md"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {hint && !error && (
        <p id={hintId} className="text-[11px] text-[#626987] leading-tight">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-rose-600 font-medium flex items-center gap-1"
        >
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
