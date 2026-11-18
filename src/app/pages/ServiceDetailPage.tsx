import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Layers,
  Sparkles,
  Target,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { getRelatedServices, getServiceBySlug } from '../data/services';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const effectiveSlug = slug || searchParams.get('slug') || '';
  const service = getServiceBySlug(effectiveSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [effectiveSlug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const related = getRelatedServices(service.slug);

  return (
    <section className="relative min-h-screen py-28 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-24 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-cyan-400/80 hover:text-cyan-300 text-sm font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>

          <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold">
            {service.title}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-5 max-w-4xl">
            {service.headline}
          </h1>
          <p className="text-cyan-100/70 text-lg mb-8 max-w-3xl">{service.overview}</p>

          <div className="flex flex-wrap gap-4 mb-14">
            <Link
              to="/get-started"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold inline-flex items-center gap-2"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 rounded-xl border border-cyan-500/40 text-cyan-300 font-semibold"
            >
              Talk to Us
            </Link>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-14">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          <motion.div
            className="lg:col-span-2 p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="text-white text-2xl font-semibold">What You Get</h2>
            </div>
            <p className="text-cyan-100/70 mb-6">{service.details}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-cyan-100/80 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-violet-500/15 border border-violet-500/30">
                <Target className="w-5 h-5 text-violet-300" />
              </div>
              <h2 className="text-white text-xl font-semibold">Ideal For</h2>
            </div>
            <ul className="space-y-3">
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-cyan-100/75 text-sm">
                  <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <h2 className="text-white text-2xl font-semibold mb-6">How We Deliver</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {service.process.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02]"
              >
                <p className="text-cyan-400 font-bold text-sm mb-2">{item.step}</p>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-cyan-100/65 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
              <Layers className="w-5 h-5 text-cyan-300" />
            </div>
            <h2 className="text-white text-2xl font-semibold">Deliverables</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {service.deliverables.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-100 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="p-8 sm:p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
            Ready to start with {service.title}?
          </h2>
          <p className="text-cyan-100/70 mb-6 max-w-2xl">
            Share your goals and we will map a clear plan, timeline, and next steps for this service.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/get-started"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold"
            >
              Get a Quote
            </Link>
            <Link
              to="/portfolio"
              className="px-7 py-3 rounded-xl border border-cyan-500/40 text-cyan-300 font-semibold"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>

        <div>
          <h2 className="text-white text-2xl font-semibold mb-6">Explore More Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="group p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-cyan-400/40 transition-colors"
              >
                <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-cyan-100/60 text-sm mb-4">{item.short}</p>
                <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-semibold">
                  View page
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
