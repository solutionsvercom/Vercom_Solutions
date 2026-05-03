import { createLead } from './leadController.js';

/** Contact page — stored as unified Lead (contact_form). */
export function createContactMessage(req, res) {
  req.body = { ...req.body, source: 'contact_form' };
  return createLead(req, res);
}
