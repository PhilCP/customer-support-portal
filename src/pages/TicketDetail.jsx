import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, addComment, editTicket } from "../utils/api";
import { Spinner } from "../components";

export default function TicketDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "Low",
  });

  useEffect(() => {
    async function load() {
      const t = await getTicket(id);
      setTicket(t);
      setEditData({
        title: t.title,
        description: t.description,
        priority: t.priority,
      });
    }
    load();
  }, [id]);

  async function handleAddComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    await addComment(id, comment);
    const updated = await getTicket(id);
    setTicket(updated);
    setComment("");
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    await editTicket(id, editData);
    const updated = await getTicket(id);
    setTicket(updated);
    setIsEditing(false);
  }

  if (!ticket) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4 py-6 text-white">
      <div className="max-w-xl mx-auto space-y-6">
        <button
          onClick={() => nav("/")}
          className="text-blue-300 underline text-sm"
        >
          ← Back to tickets
        </button>

        <div className="bg-white/10 dark:bg-black/30 p-6 shadow border border-white/20 space-y-2 backdrop-blur-md rounded-[25px] border">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full p-3 bg-white/20 text-white rounded-[25px] border placeholder-white"
                placeholder="Title"
                required
              />
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="w-full p-3 bg-white/20 text-white rounded-[25px] border placeholder-white"
                placeholder="Description"
                rows={3}
                required
              />
              <select
                value={editData.priority}
                onChange={(e) =>
                  setEditData({ ...editData, priority: e.target.value })
                }
                className="w-full p-3 bg-white/20 text-white rounded-[25px] border"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold transition rounded-[25px] border"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 font-semibold transition rounded-[25px] border"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white">{ticket.title}</h2>
              <p className="text-gray-200">{ticket.description}</p>
              <div className="text-sm text-gray-400">
                Created: {new Date(ticket.createdAt).toLocaleString()}
              </div>
              <div
                className={`text-sm font-semibold ${
                  ticket.status === "Open" ? "text-green-400" : "text-red-400"
                }`}
              >
                Status: {ticket.status}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 font-semibold transition rounded-[25px] border"
              >
                ✏️ Edit Ticket
              </button>
            </>
          )}
        </div>

        <div className="bg-white/10 dark:bg-black/30 p-6 shadow border border-white/20 backdrop-blur-md rounded-[25px] border">
          <h3 className="font-semibold mb-3 text-white">Comments</h3>

          {ticket.comments.length === 0 ? (
            <p className="text-sm text-gray-400">No comments yet.</p>
          ) : (
            <ul className="space-y-3">
              {ticket.comments.map((c, i) => (
                <li key={i} className="border-l-4 border-blue-500 pl-3">
                  <div className="text-sm text-white">{c.text}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(c.date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddComment} className="mt-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 bg-white/20 text-white rounded-[25px] borderfocus:ring-2 focus:ring-blue-500 placeholder-white"
              placeholder="Add a comment..."
              rows={3}
              required
            />
            <button
              type="submit"
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold transition rounded-[25px] border"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
