"use client";

import { useEffect } from "react";
import { captureAttributionFromUrl } from "@/lib/analytics";

/** Captures UTMs once per session for funnel attribution. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromUrl();
  }, []);
  return null;
}
