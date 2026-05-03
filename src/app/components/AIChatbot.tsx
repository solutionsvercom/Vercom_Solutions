import { motion, AnimatePresence } from 'motion/react';
import { Bot, Check, X, Send, Sparkles } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesData, type ServiceItem } from '../data/services';
import { fireAndForgetLead } from '../lib/submitLead';

type FlowPhase = 'services' | 'multi-next' | 'single-features' | 'customize-details';

type CustomizeSource = 'multi' | 'single';

/** Align catalog titles with Get Started step-1 service chip labels */
function toGetStartedServiceName(catalogTitle: string): string {
  const map: Record<string, string> = {
    'ERP (Enterprise Resource Planning)': 'ERP',
    'Mobile Applications': 'Mobile Apps',
  };
  return map[catalogTitle] ?? catalogTitle;
}

export type AiCustomizeNavigationState = {
  fromAiCustomize: true;
  services: string[];
  featurePicks: string[];
  industryHint: string;
  customizationNotes: string;
};

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

/** Sub-services / features per catalog item (by slug) — kept UI-oriented, not long copy */
const SERVICE_FEATURES: Record<string, string[]> = {
  'saas-development': [
    'MVP / product build',
    'Multi-tenant & auth',
    'APIs & integrations',
    'Billing & subscriptions',
    'Admin dashboard',
    'Ongoing support',
  ],
  'crm-solutions': [
    'Sales pipeline',
    'Support / helpdesk',
    'Marketing automation',
    'Reports & analytics',
    'Integrations',
    'Custom fields & workflows',
  ],
  'erp-enterprise-resource-planning': [
    'Finance & accounting',
    'Inventory & warehouse',
    'HR & payroll',
    'Procurement',
    'Manufacturing / ops',
    'Executive reporting',
  ],
  'mobile-applications': [
    'iOS',
    'Android',
    'Cross-platform (RN / Flutter)',
    'UI/UX',
    'Store launch',
    'Maintenance',
  ],
  'ai-machine-learning': [
    'Process automation',
    'Predictive analytics',
    'Chatbots / NLP',
    'Computer vision',
    'Custom ML models',
    'Data pipelines',
  ],
  'graphic-design': [
    'Logo design',
    'Brand identity',
    'Visiting card',
    'Poster design',
    'Social media creatives',
    'Brochure / print',
  ],
  'website-design': [
    'Landing page',
    'Corporate website',
    'E‑commerce UX',
    'Wireframes',
    'Design system',
    'Redesign',
  ],
  'web-development': [
    'Frontend',
    'Backend / API',
    'Full‑stack app',
    'CMS',
    'E‑commerce build',
    'Performance tuning',
  ],
  'digital-marketing': [
    'SEO',
    'PPC / paid ads',
    'Content strategy',
    'Email marketing',
    'Analytics setup',
    'CRO',
  ],
  'social-media-marketing': [
    'Content calendar',
    'Community management',
    'Paid social',
    'Influencer campaigns',
    'Reels / shorts',
    'Reporting',
  ],
  'audio-video-editing': [
    'Commercial / ad cuts',
    'Social formats',
    'Color grading',
    'Sound design',
    'Podcast editing',
    'Long-form story',
  ],
  'motion-graphics': [
    'Logo animation',
    'Explainer motion',
    'Social ad motion',
    '3D product shots',
    'Compositing',
    'Titles & lower-thirds',
  ],
  animation: [
    '2D character',
    '3D product',
    'Explainer',
    'Whiteboard style',
    'Technical / medical',
    'Storyboarding',
  ],
  'brand-advertisement-luxury-promotion-shoots': [
    'Campaign concept',
    'Studio shoot',
    'Lifestyle / location',
    'Lookbook',
    'Product hero',
    'Post-production',
  ],
};

const fallbackFeatures = (service: ServiceItem) => service.tags.slice(0, 6);

function featuresForService(service: ServiceItem): string[] {
  return SERVICE_FEATURES[service.slug] ?? fallbackFeatures(service);
}

let messageId = 2;

export function AIChatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Pick one or more services, then tap Continue.',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [phase, setPhase] = useState<FlowPhase>('services');
  const [pickedServiceTitles, setPickedServiceTitles] = useState<string[]>([]);
  const [singleService, setSingleService] = useState<ServiceItem | null>(null);
  const [pickedFeatures, setPickedFeatures] = useState<string[]>([]);
  const [customizeSource, setCustomizeSource] = useState<CustomizeSource | null>(null);
  const [customBusiness, setCustomBusiness] = useState('');
  const [customDetails, setCustomDetails] = useState('');
  const [customizeSubmitting, setCustomizeSubmitting] = useState(false);

  const pushBot = useCallback((text: string) => {
    messageId += 1;
    setMessages((prev) => [...prev, { id: messageId, text, isBot: true, timestamp: new Date() }]);
  }, []);

  const pushUser = useCallback((text: string) => {
    messageId += 1;
    setMessages((prev) => [...prev, { id: messageId, text, isBot: false, timestamp: new Date() }]);
  }, []);

  const resetFlow = useCallback(() => {
    setPhase('services');
    setPickedServiceTitles([]);
    setSingleService(null);
    setPickedFeatures([]);
    setCustomizeSource(null);
    setCustomBusiness('');
    setCustomDetails('');
    setCustomizeSubmitting(false);
    messageId += 1;
    setMessages([
      {
        id: messageId,
        text: 'Pick one or more services, then tap Continue.',
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const toggleServiceTitle = (title: string) => {
    setPickedServiceTitles((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const continueFromServices = () => {
    if (pickedServiceTitles.length === 0) {
      pushBot('Select at least one service to continue.');
      return;
    }

    if (pickedServiceTitles.length >= 2) {
      pushUser(`Continue (${pickedServiceTitles.length} services)`);
      setPhase('multi-next');
      pushBot("You've selected multiple services. What would you like to do next?");
      return;
    }

    const one = servicesData.find((s) => s.title === pickedServiceTitles[0]);
    if (!one) return;

    pushUser(`Continue: ${one.title}`);
    setSingleService(one);
    setPickedFeatures([]);
    setPhase('single-features');
    pushBot(`Choose what you need in ${one.title}:`);
  };

  const toggleFeature = (label: string) => {
    setPickedFeatures((prev) => (prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]));
  };

  const editServicesFromMulti = () => {
    setPhase('services');
    setSingleService(null);
    pushBot('Adjust your service selection, then Continue.');
  };

  const openCustomizeDetails = (source: CustomizeSource) => {
    setCustomizeSource(source);
    setCustomBusiness('');
    setCustomDetails('');
    setPhase('customize-details');
    pushBot(
      source === 'multi'
        ? 'Briefly describe your business and the customization you want across these services.'
        : 'Briefly describe your business and how you want this service customized.'
    );
  };

  const onCustomizePackage = () => {
    pushUser('Customize Package');
    openCustomizeDetails('multi');
  };

  const backFromCustomizeDetails = () => {
    const src = customizeSource;
    setCustomBusiness('');
    setCustomDetails('');
    setCustomizeSource(null);
    if (src === 'single') {
      setPhase('single-features');
      pushBot('Back to your selections.');
    } else {
      setPhase('multi-next');
      pushBot('Back — choose an option or edit services.');
    }
  };

  const submitCustomizeDetails = async () => {
    const biz = customBusiness.trim();
    const det = customDetails.trim();
    if (!biz || !det) {
      pushBot('Please fill in both: your business and the customization you need.');
      return;
    }

    const src = customizeSource;
    if (!src) return;

    const catalogServices =
      src === 'multi' ? [...pickedServiceTitles] : singleService ? [singleService.title] : [];
    const featurePicks = src === 'single' ? [...pickedFeatures] : [];

    const subject =
      src === 'multi'
        ? `AI customization — ${catalogServices.length} services`
        : `AI customization — ${singleService?.title ?? 'service'}`;

    setCustomizeSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'ai_assistant',
          name: biz.slice(0, 120),
          subject,
          message: `Business / industry:\n${biz}\n\nCustomization needed:\n${det}`,
          selectedServices: catalogServices,
          industry: biz.slice(0, 200),
          meta: {
            flow: 'customize_details_submit',
            featurePicks,
            getStartedLabels: catalogServices.map(toGetStartedServiceName),
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error((data as { message?: string }).message || 'Could not submit.');
      }

      pushUser('Submit customization request');
      pushBot("Thanks — we've received your details. Our team will review and reach out soon.");
      setPhase('services');
      setPickedServiceTitles([]);
      setSingleService(null);
      setPickedFeatures([]);
      setCustomizeSource(null);
      setCustomBusiness('');
      setCustomDetails('');
    } catch (e) {
      pushBot(e instanceof Error ? e.message : 'Submit failed. Try again or use the Contact page.');
    } finally {
      setCustomizeSubmitting(false);
    }
  };

  const onRequestConsultation = () => {
    pushUser('Request Consultation');
    fireAndForgetLead({
      source: 'ai_assistant',
      name: 'AI assistant visitor',
      subject: 'Consultation request',
      message: `Consultation requested after selecting: ${pickedServiceTitles.join(', ') || 'multiple services'}.`,
      selectedServices: [...pickedServiceTitles],
      meta: { flow: 'multi_service' },
    });
    pushBot('Opening contact — tell us your goals there.');
    navigate('/contact');
  };

  const onGetQuote = () => {
    if (pickedFeatures.length === 0) {
      pushBot('Pick at least one focus area, or tap Customize More to adjust.');
      return;
    }
    pushUser('Get Quote');
    fireAndForgetLead({
      source: 'ai_assistant',
      name: 'AI assistant visitor',
      subject: singleService ? `Quote — ${singleService.title}` : 'Quote request',
      message: `Quote requested. Focus: ${pickedFeatures.join(', ')}.`,
      selectedServices: singleService ? [singleService.title] : [],
      meta: { flow: 'single_service_quote' },
    });
    pushBot('Redirecting to Get Started for your quote.');
    navigate('/get-started');
  };

  const onCustomizeMore = () => {
    pushUser('Customize More');
    openCustomizeDetails('single');
  };

  const onTalkToExpert = () => {
    pushUser('Talk to Expert');
    const detail =
      singleService && phase === 'single-features'
        ? `Expert help: ${singleService.title}. Focus: ${pickedFeatures.join(', ') || 'n/a'}.`
        : 'Talk to expert from AI assistant.';
    fireAndForgetLead({
      source: 'ai_assistant',
      name: 'AI assistant visitor',
      subject: 'Talk to expert',
      message: detail,
      selectedServices: singleService ? [singleService.title] : [...pickedServiceTitles],
      meta: { flow: 'talk_expert' },
    });
    pushBot('Connecting you with our team.');
    navigate('/contact');
  };

  const handleFreeText = () => {
    const raw = inputValue.trim();
    if (!raw) return;
    setInputValue('');
    pushUser(raw);

    const n = raw.toLowerCase();
    if (n.includes('price') || n.includes('cost') || n.includes('quote')) {
      pushBot('Pricing depends on scope. Use the buttons below or open Get Started.');
      return;
    }
    if (n.includes('human') || n.includes('call') || n.includes('talk')) {
      onTalkToExpert();
      return;
    }
    pushBot('Fastest path: use the buttons for services and next steps.');
  };

  return (
    <>
      <motion.div
        className="fixed bottom-8 left-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
      >
        <motion.button
          type="button"
          className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-[0_0_30px_rgba(138,43,226,0.5)] flex items-center justify-center"
          whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(138,43,226,0.7)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            boxShadow: [
              '0 0 30px rgba(138,43,226,0.5)',
              '0 0 50px rgba(138,43,226,0.7)',
              '0 0 30px rgba(138,43,226,0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="bot"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Bot className="w-8 h-8 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="absolute inset-0 rounded-full border-2 border-violet-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute bottom-full left-0 mb-4 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold whitespace-nowrap shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
            >
              AI Assistant
              <div className="absolute top-full left-4 w-3 h-3 bg-violet-500 transform rotate-45 -translate-y-1/2" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-32 left-8 z-50 w-80 sm:w-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="relative rounded-3xl border border-violet-500/30 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[0_0_80px_rgba(138,43,226,0.3)] overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-violet-500 to-purple-600">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Bot className="w-6 h-6 text-violet-600" />
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg">AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-violet-100 text-sm">Online</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={resetFlow}
                    className="text-xs text-violet-100 hover:text-white underline shrink-0"
                  >
                    Start over
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[22rem] overflow-y-auto">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`flex gap-3 ${!message.isBot ? 'flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1 max-w-[85%]">
                      <div
                        className={`p-3 rounded-2xl text-sm leading-snug ${
                          message.isBot
                            ? 'rounded-tl-none bg-violet-500/20 border border-violet-500/30 text-cyan-100'
                            : 'rounded-tr-none bg-cyan-500/20 border border-cyan-500/30 text-cyan-50'
                        }`}
                      >
                        {message.text}
                      </div>
                      <p className="text-[10px] text-cyan-100/40 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Phase: pick services */}
                {phase === 'services' && (
                  <div className="space-y-2 pt-1">
                    <p className="text-cyan-100/50 text-[10px] font-semibold uppercase tracking-wide">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {servicesData.map((s) => {
                        const on = pickedServiceTitles.includes(s.title);
                        return (
                          <button
                            key={s.slug}
                            type="button"
                            onClick={() => toggleServiceTitle(s.title)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                              on
                                ? 'border-cyan-400 bg-cyan-500/25 text-white'
                                : 'border-violet-500/30 bg-violet-500/10 text-cyan-100 hover:bg-violet-500/20'
                            }`}
                          >
                            {on && <Check className="w-3 h-3 inline mr-1 -mt-0.5" />}
                            {s.title}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={continueFromServices}
                      className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* Phase: describe business + customization — submit as lead */}
                {phase === 'customize-details' && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label htmlFor="ai-custom-business" className="text-cyan-100/70 text-[11px] font-semibold block mb-1">
                        Your business or industry
                      </label>
                      <input
                        id="ai-custom-business"
                        type="text"
                        value={customBusiness}
                        onChange={(e) => setCustomBusiness(e.target.value)}
                        placeholder="e.g. Luxury retail, SaaS for clinics…"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-violet-500/30 text-white text-sm placeholder-cyan-100/35 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="ai-custom-details" className="text-cyan-100/70 text-[11px] font-semibold block mb-1">
                        What customization do you need?
                      </label>
                      <textarea
                        id="ai-custom-details"
                        value={customDetails}
                        onChange={(e) => setCustomDetails(e.target.value)}
                        placeholder="Goals, integrations, timeline, brand rules, deliverables…"
                        rows={4}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-violet-500/30 text-white text-sm placeholder-cyan-100/35 focus:outline-none focus:border-cyan-500/50 resize-none"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={customizeSubmitting}
                      onClick={() => void submitCustomizeDetails()}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold disabled:opacity-50"
                    >
                      {customizeSubmitting ? 'Submitting…' : 'Submit request'}
                    </button>
                    <button
                      type="button"
                      onClick={backFromCustomizeDetails}
                      disabled={customizeSubmitting}
                      className="w-full py-2 text-xs text-cyan-100/60 underline disabled:opacity-40"
                    >
                      Back
                    </button>
                  </div>
                )}

                {/* Phase: multiple services — next actions */}
                {phase === 'multi-next' && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={onCustomizePackage}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold"
                    >
                      Customize Package
                    </button>
                    <button
                      type="button"
                      onClick={onRequestConsultation}
                      className="w-full py-2.5 rounded-xl border border-violet-400/50 text-cyan-100 text-sm font-semibold hover:bg-violet-500/10"
                    >
                      Request Consultation
                    </button>
                    <button
                      type="button"
                      onClick={editServicesFromMulti}
                      className="w-full py-2 text-xs text-cyan-100/60 underline"
                    >
                      Edit service selection
                    </button>
                  </div>
                )}

                {/* Phase: single service — features + CTAs */}
                {phase === 'single-features' && singleService && (
                  <div className="space-y-3">
                    <p className="text-cyan-100/50 text-[10px] font-semibold uppercase tracking-wide">
                      Tap all that apply
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuresForService(singleService).map((f) => {
                        const on = pickedFeatures.includes(f);
                        return (
                          <button
                            key={f}
                            type="button"
                            onClick={() => toggleFeature(f)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                              on
                                ? 'border-cyan-400 bg-cyan-500/25 text-white'
                                : 'border-violet-500/30 bg-violet-500/10 text-cyan-100 hover:bg-violet-500/20'
                            }`}
                          >
                            {on && <Check className="w-3 h-3 inline mr-1 -mt-0.5" />}
                            {f}
                          </button>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        onClick={onGetQuote}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold"
                      >
                        Get Quote
                      </button>
                      <button
                        type="button"
                        onClick={onCustomizeMore}
                        className="w-full py-2.5 rounded-xl border border-violet-400/50 text-cyan-100 text-sm font-semibold hover:bg-violet-500/10"
                      >
                        Customize More
                      </button>
                      <button
                        type="button"
                        onClick={onTalkToExpert}
                        className="w-full py-2.5 rounded-xl border border-cyan-500/40 text-cyan-200 text-sm font-semibold hover:bg-cyan-500/10"
                      >
                        Talk to Expert
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPhase('services');
                        setSingleService(null);
                        setPickedFeatures([]);
                        pushBot('Pick services again, then Continue.');
                      }}
                      className="w-full py-1.5 text-xs text-cyan-100/60 underline"
                    >
                      Change service
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-violet-500/20">
                {phase === 'customize-details' ? (
                  <p className="text-[10px] text-cyan-100/50 text-center">
                    Fill the fields above, then tap Submit request — we’ll save this to your leads.
                  </p>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFreeText()}
                        placeholder="Optional message…"
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-violet-500/30 text-white placeholder-cyan-100/40 focus:outline-none focus:border-violet-500 transition-colors backdrop-blur-sm text-sm"
                      />
                      <motion.button
                        type="button"
                        onClick={handleFreeText}
                        className="px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-[0_0_20px_rgba(138,43,226,0.4)]"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(138,43,226,0.6)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <p className="text-[10px] text-cyan-100/40 mt-2 text-center">Button-first flow — fastest way to get a quote</p>
                  </>
                )}
              </div>

              <div className="absolute top-20 right-4 w-24 h-24 border border-violet-500/10 rounded-full -z-10" />
              <div className="absolute bottom-20 left-4 w-16 h-16 border border-purple-500/10 rounded-full -z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
