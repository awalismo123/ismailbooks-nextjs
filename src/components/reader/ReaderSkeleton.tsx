"use client";

import React from "react";

export default function ReaderSkeleton() {
  return (
    <div className="space-y-4 py-6 animate-pulse" aria-busy="true">
      <div
        style={{ background: "var(--reader-border)" }}
        className="h-8 w-2/3 rounded-lg"
      />
      <div
        style={{ background: "var(--reader-border)" }}
        className="h-4 w-full rounded"
      />
      <div
        style={{ background: "var(--reader-border)" }}
        className="h-4 w-[92%] rounded"
      />
      <div
        style={{ background: "var(--reader-border)" }}
        className="h-4 w-[88%] rounded"
      />
      <div
        style={{ background: "var(--reader-border)" }}
        className="h-4 w-full rounded"
      />
      <div
        style={{ background: "var(--reader-border)" }}
        className="h-4 w-[70%] rounded"
      />
      <div
        style={{ background: "var(--reader-border)" }}
        className="h-40 w-full rounded-xl mt-6"
      />
      <p
        style={{ color: "var(--reader-muted)" }}
        className="text-sm font-bold text-center pt-4"
      >
        Diyaarinta cutubka...
      </p>
    </div>
  );
}
