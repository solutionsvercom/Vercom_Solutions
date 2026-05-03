import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const solutionBlocks = [
  {
    title: 'Business Automation',
    text: 'Automate repetitive operations with AI-enabled workflows and integrations.',
  },
  {
    title: 'Scalable Cloud Platforms',
    text: 'Deploy high-availability cloud systems that grow with your business demand.',
  },
  {
    title: 'Data-Driven Growth',
    text: 'Convert data into clear actions with analytics, dashboards, and intelligent reporting.',
  },
  {
    title: 'Omnichannel Digital Presence',
    text: 'Unify your web, mobile, and marketing channels for consistent customer experiences.',
  },
];

const industries = [
  {
    title: 'Hospitality',
    text: 'Complete solutions for hotels, restaurants, and travel businesses.',
    points: ['Booking Systems', 'Guest Management', 'Revenue Optimization'],
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Healthcare & HealthTech',
    text: 'HIPAA-compliant systems for providers and life sciences.',
    points: ['EHR Integration', 'Telehealth', 'Patient Analytics'],
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Retail & E-Commerce',
    text: 'Omnichannel solutions for modern retail businesses.',
    points: ['Inventory', 'Customer 360', 'POS Systems'],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'EdTech & Learning',
    text: 'Digital learning platforms for modern education.',
    points: ['LMS', 'Student Analytics', 'E-Learning'],
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Fitness & Wellness',
    text: 'Solutions for gyms, spas, and wellness centers.',
    points: ['Booking', 'Membership', 'Scheduling'],
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Entertainment & Media',
    text: 'Platforms for content, streaming, and production.',
    points: ['Content Management', 'Streaming', 'Distribution'],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  },
];

export function SolutionsPage() {
  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-[140px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-violet-400 font-semibold mb-3">Solutions</p>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Transforming Businesses Through Smart Solutions
          </h1>
          <p className="mt-5 text-cyan-100/70 max-w-3xl mx-auto">
            We combine technology, creativity, and strategy to solve business challenges across operations, sales, and customer engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {solutionBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              className="p-8 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <h3 className="text-white text-2xl font-semibold mb-3">{block.title}</h3>
              <p className="text-cyan-100/65">{block.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 font-semibold mb-3">Industry Solutions</p>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Tailored for Your Industry
          </h2>
          <p className="mt-4 text-cyan-100/70 max-w-3xl mx-auto">
            Specialized solutions designed to address unique challenges and opportunities in your sector.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 min-h-[330px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
            >
              <img src={industry.image} alt={industry.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-[#1a0a2e]/65 to-[#0a0a0f]/35" />
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <h3 className="text-white text-2xl font-bold mb-2">{industry.title}</h3>
                <p className="text-cyan-100/85 text-sm mb-4">{industry.text}</p>
                <div className="flex flex-wrap gap-2">
                  {industry.points.map((point) => (
                    <span key={point} className="text-xs px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-100">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/services" className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold">
            Explore Services
          </Link>
          <Link to="/get-started" className="px-7 py-3 rounded-xl border border-cyan-500/40 text-cyan-300 font-semibold">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
