import { useState } from "react";
import { addTicket } from "../utils/api";
import { useNavigate } from 'react-router-dom';

export default function NewTicket() {
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", priority: "Low" });
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and Description are required.");
      return;
    }
    addTicket(form).then(t => {
      nav(`/ticket/${t.id}`);
    });
  }

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-16">

      <form 
        onSubmit={submit} 
         className="space-y-4 bg-white/10 dark:bg-black/30 p-6 rounded-[25px] border border-white/20 max-w-xl w-full text-white">
        {error && <div className="text-red-400">{error}</div>}

        <input
          placeholder="Title"
          className="w-full p-3 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[25px] border"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

      <textarea
  placeholder="Description"
  className="w-full p-3 rounded bg-white/25 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[25px] border"
  rows="4"
  value={form.description}
  onChange={e => setForm({ ...form, description: e.target.value })}
/>

        <select
          value={form.priority}
          onChange={e => setForm({ ...form, priority: e.target.value })}
          className="w-full p-3 rounded bg-white text-black dark:bg-white/20 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[25px] border"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button 
          type="submit" 
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded transition w-full rounded-[25px] border"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
}
