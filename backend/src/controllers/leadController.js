import { Lead, SOURCES } from '../models/Lead.js';

function phoneDigitsOnly(phone) {
  return String(phone || '').replace(/\D/g, '');
}

function validateLeadBody(body) {
  const {
    source,
    name,
    email,
    phone,
    company,
    industry,
    budgetRange,
    subject,
    message,
    selectedServices,
    meta,
  } = body;

  if (!source || !SOURCES.includes(source)) {
    return { ok: false, message: 'Invalid or missing source.' };
  }

  let resolvedMessage = String(message || '').trim();
  if (!resolvedMessage && source === 'portfolio_access') {
    resolvedMessage = 'Requested access to explore portfolio projects.';
  }
  if (!resolvedMessage && source === 'newsletter') {
    resolvedMessage = 'Footer newsletter signup — requested updates and insights.';
  }
  if (!resolvedMessage) {
    return { ok: false, message: 'Message is required.' };
  }

  if (source === 'contact_form') {
    if (!name || !email || !subject) {
      return { ok: false, message: 'Name, email, and subject are required.' };
    }
  }

  if (source === 'get_started') {
    if (!name || !email || !phone) {
      return { ok: false, message: 'Name, email, and phone are required.' };
    }
  }

  if (source === 'ai_assistant') {
    if (!name || !String(name).trim()) {
      return { ok: false, message: 'Name or label is required.' };
    }
  }

  if (source === 'portfolio_access') {
    const em = email ? String(email).trim().toLowerCase() : '';
    const ph = phone ? String(phone).trim() : '';
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    if (!emailOk) {
      return { ok: false, message: 'A valid email is required.' };
    }
    if (!ph || ph.length < 5) {
      return { ok: false, message: 'A valid phone number is required.' };
    }
  }

  if (source === 'newsletter') {
    const em = email ? String(email).trim().toLowerCase() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      return { ok: false, message: 'A valid email is required.' };
    }
    const ph = phone ? String(phone).trim() : '';
    if (ph && ph.length < 5) {
      return { ok: false, message: 'If provided, enter a valid phone number.' };
    }
  }

  const resolvedName =
    source === 'ai_chat'
      ? String(name || 'Chat visitor').trim() || 'Chat visitor'
      : source === 'portfolio_access'
        ? String(name || 'Portfolio visitor').trim() || 'Portfolio visitor'
        : source === 'newsletter'
          ? String(name || 'Newsletter subscriber').trim() || 'Newsletter subscriber'
          : String(name).trim();

  if (!resolvedName && source !== 'whatsapp_intent' && source !== 'portfolio_access' && source !== 'newsletter') {
    return { ok: false, message: 'Name is required.' };
  }

  const whatsappName = String(name || 'WhatsApp visitor').trim() || 'WhatsApp visitor';

  return {
    ok: true,
    payload: {
      source,
      name: source === 'whatsapp_intent' ? whatsappName : resolvedName,
      email: email ? String(email).trim().toLowerCase() : '',
      phone: phone ? String(phone).trim() : '',
      company: company ? String(company).trim() : '',
      industry: industry ? String(industry).trim() : '',
      budgetRange: budgetRange ? String(budgetRange).trim() : '',
      subject:
        source === 'newsletter'
          ? String(subject || 'Newsletter').trim() || 'Newsletter'
          : subject
            ? String(subject).trim()
            : '',
      message: resolvedMessage,
      selectedServices: Array.isArray(selectedServices) ? selectedServices.map(String) : [],
      meta: meta && typeof meta === 'object' ? meta : {},
    },
  };
}

export async function createLead(req, res) {
  try {
    const check = validateLeadBody(req.body);
    if (!check.ok) {
      return res.status(400).json({ success: false, message: check.message });
    }

    const { payload } = check;

    if (payload.source === 'portfolio_access') {
      const incomingDigits = phoneDigitsOnly(payload.phone);
      const existingList = await Lead.find({
        source: 'portfolio_access',
        email: payload.email,
      }).lean();

      const existing = existingList.find((doc) => phoneDigitsOnly(doc.phone) === incomingDigits);

      if (existing) {
        return res.status(200).json({
          success: true,
          duplicate: true,
          message: 'Portfolio access already recorded for this email and phone.',
          data: existing,
        });
      }
    }

    const doc = await Lead.create(payload);
    return res.status(201).json({
      success: true,
      message: req.body.source === 'contact_form' ? 'Message sent successfully.' : 'Lead captured.',
      data: doc,
    });
  } catch (error) {
    console.error('createLead', error);
    return res.status(500).json({
      success: false,
      message: 'Could not save lead.',
    });
  }
}
