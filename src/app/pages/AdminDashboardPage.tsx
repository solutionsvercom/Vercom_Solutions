import { motion } from 'motion/react';
import {
  ArrowLeft,
  ExternalLink,
  Filter,
  LayoutDashboard,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../lib/apiBase';
import { clearAdminKey, getAdminKey } from './AdminLoginPage';

type Lead = {
  _id: string;
  source: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  budgetRange: string;
  subject: string;
  message: string;
  selectedServices: string[];
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

type Stats = {
  total: number;
  newToday: number;
  bySource: Record<string, number>;
  byStatus: Record<string, number>;
};

const SOURCE_LABELS: Record<string, string> = {
  contact_form: 'Contact',
  get_started: 'Get Started',
  whatsapp_intent: 'WhatsApp',
  ai_assistant: 'AI assistant',
  ai_chat: 'AI chat (widget)',
  portfolio_access: 'Portfolio access',
};

const STATUS_OPTIONS = ['new', 'contacted', 'in_progress', 'closed', 'won'] as const;

/** Native selects need explicit dark option styling + color-scheme or options stay white-on-white in many browsers. */
const selectClass =
  'min-w-[10rem] px-3 py-2.5 rounded-xl border text-sm font-medium cursor-pointer ' +
  'bg-[#0f172a] text-cyan-100 border-cyan-500/40 shadow-inner ' +
  'hover:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ' +
  '[color-scheme:dark]';

const optionClass = 'bg-[#0f172a] text-cyan-50 py-1';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const authHeaders = useCallback((): Record<string, string> => {
    const key = getAdminKey()?.trim() || '';
    return {
      'Content-Type': 'application/json',
      'x-admin-key': key,
    };
  }, []);

  const load = useCallback(async () => {
    const key = getAdminKey();
    if (!key) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: '200' });
      if (sourceFilter) params.set('source', sourceFilter);
      if (statusFilter) params.set('status', statusFilter);
      if (appliedQuery.trim()) params.set('q', appliedQuery.trim());

      const [leadsRes, statsRes] = await Promise.all([
        fetch(apiUrl(`/api/admin/leads?${params}`), { headers: authHeaders() }),
        fetch(apiUrl('/api/admin/stats'), { headers: authHeaders() }),
      ]);

      if (leadsRes.status === 401 || statsRes.status === 401) {
        clearAdminKey();
        navigate('/admin/login', { replace: true });
        return;
      }

      const leadsJson = await leadsRes.json();
      const statsJson = await statsRes.json();

      if (!leadsJson.success) throw new Error(leadsJson.message || 'Failed to load leads.');
      if (!statsJson.success) throw new Error(statsJson.message || 'Failed to load stats.');

      setLeads(leadsJson.data);
      setTotal(leadsJson.total);
      setStats(statsJson.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load error');
    } finally {
      setLoading(false);
    }
  }, [authHeaders, navigate, sourceFilter, statusFilter, appliedQuery]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    const key = getAdminKey();
    if (!key) return;
    const res = await fetch(apiUrl(`/api/admin/leads/${id}/status`), {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    if (selected?._id === id) setSelected({ ...selected, status });
    void load();
  };

  const removeLead = async (id: string) => {
    if (
      !window.confirm(
        'Delete this lead permanently? It will be removed from MongoDB and cannot be recovered.',
      )
    ) {
      return;
    }
    const key = getAdminKey();
    if (!key) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(apiUrl(`/api/admin/leads/${id}`), {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.status === 401) {
        clearAdminKey();
        navigate('/admin/login', { replace: true });
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setError(typeof json.message === 'string' ? json.message : 'Delete failed.');
        return;
      }
      setLeads((prev) => prev.filter((l) => l._id !== id));
      setTotal((t) => Math.max(0, t - 1));
      if (selected?._id === id) setSelected(null);
      void load();
    } catch {
      setError('Delete failed. Try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const logout = () => {
    clearAdminKey();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e] text-cyan-100">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <header className="relative z-10 border-b border-cyan-500/15 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Lead dashboard</h1>
              <p className="text-cyan-100/50 text-xs">MongoDB → live pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-200 text-sm hover:bg-cyan-500/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Site
            </Link>
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-500/30 text-violet-200 text-sm hover:bg-violet-500/10"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-cyan-100 hover:bg-white/10"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total leads', value: stats.total, color: 'from-cyan-500/20 to-cyan-600/5' },
              { label: 'New today', value: stats.newToday, color: 'from-violet-500/20 to-violet-600/5' },
              {
                label: 'Contact form',
                value: stats.bySource.contact_form ?? 0,
                color: 'from-emerald-500/20 to-emerald-600/5',
              },
              {
                label: 'Get Started',
                value: stats.bySource.get_started ?? 0,
                color: 'from-amber-500/20 to-amber-600/5',
              },
              {
                label: 'Portfolio access',
                value: stats.bySource.portfolio_access ?? 0,
                color: 'from-fuchsia-500/20 to-fuchsia-600/5',
              },
            ].map((card) => (
              <motion.div
                key={card.label}
                className={`p-5 rounded-2xl border border-cyan-500/15 bg-gradient-to-br ${card.color} backdrop-blur-sm`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-cyan-100/55 text-xs font-medium uppercase tracking-wide">{card.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-6">
          <div className="flex-1 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-cyan-100/60 text-sm">
              <Filter className="w-4 h-4" />
              Filters
            </div>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className={selectClass}
              aria-label="Filter by source"
            >
              <option value="" className={optionClass}>
                All sources
              </option>
              {Object.entries(SOURCE_LABELS).map(([k, v]) => (
                <option key={k} value={k} className={optionClass}>
                  {v}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={selectClass}
              aria-label="Filter by status"
            >
              <option value="" className={optionClass}>
                All statuses
              </option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className={optionClass}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 w-full lg:max-w-md">
            <Search className="w-4 h-4 text-cyan-400/50 shrink-0" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setAppliedQuery(searchInput.trim())}
              placeholder="Search name, email, message…"
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-cyan-500/25 text-sm text-white placeholder-cyan-100/35"
            />
            <button
              type="button"
              onClick={() => setAppliedQuery(searchInput.trim())}
              className="px-3 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/35 text-cyan-200 text-sm"
            >
              Search
            </button>
          </div>
        </div>

        {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}

        <div className="rounded-2xl border border-cyan-500/15 overflow-hidden bg-white/[0.03] backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-cyan-500/15 bg-cyan-500/5 text-cyan-100/70 text-xs uppercase">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-cyan-100/50">
                      Loading…
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-cyan-100/50">
                      No leads match. Try clearing filters.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="border-b border-cyan-500/10 hover:bg-white/[0.04]">
                      <td className="px-4 py-3 text-cyan-100/80 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 rounded-lg bg-violet-500/20 text-violet-200 text-xs">
                          {SOURCE_LABELS[lead.source] || lead.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-cyan-100/70 max-w-[200px] truncate">
                        {lead.email || '—'} {lead.phone ? `· ${lead.phone}` : ''}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status}
                          onChange={(e) => void updateStatus(lead._id, e.target.value)}
                          className={`${selectClass} min-w-0 text-xs py-1.5 px-2`}
                          aria-label={`Status for ${lead.name}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} className={optionClass}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelected(lead)}
                            className="text-cyan-400 text-xs font-semibold hover:underline inline-flex items-center gap-1"
                          >
                            View
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void removeLead(lead._id)}
                            disabled={deletingId === lead._id}
                            className="text-rose-400 text-xs font-semibold hover:underline inline-flex items-center gap-1 disabled:opacity-50"
                            aria-label={`Delete lead ${lead.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            {deletingId === lead._id ? '…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 text-xs text-cyan-100/45 border-t border-cyan-500/10">
            Showing {leads.length} of {total} leads
          </div>
        </div>
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal
        >
          <motion.div
            className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-cyan-500/25 bg-[#0f0a1a] shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 border-b border-cyan-500/15 flex justify-between items-start gap-4">
              <div>
                <p className="text-cyan-400 text-xs font-semibold uppercase">
                  {SOURCE_LABELS[selected.source] || selected.source}
                </p>
                <h2 className="text-white text-xl font-bold mt-1">{selected.name}</h2>
                <p className="text-cyan-100/50 text-xs mt-1">
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="shrink-0 p-1.5 rounded-lg text-cyan-100/60 hover:text-white hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              {selected.email && (
                <div className="flex items-center gap-2 text-cyan-100/90">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a href={`mailto:${selected.email}`} className="text-cyan-300 hover:underline">
                    {selected.email}
                  </a>
                </div>
              )}
              {selected.phone && (
                <div className="flex items-center gap-2 text-cyan-100/90">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <a href={`tel:${selected.phone}`} className="text-cyan-300 hover:underline">
                    {selected.phone}
                  </a>
                </div>
              )}
              {selected.company && (
                <p>
                  <span className="text-cyan-100/50">Company:</span> {selected.company}
                </p>
              )}
              {selected.industry && (
                <p>
                  <span className="text-cyan-100/50">Industry:</span> {selected.industry}
                </p>
              )}
              {selected.budgetRange && (
                <p>
                  <span className="text-cyan-100/50">Budget:</span> {selected.budgetRange}
                </p>
              )}
              {selected.subject && (
                <p>
                  <span className="text-cyan-100/50">Subject:</span>{' '}
                  <span className="text-white">{selected.subject}</span>
                </p>
              )}
              {selected.selectedServices?.length > 0 && (
                <div>
                  <p className="text-cyan-100/50 mb-1">Services</p>
                  <div className="flex flex-wrap gap-1">
                    {selected.selectedServices.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-200 text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-cyan-100/50 mb-1">Message / details</p>
                <pre className="whitespace-pre-wrap text-cyan-100/90 text-xs bg-black/30 rounded-xl p-4 border border-cyan-500/10">
                  {selected.message}
                </pre>
              </div>
              {selected.meta && Object.keys(selected.meta).length > 0 && (
                <div>
                  <p className="text-cyan-100/50 mb-1">Meta</p>
                  <pre className="whitespace-pre-wrap text-cyan-100/70 text-xs bg-black/30 rounded-xl p-4 border border-cyan-500/10 overflow-x-auto">
                    {JSON.stringify(selected.meta, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-cyan-500/15 flex flex-wrap gap-3 justify-end">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-200 text-sm hover:bg-cyan-500/10"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => void removeLead(selected._id)}
                disabled={deletingId === selected._id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-sm font-semibold hover:bg-rose-500/30 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {deletingId === selected._id ? 'Deleting…' : 'Delete from database'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
