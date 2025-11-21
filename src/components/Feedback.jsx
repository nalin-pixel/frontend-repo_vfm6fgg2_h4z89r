import { useState } from "react";
import { Send } from "lucide-react";

export default function Feedback({ symbol, runId }) {
  const [helpful, setHelpful] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const submit = async () => {
    if (!symbol || !runId || helpful === null) return;
    try {
      const res = await fetch(`${baseUrl}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, run_id: runId, helpful, comment }),
      });
      const json = await res.json();
      setStatus(json.status === "ok" ? "Thanks for the feedback!" : "Failed to submit");
    } catch (_) {
      setStatus("Failed to submit");
    }
  };

  return (
    <div className="mt-3 text-sm text-blue-200/80">
      <div className="mb-2">Was this useful?</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setHelpful(true)}
          className={`px-3 py-1 rounded-lg border ${helpful === true ? "bg-emerald-600/20 border-emerald-500/40" : "bg-slate-900/50 border-slate-700"}`}
        >
          Yes
        </button>
        <button
          onClick={() => setHelpful(false)}
          className={`px-3 py-1 rounded-lg border ${helpful === false ? "bg-rose-600/20 border-rose-500/40" : "bg-slate-900/50 border-slate-700"}`}
        >
          No
        </button>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Optional comment"
          className="flex-1 px-3 py-1 rounded-lg bg-slate-900/50 border border-slate-700 text-blue-100"
        />
        <button onClick={submit} className="px-3 py-1 rounded-lg bg-blue-600 text-white inline-flex items-center gap-1">
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
      {status && <div className="mt-2 text-xs text-blue-300/80">{status}</div>}
    </div>
  );
}
