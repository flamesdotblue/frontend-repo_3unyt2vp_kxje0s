import { useEffect, useMemo, useState } from 'react'

function StatCard({ title, value, sub, tone = 'primary' }) {
  const tones = {
    primary: 'bg-slate-900 border-slate-800',
    success: 'bg-emerald-900/20 border-emerald-800/40',
    warn: 'bg-yellow-900/20 border-yellow-800/40',
  }
  return (
    <div className={`p-4 rounded-lg border ${tones[tone]} text-slate-200`}> 
      <div className="text-xs uppercase tracking-wider text-slate-400">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
    </div>
  )
}

function TrendLine({ points = [] }) {
  const w = 280, h = 80, pad = 8
  const xs = points.map((_, i) => (i / (points.length - 1)) * (w - pad * 2) + pad)
  const min = Math.min(...points)
  const max = Math.max(...points)
  const ys = points.map(p => h - pad - ((p - min) / (max - min || 1)) * (h - pad * 2))
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs[i]} ${ys[i]}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
      <path d={d} fill="none" stroke="#14b8a6" strokeWidth="2" />
    </svg>
  )
}

function BarChart({ data }) {
  const w = 520, h = 160, pad = 24
  const max = Math.max(...data.map(d => d.value))
  const barW = (w - pad * 2) / data.length - 10
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      {data.map((d, i) => {
        const x = pad + i * ((w - pad * 2) / data.length)
        const bh = ((d.value / (max || 1)) * (h - pad * 2))
        const y = h - pad - bh
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={bh} rx="4" fill="#14b8a6" opacity="0.8" />
            <text x={x + barW / 2} y={h - 6} textAnchor="middle" fontSize="10" fill="#94a3b8">{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function DashboardHub() {
  const [persona, setPersona] = useState('operator')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3500)
    return () => clearInterval(id)
  }, [])

  // Simulate small live deltas
  const jitter = (base, spread) => {
    const sign = Math.random() > 0.5 ? 1 : -1
    return Math.max(0, base + sign * Math.random() * spread)
  }

  const operator = useMemo(() => ({
    liveOccupancy: `${Math.round(jitter(86, 3))}%`,
    activeRoutes: 14,
    predictedDemand: `+${Math.round(jitter(22, 4))}%`,
    avgPrice: `₹${Math.round(jitter(750, 40))}`,
    line: Array.from({ length: 16 }, (_, i) => 60 + Math.sin((i + tick / 2) * 0.6) * 20 + i)
  }), [tick])

  const ota = useMemo(() => ({
    uptime: '99.98%',
    calls: Math.round(jitter(42350, 1200)).toLocaleString(),
    latency: `${Math.round(jitter(130, 10))} ms`,
    partners: 18
  }), [tick])

  const government = useMemo(() => ({
    totalRoutes: 275,
    loadFactor: `${Math.round(jitter(78, 3))}%`,
    peakDay: 'Sunday',
    congested: [
      { label: 'BLR–MYS', value: 92 },
      { label: 'BLR–MAA', value: 84 },
      { label: 'BLR–CBE', value: 76 },
      { label: 'BLR–SA', value: 63 },
      { label: 'MNG–UD', value: 58 },
    ],
  }), [tick])

  const operatorRows = [
    { route: 'Bangalore–Mysuru', occ: '92%', surge: '+15%', buses: '+2 buses', status: 'Active' },
    { route: 'Bangalore–Chennai', occ: '78%', surge: '+8%', buses: '+1 bus', status: 'Normal' },
    { route: 'Bangalore–Salem', occ: '61%', surge: '+3%', buses: '0', status: 'Normal' },
    { route: 'Bangalore–Coimbatore', occ: '71%', surge: '+6%', buses: '+1 bus', status: 'Active' },
    { route: 'Hubli–Dharwad', occ: '69%', surge: '+4%', buses: '0', status: 'Normal' },
  ]

  const apiRows = [
    { ep: '/demand/predict', req: 'Bangalore–Mysuru', st: '✅ 200 OK', lat: `${120 + (tick % 7)}ms`, time: '11:05 AM' },
    { ep: '/pricing/suggest', req: 'Bangalore–Coimbatore', st: '✅ 200 OK', lat: `${142 + (tick % 6)}ms`, time: '11:02 AM' },
    { ep: '/crowd/forecast', req: 'Bangalore–Chennai', st: '⚠️ 429', lat: `${180 - (tick % 5)}ms`, time: '10:55 AM' },
  ]

  const personaTabs = [
    { id: 'operator', label: 'Operator: Sri Ram Travels (Bangalore Hub)' },
    { id: 'ota', label: 'OTA Integration' },
    { id: 'government', label: 'Government / Tourism Board' },
  ]

  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-2">
        {personaTabs.map(t => (
          <button
            key={t.id}
            onClick={() => setPersona(t.id)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              persona === t.id ? 'bg-teal-600/20 text-teal-300 border-teal-600/40' : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {persona === 'operator' && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="Live Occupancy" value={operator.liveOccupancy} sub="Across active fleet" />
              <StatCard title="Active Routes" value={operator.activeRoutes} />
              <StatCard title="Predicted Demand 24h" value={operator.predictedDemand} tone="success" />
              <StatCard title="Avg Ticket Price" value={operator.avgPrice} />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Demand Forecast (next 24h)</h3>
                <span className="text-xs text-slate-400">XGBoost ensemble</span>
              </div>
              <TrendLine points={operator.line} />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto">
              <h3 className="text-white font-semibold mb-3">Route Performance</h3>
              <table className="min-w-full text-sm">
                <thead className="text-slate-400">
                  <tr className="text-left">
                    <th className="py-2 pr-4">Route</th>
                    <th className="py-2 pr-4">Occupancy</th>
                    <th className="py-2 pr-4">Predicted Surge</th>
                    <th className="py-2 pr-4">Suggested Buses</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {operatorRows.map(r => (
                    <tr key={r.route} className="text-slate-200">
                      <td className="py-2 pr-4">{r.route}</td>
                      <td className="py-2 pr-4">{r.occ}</td>
                      <td className="py-2 pr-4">{r.surge}</td>
                      <td className="py-2 pr-4">{r.buses}</td>
                      <td className="py-2 pr-4"><span className={`px-2 py-0.5 rounded text-xs ${r.status === 'Active' ? 'bg-teal-600/20 text-teal-300' : 'bg-slate-700/40 text-slate-300'}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Recommendations</h3>
              <ul className="text-sm text-slate-300 list-disc pl-5 space-y-2">
                <li>Deploy +2 AC seater buses on Bangalore–Mysuru 5–9 PM today.</li>
                <li>Dynamic pricing: +10% on Bangalore–Coimbatore from 6 PM.</li>
                <li>Partner with Mangalore–Udupi depot for weekend overflow.</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Sri Ram Travels — Health</h3>
              <div className="text-sm text-slate-400">Fleet Utilization</div>
              <TrendLine points={operator.line.slice(0, 12)} />
              <div className="text-xs text-slate-400">Real-time GPS + Ticketing stream (Kafka)</div>
            </div>
          </div>
        </div>
      )}

      {persona === 'ota' && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="API Uptime" value={ota.uptime} />
              <StatCard title="API Calls Today" value={ota.calls} />
              <StatCard title="Avg Response Time" value={ota.latency} />
              <StatCard title="Active Partners" value={ota.partners} />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto">
              <h3 className="text-white font-semibold mb-3">Recent API Calls</h3>
              <table className="min-w-full text-sm">
                <thead className="text-slate-400">
                  <tr className="text-left">
                    <th className="py-2 pr-4">Endpoint</th>
                    <th className="py-2 pr-4">Request</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Latency</th>
                    <th className="py-2 pr-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {apiRows.map((r, i) => (
                    <tr key={i} className="text-slate-200">
                      <td className="py-2 pr-4">{r.ep}</td>
                      <td className="py-2 pr-4">{r.req}</td>
                      <td className="py-2 pr-4">{r.st}</td>
                      <td className="py-2 pr-4">{r.lat}</td>
                      <td className="py-2 pr-4">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">API Response Example</h3>
              <pre className="text-xs md:text-sm bg-black/40 rounded p-3 text-teal-300 overflow-x-auto">{`
{
  "route": "Bangalore–Mysuru",
  "predicted_demand": 1.22,
  "price_suggestion": "+10%",
  "crowd_score": "High"
}`}</pre>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Integration Tips</h3>
              <ul className="text-sm text-slate-300 list-disc pl-5 space-y-2">
                <li>Use caching headers for demand endpoint at 60s TTL.</li>
                <li>Backoff and retry on 429 rate limits.</li>
                <li>Webhook for surge alerts on top 10 corridors.</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Latency Trend</h3>
              <TrendLine points={[110,120,128,122,135,130,126,132,129,127,125,121].map(v => v + (tick % 5))} />
              <div className="text-xs text-slate-400">Avg over last hour by region</div>
            </div>
          </div>
        </div>
      )}

      {persona === 'government' && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="Total Active Routes" value={government.totalRoutes} />
              <StatCard title="Avg Load Factor" value={government.loadFactor} />
              <StatCard title="Predicted Peak Travel Day" value={government.peakDay} />
              <StatCard title="Corridors Tracked" value={85} />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Top 5 Congested Corridors</h3>
                <span className="text-xs text-slate-400">Load Index</span>
              </div>
              <BarChart data={government.congested} />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Actionable Recommendations</h3>
              <ul className="text-sm text-slate-300 list-disc pl-5 space-y-2">
                <li>Introduce express permits on BLR–MYS 7–9 AM on weekdays.</li>
                <li>Coordinate festival traffic for Dasara in Mysuru with +20% capacity.</li>
                <li>Enable dynamic tolling pilot on BLR–MAA corridor.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Heatmap Insight</h3>
              <p className="text-sm text-slate-400">High crowd score across Southern Karnataka districts during weekends.</p>
              <TrendLine points={[60,65,62,70,72,68,74,71,77,75,73,80]} />
              <div className="text-xs text-slate-400">Crowd score trend (LSTM)</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
