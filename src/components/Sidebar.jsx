import { Home, BarChart3, Api, FileText, Settings } from 'lucide-react'

export default function Sidebar({ current, onChange }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'apis', label: 'APIs', icon: Api },
    { key: 'reports', label: 'Reports', icon: FileText },
    { key: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="h-screen w-64 bg-slate-950 text-white border-r border-slate-800 sticky top-0 hidden md:flex flex-col">
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="text-teal-300 text-xs uppercase tracking-widest">TravelFlux</div>
        <div className="text-lg font-semibold">Turning India's Travel Chaos into Data-Driven Coordination.</div>
      </div>
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              current === key ? 'bg-slate-800 text-teal-300' : 'hover:bg-slate-900 text-slate-300'
            }`}
          >
            <Icon size={18} />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 text-xs text-slate-400 border-t border-slate-800">
        © {new Date().getFullYear()} TravelFlux
      </div>
    </aside>
  )
}
