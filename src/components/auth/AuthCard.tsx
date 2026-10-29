import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`p-6 sm:p-10 rounded-3xl bg-white border border-[#DDD8FE] shadow-xl transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
