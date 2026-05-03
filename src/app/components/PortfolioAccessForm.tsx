import { motion } from 'motion/react';
import { Loader2, Mail, Phone } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { apiUrl } from '../lib/apiBase';

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  onSuccess: () => void;
};

export function PortfolioAccessForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const em = email.trim().toLowerCase();
    const ph = phone.trim();
    if (!EMAIL_RX.test(em)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (ph.length < 5) {
      setError('Please enter a valid phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(apiUrl('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'portfolio_access',
          name: 'Portfolio visitor',
          email: em,
          phone: ph,
          message: 'Requested access to explore portfolio projects.',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setError(typeof json.message === 'string' ? json.message : 'Something went wrong. Try again.');
        return;
      }
      onSuccess();
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#0a0a0f]/85 border border-cyan-500/30 text-white text-sm sm:text-base ' +
    'placeholder:text-cyan-100/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/35 focus:border-cyan-400/40';

  return (
    <motion.div
      className="max-w-lg mx-auto rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-md px-5 py-5 sm:px-6 sm:py-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-4 sm:mb-5">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Explore our projects</h3>
        <p className="mt-1.5 text-xs sm:text-sm text-cyan-100/55 leading-snug max-w-sm mx-auto">
          Enter your email and phone once. We’ll only use this to follow up if it makes sense.
        </p>
      </div>

      <form onSubmit={(e) => void submit(e)} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-3">
          <div className="sm:col-span-1">
            <label htmlFor="portfolio-email" className="flex items-center gap-1.5 text-xs font-medium text-cyan-100/65 mb-1">
              <Mail className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" aria-hidden />
              Email
            </label>
            <input
              id="portfolio-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="portfolio-phone" className="flex items-center gap-1.5 text-xs font-medium text-cyan-100/65 mb-1">
              <Phone className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" aria-hidden />
              Phone
            </label>
            <input
              id="portfolio-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-xs sm:text-sm text-rose-400 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          className="w-full mt-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_4px_20px_rgba(6,182,212,0.25)] disabled:opacity-60 disabled:cursor-not-allowed"
          whileHover={submitting ? undefined : { scale: 1.01 }}
          whileTap={submitting ? undefined : { scale: 0.99 }}
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Unlocking…
            </>
          ) : (
            'Explore our projects'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
