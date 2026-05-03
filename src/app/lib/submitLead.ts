/** POST unified lead to MongoDB via API (non-blocking). */
export function fireAndForgetLead(payload: Record<string, unknown>) {
  void fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});
}
