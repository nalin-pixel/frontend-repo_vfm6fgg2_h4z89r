import { useState } from "react";
import { TrendingUp, AlertCircle } from "lucide-react";
import Feedback from "./Feedback";

function RecommendationBadge({ rec }) {
  const map = {
    "Strong Buy": "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    Buy: "bg-green-500/15 text-green-300 border-green-400/30",
    Hold: "bg-yellow-500/15 text-yellow-200 border-yellow-400/30",
    Sell: "bg-red-500/15 text-red-300 border-red-400/30",
    "Strong Sell": "bg-rose-600/15 text-rose-300 border-rose-400/30",
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs border ${map[rec] || "bg-slate-700 text-slate-200 border-slate-600"}`}>
      {rec}
    </span>
  );
}

export default function Predictions() {
  const [symbols, setSymbols] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const fetchPredictions = async () => {
    if (!symbols.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const s = symbols
        .split(",")
        .map((t) => t.trim().toUpperCase())
        .filter(Boolean)
        .map((t) => (t.endsWith(".NS") || t.endsWith(".BO") ? t : `${t}.NS`))
        .join(",");
      const res = await fetch(`${baseUrl}/api/predict?symbols=${encodeURIComponent(s)}`);
      if (!res.ok) throw new Error("Failed to fetch predictions");
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          value={symbols}
          onChange={(e) => setSymbols(e.target.value)}
          placeholder="Enter tickers (comma separated): RELIANCE, TCS, INFY"
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900/60 border border-blue-400/20 text-blue-50 placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchPredictions}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium inline-flex items-center gap-2 disabled:opacity-60"
          disabled={loading}
        >
          <TrendingUp className="w-4 h-4" />
          {loading ? "Scoring..." : "Predict"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-300 text-sm mb-3">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((d) => (
            <div key={`${d.symbol}-${d.run_id}`} className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <div className="text-blue-100 font-semibold">{d.name || d.symbol}</div>
                <RecommendationBadge rec={d.recommendation} />
              </div>
              <div className="text-sm text-blue-300/80 mb-2">{d.symbol} • {d.exchange}</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{d.score}</div>
                <div className="text-xs text-blue-200/60">{new Date(d.created_at).toLocaleString()}</div>
              </div>
              {d.reasons?.length > 0 && (
                <ul className="mt-3 text-sm text-blue-200/80 list-disc list-inside space-y-1">
                  {d.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}
              <Feedback symbol={d.symbol} runId={d.run_id} />
            </div>
          ))}
        </div>
      )}

      {data.length === 0 && !loading && (
        <div className="text-blue-200/70 text-sm">Enter tickers and hit Predict to see AI-powered scores.</div>
      )}
    </div>
  );
}
