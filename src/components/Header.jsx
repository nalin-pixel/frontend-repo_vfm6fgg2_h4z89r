import { LineChart } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-3">
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/20">
          <LineChart className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Stock AI (India)
        </h1>
      </div>
      <p className="text-blue-200/80 max-w-2xl mx-auto">
        Discover data-driven stock ideas for NSE/BSE using momentum, valuation, and trend signals. Enter tickers like RELIANCE.NS, TCS.NS, INFY.NS.
      </p>
    </div>
  );
}
