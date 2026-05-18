import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-HDNV0R8MYF';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends page_view on client-side route changes (React SPA). */
export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    const pagePath = `${location.pathname}${location.search}`;
    window.gtag('config', GA_MEASUREMENT_ID, { page_path: pagePath });
  }, [location.pathname, location.search]);

  return null;
}
