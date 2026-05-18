/** 301 redirects for old PascalCase URLs (Google Search Console / bookmarks). */
const LEGACY_PATH_MAP = {
  '/Home': '/',
  '/Solutions': '/solutions',
  '/Services': '/services',
  '/Portfolio': '/portfolio',
  '/About': '/about',
  '/Contact': '/contact',
  '/GetStarted': '/get-started',
  '/Industries': '/industries',
};

export function legacyRedirects(req, res, next) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();

  const pathOnly = req.path;

  if (pathOnly === '/ServiceDetail') {
    const slug = typeof req.query.slug === 'string' ? req.query.slug.trim() : '';
    const target = slug ? `/services/${encodeURIComponent(slug)}` : '/services';
    return res.redirect(301, target);
  }

  const target = LEGACY_PATH_MAP[pathOnly];
  if (target) {
    return res.redirect(301, target);
  }

  next();
}
