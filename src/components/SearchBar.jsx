import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Indian stocks (e.g., RELIANCE, TCS, INFY)"
        className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800/60 border border-blue-400/20 text-blue-50 placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        disabled={loading}
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
