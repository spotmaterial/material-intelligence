// Shared helpers for the RED-Pro material database pages.
// The pages read the database through read-only functions with a publishable key (see api.html).
const SUPABASE_URL = 'https://bjkkqawalpuvsubnbodt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ZZN2JFwNHFbBLLjh2DE3cg_4t1YvQ7m';

async function rpc(name, args) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args || {})
  });
  const body = await r.json().catch(() => null);
  if (!r.ok) throw new Error((body && (body.message || body.error)) || `Request failed (${r.status})`);
  return body;
}

async function wordSearch(args) {
  const r = await fetch(`${SUPABASE_URL}/functions/v1/search`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args)
  });
  const body = await r.json().catch(() => null);
  if (!r.ok) throw new Error((body && body.error) || `Search failed (${r.status})`);
  return (body && body.rows) || [];
}

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pageFor = (code, kind) => (kind === 'innovation' || String(code).startsWith('INN-') ? 'innovation.html' : 'material.html') + '?code=' + encodeURIComponent(code);
const paras = (text) => String(text || '').split(/\n\s*\n/).map((p) => `<p>${esc(p.trim())}</p>`).join('');
