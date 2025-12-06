"use client";

import { useState, useEffect } from "react";

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const fctIsClient = () => {
      setIsClient(true);
    };
    fctIsClient();
  }, []);

  return isClient;
}
