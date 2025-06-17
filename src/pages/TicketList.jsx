import { useState, useEffect } from "react";
import { getTickets, deleteTicket } from "../utils/api";
import { Spinner, Empty } from "../components";
import { Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TicketList() {
  const [tickets, setTickets] = useState(null);
  const [offline, setOffline] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    let canceled = false;

    async function load() {
      try {
        const data = await getTickets();
        if (!canceled) {
          setTickets(data);
          setOffline(false);
        }
      } catch (err) {
        console.warn("API fetch failed, trying cache...", err);
        const cached = await caches.open("ticket-api").then((cache) =>
          cache.match("/tickets").then((resp) => resp?.json())
        );
        if (!canceled) {
          setTickets(cached || []);
          setOffline(true);
        }
      }
    }

    load();
    const id = setInterval(load, 30000);
    return () => {
      canceled = true;
      clearInterval(id);
    };
  }, []);

  async function handleDelete(id) {
    await deleteTicket(id);
    setTickets((prev) => prev.filter((t) => t.id !== id));
  }

  if (!tickets) return <Spinner />;
  if (tickets.length === 0) return <Empty text="No tickets yet. Create one!" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-4 text-white">
      {offline && (
        <div className="mb-3 p-2 rounded bg-yellow-100 text-yellow-800 text-sm text-center">
          Offline mode: showing cached tickets
        </div>
      )}

      <button
        className="mb-6 flex items-center text-white bg-green-600 px-4 py-2 font-semibold hover:bg-green-700 transition rounded-[25px] border"
        onClick={() => nav("/ticket/new")}
      >
        <Plus className="mr-2" /> New Ticket
      </button>

      <ul className="space-y-4">
        {tickets.map((t) => (
          <li
            key={t.id}
            className="p-4 bg-white/10 shadow flex justify-between items-center backdrop-blur border border-white/20 cursor-pointer hover:bg-white/20 transition rounded-[25px]"
          >
            <div
              onClick={() => nav(`/ticket/${t.id}`)}
              className="flex-1"
            >
              <div className="font-semibold text-white">{t.title}</div>
              <div className="text-sm text-gray-300">
                {new Date(t.createdAt).toLocaleString()}
              </div>
              <div
                className={`text-sm font-bold ${
                  t.status === "Open" ? "text-green-400" : "text-red-400"
                }`}
              >
                {t.status}
              </div>
            </div>
            <button
              className="text-red-400 hover:text-red-600 ml-4"
              onClick={() => handleDelete(t.id)}
              title="Delete Ticket"
            >
              <Trash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
