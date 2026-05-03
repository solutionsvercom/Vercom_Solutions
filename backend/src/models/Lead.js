import mongoose from 'mongoose';

const SOURCES = [
  'contact_form',
  'get_started',
  'whatsapp_intent',
  'ai_assistant',
  'ai_chat',
  'portfolio_access',
];

const STATUSES = ['new', 'contacted', 'in_progress', 'closed', 'won'];

const leadSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      enum: SOURCES,
      index: true,
    },
    status: {
      type: String,
      enum: STATUSES,
      default: 'new',
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    industry: {
      type: String,
      trim: true,
      default: '',
    },
    budgetRange: {
      type: String,
      trim: true,
      default: '',
    },
    subject: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    selectedServices: {
      type: [String],
      default: [],
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ createdAt: -1 });

export const Lead = mongoose.model('Lead', leadSchema);
export { SOURCES, STATUSES };
