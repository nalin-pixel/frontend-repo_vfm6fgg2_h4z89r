import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [runId, setRunId] = useState(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/leaderboard?limit=20`);
        const json = await res.json();
        setItems(json.items || []);
        setRunId(json.run_id || null);
      } catch (_) {}
    };
    load();
  }, [baseUrl]);

  if (!items.length) return null;

  return (
    <div className="mt-6 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 text-blue-200 mb-3">
        <Trophy className="w-4 h-4" />
        <span className="font-semibold">Top picks</span>
        {runId && <span className="ml-auto text-xs text-blue-300/70">Run {runId}</span>}
      </div>
      <div className="divide-y divide-slate-700">
        {items.map((it, idx) => (
          <div key={`${it.symbol}-${idx}`} className="py-2 flex items-center">
            <div className="w-8 text-blue-300/80">{idx + 1}</div>
            <div className="flex-1">
              <div className="text-blue-100 font-medium">{it.name || it.symbol}</div>
              <div className="text-xs text-blue-300/70">{it.symbol}</div>
            </div>
            <div className="text-sm text-blue-200/90">{it.recommendation}</div>
            <div className="w-16 text-right text-blue-100 font-semibold">{it.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
