export default function SystemOverview() {
  return (
    <section className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200">
      <h2 className="text-lg font-semibold text-white mb-4">System Overview</h2>
      <p className="text-sm text-slate-400 mb-4">High-level data pipeline powering TravelFlux.</p>
      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 1200 260" className="min-w-[700px] w-full h-56">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect x="20" y="40" width="250" height="160" rx="12" fill="#0f172a" stroke="#1f2937" />
          <text x="145" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="14">Data Sources</text>
          <text x="145" y="95" textAnchor="middle" fill="#94a3b8" fontSize="12">Ticketing, GPS, OTA clicks</text>
          <text x="145" y="115" textAnchor="middle" fill="#94a3b8" fontSize="12">Weather, Events, Traffic</text>

          <rect x="320" y="40" width="200" height="160" rx="12" fill="#0f172a" stroke="#1f2937" />
          <text x="420" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="14">Kafka Pipelines</text>
          <text x="420" y="95" textAnchor="middle" fill="#94a3b8" fontSize="12">Ingestion • Stream Processing</text>

          <rect x="560" y="40" width="260" height="160" rx="12" fill="#0f172a" stroke="#1f2937" />
          <text x="690" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="14">AI Models</text>
          <text x="690" y="95" textAnchor="middle" fill="#94a3b8" fontSize="12">XGBoost • LSTM</text>
          <text x="690" y="115" textAnchor="middle" fill="#94a3b8" fontSize="12">Demand, Pricing, Crowd</text>

          <rect x="860" y="40" width="320" height="160" rx="12" fill="#0f172a" stroke="#1f2937" />
          <text x="1020" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="14">Dashboards & APIs</text>
          <text x="1020" y="95" textAnchor="middle" fill="#94a3b8" fontSize="12">Operator • OTA • Government</text>

          <path d="M270 120 H320" stroke="url(#g1)" strokeWidth="3" />
          <path d="M520 120 H560" stroke="url(#g1)" strokeWidth="3" />
          <path d="M820 120 H860" stroke="url(#g1)" strokeWidth="3" />

          <circle cx="295" cy="120" r="4" fill="#14b8a6" />
          <circle cx="540" cy="120" r="4" fill="#14b8a6" />
          <circle cx="840" cy="120" r="4" fill="#14b8a6" />
        </svg>
      </div>
    </section>
  )
}
