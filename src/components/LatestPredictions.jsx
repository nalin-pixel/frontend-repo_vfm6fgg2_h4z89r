import { useEffect, useState } from "react";
import { History } from "lucide-react";

export default function LatestPredictions() {
  const [items, setItems] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/predictions/latest?limit=10`);
        const json = await res.json();
        setItems(json.items || []);
      } catch (_) {}
    };
    load();
  }, [baseUrl]);

  if (!items.length) return null;

  return (
    <div className="mt-6 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 text-blue-200 mb-3">
        <History className="w-4 h-4" />
        <span className="font-semibold">Recent predictions</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((it) => (
          <div key={it.id} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="text-blue-100 font-medium">{it.name || it.symbol}</div>
              <div className="text-xs text-blue-200/70">{it.recommendation}</div>
            </div>
            <div className="text-sm text-blue-300/80">{it.symbol} • Score {it.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
