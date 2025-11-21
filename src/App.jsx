import Header from "./components/Header";
import Predictions from "./components/Predictions";
import LatestPredictions from "./components/LatestPredictions";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <Header />
        <Predictions />
        <LatestPredictions />
        <div className="mt-10 text-center text-blue-300/60 text-sm">
          Data via Yahoo Finance. This is not financial advice.
        </div>
      </div>
    </div>
  );
}

export default App;
