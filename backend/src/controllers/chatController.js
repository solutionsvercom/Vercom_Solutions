import { ChatMessage } from '../models/ChatMessage.js';
import { Lead } from '../models/Lead.js';

function getRuleBasedReply(input) {
  const message = input.toLowerCase();

  if (message.includes('service')) {
    return 'We provide website development, AI integration, mobile apps, cloud solutions, and digital marketing.';
  }

  if (message.includes('pricing') || message.includes('price') || message.includes('cost')) {
    return 'Our pricing depends on project scope. Share your requirement in the contact form and we will send a custom quote.';
  }

  if (message.includes('consultation') || message.includes('meeting')) {
    return 'Great! Please use the contact form and mention your preferred time, and our team will schedule a consultation.';
  }

  if (message.includes('portfolio')) {
    return 'You can scroll to the portfolio section to explore our latest work and case studies.';
  }

  return 'Thanks for reaching out. We can help you with full-stack web development, AI features, and business automation.';
}

export async function createChatReply(req, res) {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const reply = getRuleBasedReply(message);
    const savedChat = await ChatMessage.create({ message, reply });

    try {
      await Lead.create({
        source: 'ai_chat',
        name: 'Legacy chat widget',
        email: '',
        message: `User: ${message.trim()}\n\nAuto-reply: ${reply}`,
        subject: 'Website chat',
        meta: { chatMessageId: String(savedChat._id) },
      });
    } catch (e) {
      console.error('Lead log for chat failed', e.message);
    }

    return res.status(200).json({
      success: true,
      data: savedChat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Could not process chat request.',
    });
  }
}
