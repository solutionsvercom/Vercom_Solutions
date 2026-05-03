import { motion } from 'motion/react';
import {
  ArrowRight,
  Brain,
  Briefcase,
  Camera,
  Check,
  Clapperboard,
  Code2,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Smartphone,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';

const icons = [Code2, Briefcase, Workflow, Smartphone, Brain, Palette, MonitorSmartphone, Code2, Megaphone, Megaphone, Clapperboard, Clapperboard, Brain, Camera];

export function ServicesPage() {
  return (
    <section className="relative min-h-screen py-28 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold">
            Our Services
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Comprehensive Digital Solutions
          </h1>
          <p className="mt-5 text-cyan-100/70 max-w-3xl mx-auto">
            From concept to deployment, we deliver end-to-end solutions that drive business growth and digital transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const Icon = icons[index];
            const checklist = [...service.tags, 'Implementation Support', 'Performance Optimization'].slice(0, 5);
            return (
              <motion.div
                key={service.slug}
                className="p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -6 }}
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">{service.title}</h3>
                <p className="text-cyan-100/70 text-sm mb-4">{service.details}</p>

                <ul className="space-y-2 mb-5">
                  {checklist.map((point) => (
                    <li key={point} className="text-sm text-cyan-100/75 flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-400" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <Link to={`/services/${service.slug}`} className="text-cyan-400 text-sm font-semibold inline-flex items-center gap-1">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/get-started"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold"
                  >
                    Get Quote
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
