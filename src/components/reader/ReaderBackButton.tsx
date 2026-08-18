"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface ReaderBackButtonProps {
  returnTarget: string;
  className?: string;
  label?: string;
}

export default function ReaderBackButton({
  returnTarget,
  className = "",
  label = "Ku laabo",
}: ReaderBackButtonProps) {
  const router = useRouter();

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(returnTarget);
    }
  };

  // Bind Escape key to back navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [returnTarget]);

  return (
    <button
      type="button"
      onClick={handleBack}
      style={{
        border: "1px solid var(--reader-border, #E8DFD2)",
        background: "var(--reader-surface, #F9F6F1)",
        color: "var(--reader-muted, #6B5F52)",
      }}
      className={`p-2 rounded-xl transition-all hover:opacity-80 shrink-0 flex items-center gap-1.5 ${className}`}
      title={`${label} (Escape)`}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden md:inline text-xs font-bold">{label}</span>
    </button>
  );
}
