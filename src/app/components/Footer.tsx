import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { BrandLogoBox } from './BrandLogoBox';
import { apiUrl } from '../lib/apiBase';

type LucideSocial = { kind: 'lucide'; icon: LucideIcon; href: string; label: string; color: string };
type ImgSocial = { kind: 'img'; src: string; href: string; label: string; color: string };

const socialLinks: (LucideSocial | ImgSocial)[] = [
  {
    kind: 'lucide',
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=61585148619065',
    label: 'Facebook',
    color: 'hover:text-blue-400',
  },
  {
    kind: 'lucide',
    icon: Twitter,
    href: 'https://x.com/VercomSolutions',
    label: 'X (Twitter)',
    color: 'hover:text-cyan-400',
  },
  {
    kind: 'lucide',
    icon: Instagram,
    href: 'https://www.instagram.com/vercom_solutions/',
    label: 'Instagram',
    color: 'hover:text-pink-400',
  },
  {
    kind: 'lucide',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/vercom-solutions',
    label: 'LinkedIn',
    color: 'hover:text-blue-500',
  },
  {
    kind: 'lucide',
    icon: Youtube,
    href: 'https://www.youtube.com/@VercomSolutions',
    label: 'YouTube',
    color: 'hover:text-red-500',
  },
  {
    kind: 'img',
    src: 'https://cdn.simpleicons.org/quora/22d3ee',
    href: 'https://www.quora.com/profile/Vercom-Solutions',
    label: 'Quora',
    color: 'hover:brightness-125',
  },
  {
    kind: 'img',
    src: 'https://cdn.simpleicons.org/whatsapp/22d3ee',
    href: 'https://wa.me/917042183847',
    label: 'WhatsApp',
    color: 'hover:brightness-125',
  },
  {
    kind: 'img',
    src: 'https://cdn.simpleicons.org/pinterest/22d3ee',
    href: 'https://in.pinterest.com/vinayvercom/',
    label: 'Pinterest',
    color: 'hover:brightness-125',
  },
];

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterPhone, setNewsletterPhone] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterFeedback, setNewsletterFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null,
  );

  const submitNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    setNewsletterFeedback(null);
    const em = newsletterEmail.trim().toLowerCase();
    if (!EMAIL_RX.test(em)) {
      setNewsletterFeedback({ type: 'err', text: 'Please enter a valid email address.' });
      return;
    }
    const ph = newsletterPhone.trim();
    if (ph && ph.length < 5) {
      setNewsletterFeedback({ type: 'err', text: 'If you add a phone number, use a valid one.' });
      return;
    }

    setNewsletterSubmitting(true);
    try {
      const res = await fetch(apiUrl('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'newsletter',
          name: 'Newsletter subscriber',
          email: em,
          phone: ph,
          subject: 'Newsletter',
          message: 'Footer newsletter signup — requested updates and insights.',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setNewsletterFeedback({
          type: 'err',
          text: typeof json.message === 'string' ? json.message : 'Something went wrong. Try again.',
        });
        return;
      }
      setNewsletterFeedback({ type: 'ok', text: "Thanks — you're on the list. We'll be in touch." });
      setNewsletterEmail('');
      setNewsletterPhone('');
    } catch {
      setNewsletterFeedback({ type: 'err', text: 'Network error. Check your connection.' });
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const footerLinks = {
    Services: [
      'SaaS Development',
      'CRM Solutions',
      'ERP (Enterprise Resource Planning)',
      'Web Development',
      'Digital Marketing',
      'Brand Advertisement & Luxury Promotion Shoots',
    ],
    Company: ['About Us', 'Why Choose Us', 'Industries', 'Contact'],
    Resources: ['Get Started', 'Case Studies', 'Consultation', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
  };

  const clientLogos = [
    { name: 'YMB Go Express', role: 'CEO' },
    { name: 'Utkarsh Infratech', role: 'Director' },
    { name: 'Navjyoti Kids Villa School', role: 'Director' },
    { name: 'KYK', role: 'Director' },
    { name: 'Lifee', role: 'Founder and CEO' },
    { name: 'Aid For Mankind', role: 'CEO' },
    { name: 'ReviewMyFlat', role: 'Director' },
    { name: 'karakchaa', role: '' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#1a0a2e] to-[#0a0a0f] border-t border-cyan-500/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <BrandLogoBox />
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Vercom Solutions
                </h2>
                <p className="text-xs text-cyan-400/60">Smart Digital Solutions</p>
              </div>
            </motion.div>
            <p className="text-cyan-100/60 mb-6 leading-relaxed">
              Transforming businesses through innovative digital solutions, scalable technology, and measurable business outcomes.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={`${social.label}-${index}`}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 ${social.color} transition-colors inline-flex items-center justify-center`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.kind === 'lucide' ? (
                    <social.icon className="w-5 h-5" aria-hidden />
                  ) : (
                    <img src={social.src} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <div key={index}>
              <h3 className="text-white font-bold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <motion.a
                      href="/"
                      className="text-cyan-100/60 hover:text-cyan-400 transition-colors inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, text: 'solutionsvercom@gmail.com', color: 'from-cyan-500 to-blue-600' },
            { icon: Phone, text: '+91 7042183847', color: 'from-violet-500 to-purple-600' },
            { icon: MapPin, text: 'D-32 Third Floor, Main Vikas Marg, Laxmi Nagar, New Delhi-110092', color: 'from-pink-500 to-rose-600' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,255,255,0.1)' }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-cyan-100">{item.text}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Newsletter */}
        <motion.div
          className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-cyan-100/60 mb-6">
              Subscribe to our newsletter for the latest updates and insights
            </p>
            <form
              onSubmit={(ev) => void submitNewsletter(ev)}
              className="flex flex-col gap-3 max-w-xl mx-auto text-left"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="newsletter-email"
                  autoComplete="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 min-w-0 px-6 py-4 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm"
                />
                <input
                  type="tel"
                  name="newsletter-phone"
                  autoComplete="tel"
                  value={newsletterPhone}
                  onChange={(e) => setNewsletterPhone(e.target.value)}
                  placeholder="Phone (optional)"
                  className="flex-1 min-w-0 px-6 py-4 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <motion.button
                  type="submit"
                  disabled={newsletterSubmitting}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(0,255,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={newsletterSubmitting ? undefined : { scale: 1.05, boxShadow: '0 0 50px rgba(0,255,255,0.6)' }}
                  whileTap={newsletterSubmitting ? undefined : { scale: 0.95 }}
                >
                  {newsletterSubmitting ? 'Subscribing…' : 'Subscribe'}
                </motion.button>
                {newsletterFeedback && (
                  <p
                    className={`text-sm ${newsletterFeedback.type === 'ok' ? 'text-emerald-400' : 'text-rose-400'}`}
                  >
                    {newsletterFeedback.text}
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        {/* Client Logo Banner */}
        <div className="mb-12 overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-cyan-400/80 tracking-wide">
              Join 15+ Companies
            </h3>
          </div>
          <div className="relative">
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a0a2e] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1a0a2e] to-transparent z-10" />
            
            {/* Scrolling container */}
            <div className="flex gap-12">
              {/* First set of logos */}
              <motion.div
                className="flex gap-12 flex-shrink-0"
                animate={{ x: ['0%', '-100%'] }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              >
                {clientLogos.map((client, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-44 sm:w-48 min-h-[5.25rem] flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-xl border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-sm transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                      borderColor: 'rgba(0, 255, 255, 0.3)',
                    }}
                  >
                    <span className="text-sm font-bold text-cyan-200 text-center leading-snug">{client.name}</span>
                    {client.role ? (
                      <span className="text-xs text-cyan-100/55 text-center leading-tight">{client.role}</span>
                    ) : null}
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Duplicate set for seamless loop */}
              <motion.div
                className="flex gap-12 flex-shrink-0"
                animate={{ x: ['0%', '-100%'] }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              >
                {clientLogos.map((client, index) => (
                  <motion.div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 w-44 sm:w-48 min-h-[5.25rem] flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-xl border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-sm transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                      borderColor: 'rgba(0, 255, 255, 0.3)',
                    }}
                  >
                    <span className="text-sm font-bold text-cyan-200 text-center leading-snug">{client.name}</span>
                    {client.role ? (
                      <span className="text-xs text-cyan-100/55 text-center leading-tight">{client.role}</span>
                    ) : null}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cyan-100/60 text-sm">
              © {new Date().getFullYear()} Vercom Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <motion.a
                href="/"
                className="text-cyan-100/60 hover:text-cyan-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/"
                className="text-cyan-100/60 hover:text-cyan-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="/"
                className="text-cyan-100/60 hover:text-cyan-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Cookies
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500" />
    </footer>
  );
}