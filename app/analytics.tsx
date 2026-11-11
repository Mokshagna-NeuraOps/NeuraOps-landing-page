"use client";

import React, { createContext, useContext, useEffect } from "react";

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

export interface AnalyticsContextType {
  trackEvent: (name: string, properties?: Record<string, unknown>) => void;
  trackPageView: (url: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  trackPageView: () => {},
});

/**
 * Analytics Provider scaffold for NeuraOps Landing Page.
 * Supports plugging in Google Analytics (GA4), PostHog, Plausible, or custom event sinks.
 */
export function AnalyticsProvider({
  children,
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
}: {
  children: React.ReactNode;
  measurementId?: string;
}) {
  useEffect(() => {
    if (measurementId && typeof window !== "undefined") {
      // Placeholder for analytics SDK initialization
      // e.g., window.gtag('config', measurementId)
    }
  }, [measurementId]);

  const trackEvent = (name: string, properties?: Record<string, unknown>) => {
    if (typeof window !== "undefined") {
      // Dispatches analytics event or logs in development
      if (process.env.NODE_ENV === "development") {
        console.debug(`[Analytics Event] ${name}:`, properties);
      }
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== "undefined") {
      if (process.env.NODE_ENV === "development") {
        console.debug(`[Analytics PageView]: ${url}`);
      }
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackPageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsContextType {
  return useContext(AnalyticsContext);
}
