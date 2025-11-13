export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4100";

export async function listTickets() {
  const r = await fetch(`${API_BASE}/api/tickets`, { cache: "no-store" });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function createTicket(ticket: any) {
  const r = await fetch(`${API_BASE}/api/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function updateTicketStatus(id: string, status: string) {
  const r = await fetch(`${API_BASE}/api/tickets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
