"use client";

import { useState, useEffect } from "react";

export function useNetworkStatus() {
  const [offlineBanner, setOfflineBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => setOfflineBanner(false);
    const handleOffline = () => setOfflineBanner(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setOfflineBanner(true);
    }
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { offlineBanner, setOfflineBanner };
}
