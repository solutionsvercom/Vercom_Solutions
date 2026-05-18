import { Navigate, useSearchParams } from 'react-router-dom';

export function ServiceDetailLegacyRedirect() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug')?.trim();
  return <Navigate to={slug ? `/services/${slug}` : '/services'} replace />;
}

export const LEGACY_ROUTE_REDIRECTS: { path: string; to: string }[] = [
  { path: '/Home', to: '/' },
  { path: '/Solutions', to: '/solutions' },
  { path: '/Services', to: '/services' },
  { path: '/Portfolio', to: '/portfolio' },
  { path: '/About', to: '/about' },
  { path: '/Contact', to: '/contact' },
  { path: '/GetStarted', to: '/get-started' },
  { path: '/Industries', to: '/industries' },
];
