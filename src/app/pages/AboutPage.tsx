import { motion } from 'motion/react';
import { Award, Clock3, Lightbulb, Rocket, ShieldCheck, Users, Wrench } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Enterprise Clients' },
  { value: '1+', label: 'Years of Experience' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '2+', label: 'Location' },
];

const values = [
  {
    title: 'Innovation First',
    icon: Lightbulb,
    detail: 'Pushing boundaries to deliver cutting-edge solutions that set new industry standards.',
  },
  {
    title: 'Client Partnership',
    icon: Users,
    detail: 'Building long-term relationships based on trust, transparency, and mutual success.',
  },
  {
    title: 'Excellence Driven',
    icon: Award,
    detail: 'Maintaining the highest standards of quality and performance in everything we do.',
  },
  {
    title: 'Agile Delivery',
    icon: Rocket,
    detail: 'Fast iterations and continuous improvement ensuring rapid value delivery.',
  },
];

const highlights = [
  { title: 'Trusted & Secure', icon: ShieldCheck, detail: 'Enterprise-grade security with industry-standard compliance.' },
  { title: 'On-Time Delivery', icon: Clock3, detail: 'Commitment to deadlines with consistent completion.' },
  { title: 'Expert Team', icon: Users, detail: 'Seasoned professionals with decades of experience.' },
  { title: '24/7 Support', icon: Wrench, detail: 'Round-the-clock assistance for your operations.' },
];

const team = [
  { name: 'Yuvraj Tomar', role: 'CEO' },
  { name: 'Roshan Jhaa', role: 'CTA' },
  { name: 'Prerna Mishra', role: 'CFO' },
  { name: 'Anuj Sharma', role: 'CTO' },
];

export function AboutPage() {
  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-cyan-400 font-semibold mb-3">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Your Trusted Technology Partner
          </h1>
          <p className="mt-5 text-cyan-100/70 max-w-3xl mx-auto">
            For over 15 years, Vercom Solutions has been at the forefront of enterprise technology innovation, delivering transformative solutions worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
              <p className="text-cyan-100/70 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Building the Future of Enterprise Technology</h2>
          <p className="text-cyan-100/70 mb-4">
            Founded in 2025, Vercom Solutions began with a simple mission: to help businesses harness the power of technology to achieve their goals. What started as a small team of passionate engineers has grown.
          </p>
          <p className="text-cyan-100/70 mb-4">
            Our journey has been defined by a relentless commitment to innovation, quality, and customer success. We have helped Twenty Eight of companies transform their operations, streamline processes, and create measurable business value.
          </p>
          <p className="text-cyan-100/70 mb-4">
            Today, we continue to push boundaries, embracing emerging technologies like AI, machine learning, CRM/MIS, web development, mobile development, digital marketing, brand advertisement and luxury promotion shoots, and more.
          </p>
          <p className="text-cyan-300 italic">"To empower enterprises with innovative technology solutions that accelerate digital transformation."</p>
          <p className="text-cyan-100/70 text-sm mt-1">- Our Mission</p>
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">What Drives Us Forward</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                className="p-7 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">{reason.title}</h3>
                <p className="text-cyan-100/65 text-sm">{reason.detail}</p>
              </motion.div>
            );
          })}
        </div>

        <h2 className="text-3xl font-bold text-white mt-16 mb-6 text-center">Our Core Strengths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="p-7 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-cyan-100/65 text-sm">{item.detail}</p>
              </motion.div>
            );
          })}
        </div>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="p-6 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 mb-4" />
              <h3 className="text-white font-semibold text-lg">{member.name}</h3>
              <p className="text-cyan-300 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
