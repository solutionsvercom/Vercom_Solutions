import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogoBox } from '../components/BrandLogoBox';
import { apiUrl } from '../lib/apiBase';

const STORAGE_KEY = 'vercom_admin_key';

export function getAdminKey(): string | null {
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setAdminKey(key: string) {
  sessionStorage.setItem(STORAGE_KEY, key);
}

export function clearAdminKey() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [secret, setSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const trimmed = secret.trim();
      const res = await fetch(apiUrl('/api/admin/verify'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': trimmed,
        },
        body: JSON.stringify({ adminKey: trimmed }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          message?: string;
          meta?: { keyReceivedChars?: number; secretConfiguredChars?: number; emptyPayload?: boolean };
        };
        const hint =
          data.meta != null
            ? ` (received ${data.meta.keyReceivedChars ?? 0} chars, server expects ${data.meta.secretConfiguredChars ?? 0}; body empty: ${data.meta.emptyPayload ?? '?'})`
            : '';
        throw new Error((data.message || 'Invalid admin key.') + hint);
      }
      setAdminKey(trimmed);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e] px-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[140px]" />

      <motion.div
        className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md shadow-[0_0_80px_rgba(0,255,255,0.12)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <BrandLogoBox />
          <div>
            <p className="text-cyan-400 text-sm font-semibold">Vercom Solutions</p>
            <h1 className="text-white text-xl font-bold">Admin login</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-secret" className="text-cyan-100/80 text-sm font-medium block mb-2">
              Admin key
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
              <input
                id="admin-secret"
                type="password"
                autoComplete="current-password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/35 focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="From server ADMIN_SECRET"
                required
              />
            </div>
          </div>

          {error && <p className="text-rose-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold disabled:opacity-50"
          >
            {loading ? 'Checking…' : 'Enter dashboard'}
          </button>
        </form>

        <p className="text-cyan-100/45 text-xs mt-6 text-center">
          Leads are stored in MongoDB first; this panel reads the same database.
        </p>
      </motion.div>
    </section>
  );
}
