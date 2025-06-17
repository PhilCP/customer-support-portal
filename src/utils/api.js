const KEY = "__tickets";

export function login(email) {
  localStorage.setItem("token", "fake");
}

export function signup(email) {
  login(email);
}

export function requireAuth() {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
    throw new Error("Unauthorized");
  }
}

// Internal helpers
function getAllTickets() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function saveAllTickets(tickets) {
  localStorage.setItem(KEY, JSON.stringify(tickets));
}

// Fetch all tickets
export function getTickets() {
  requireAuth();
  const tickets = getAllTickets();
  return new Promise((res) =>
    setTimeout(() => res([...tickets]), 500)
  );
}

// Fetch a single ticket
export function getTicket(id) {
  requireAuth();
  const tickets = getAllTickets();
  const t = tickets.find((t) => t.id === id);
  return Promise.resolve(t);
}

// Create a new ticket
export function addTicket({ title, description, priority }) {
  requireAuth();
  const newTicket = {
    id: Date.now().toString(),
    title,
    description,
    priority,
    status: "Open",
    createdAt: new Date().toISOString(),
    comments: [],
  };
  const tickets = getAllTickets();
  const updated = [newTicket, ...tickets];
  saveAllTickets(updated);
  return Promise.resolve(newTicket);
}

// Add a comment to a ticket
export function addComment(ticketId, text) {
  requireAuth();
  const tickets = getAllTickets();
  const updated = tickets.map((t) =>
    t.id === ticketId
      ? {
          ...t,
          comments: [...t.comments, { text, date: new Date().toISOString() }],
        }
      : t
  );
  saveAllTickets(updated);
  return Promise.resolve();
}

// Delete a ticket
export function deleteTicket(id) {
  requireAuth();
  const tickets = getAllTickets();
  const updated = tickets.filter((t) => t.id !== id);
  saveAllTickets(updated);
  return Promise.resolve();
}

// Edit an existing ticket
export function editTicket(id, { title, description, priority }) {
  requireAuth();
  const tickets = getAllTickets();
  const updated = tickets.map((t) =>
    t.id === id
      ? {
          ...t,
          title,
          description,
          priority,
        }
      : t
  );
  saveAllTickets(updated);
  return Promise.resolve();
}
