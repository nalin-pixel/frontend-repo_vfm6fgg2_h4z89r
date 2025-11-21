import { useState } from "react";
import { LineChart } from "lucide-react";

export default function Backtest() {
  const [symbols, setSymbols] = useState("RELIANCE.NS,TCS.NS");
  const [days, setDays] = useState(90);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const run = async () => {
    if (!symbols.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/backtest?symbols=${encodeURIComponent(symbols)}&days=${days}`);
      const json = await res.json();
      setResult(json);
    } catch (e) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 text-blue-200 mb-4">
        <LineChart className="w-4 h-4" />
        <span className="font-semibold">Portfolio backtest</span>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={symbols}
          onChange={(e) => setSymbols(e.target.value)}
          placeholder="Comma separated (e.g., RELIANCE.NS,TCS.NS,INFY.NS)"
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900/60 border border-blue-400/20 text-blue-50 placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          min={5}
          max={730}
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value || 90))}
          className="w-32 px-4 py-3 rounded-xl bg-slate-900/60 border border-blue-400/20 text-blue-50 placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={run}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Running..." : "Run"}
        </button>
      </div>
      {result && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-100">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="text-blue-300/70 text-sm">Portfolio return</div>
            <div className="text-2xl font-bold">{result.portfolio_return}%</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="text-blue-300/70 text-sm">Benchmark ({result.benchmark})</div>
            <div className="text-2xl font-bold">{result.benchmark_return}%</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="text-blue-300/70 text-sm">Symbols tested</div>
            <div className="text-2xl font-bold">{result.count}</div>
          </div>
        </div>
      )}
    </div>
  );
}
