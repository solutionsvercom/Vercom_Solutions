import { motion } from 'motion/react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { servicesData } from '../data/services';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const effectiveSlug = slug || searchParams.get('slug') || '';
  const service = servicesData.find((item) => item.slug === effectiveSlug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e]">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-cyan-400 font-semibold mb-3">Service Detail</p>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-5">
            {service.title}
          </h1>
          <p className="text-cyan-100/70 text-lg mb-8">{service.details}</p>

          <div className="p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md mb-8">
            <h2 className="text-white text-2xl font-semibold mb-4">Key Focus Areas</h2>
            <div className="flex flex-wrap gap-3">
              {service.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/get-started" className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold">
              Start Your Project
            </Link>
            <Link to="/services" className="px-7 py-3 rounded-xl border border-cyan-500/40 text-cyan-300 font-semibold">
              Back to Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
