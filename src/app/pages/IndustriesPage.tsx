import { motion } from 'motion/react';
import { Building2, Dumbbell, GraduationCap, HeartPulse, Hotel, Tv } from 'lucide-react';

const industries = [
  { title: 'Hospitality', icon: Hotel, points: ['Booking Systems', 'Guest Management', 'Revenue Optimization'] },
  { title: 'Healthcare & HealthTech', icon: HeartPulse, points: ['EHR Integration', 'Telehealth', 'Patient Analytics'] },
  { title: 'Retail & E-Commerce', icon: Building2, points: ['Inventory', 'Customer 360', 'POS Systems'] },
  { title: 'EdTech & Learning', icon: GraduationCap, points: ['LMS', 'Student Analytics', 'E-Learning'] },
  { title: 'Fitness & Wellness', icon: Dumbbell, points: ['Booking', 'Membership', 'Scheduling'] },
  { title: 'Entertainment & Media', icon: Tv, points: ['Content Management', 'Streaming', 'Distribution'] },
];

export function IndustriesPage() {
  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-violet-400 font-semibold mb-3">Industry Solutions</p>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Tailored for Your Industry
          </h1>
          <p className="mt-5 text-cyan-100/70 max-w-3xl mx-auto">
            Specialized solutions designed to address unique challenges and opportunities in your sector.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                className="p-7 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{industry.title}</h3>
                <ul className="space-y-2">
                  {industry.points.map((point) => (
                    <li key={point} className="text-cyan-100/65 text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
