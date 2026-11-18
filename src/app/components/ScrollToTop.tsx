import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Reset window scroll whenever the route path (or search) changes. */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
}
