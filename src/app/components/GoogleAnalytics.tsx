import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-HDNV0R8MYF';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends page_view on client-side route changes (React SPA) for GA4 + GTM. */
export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });

    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, { page_path: pagePath });
    }
  }, [location.pathname, location.search]);

  return null;
}
