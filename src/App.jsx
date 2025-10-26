import { useState } from 'react'
import Sidebar from './components/Sidebar'
import HeroSpline from './components/HeroSpline'
import DashboardHub from './components/DashboardHub'
import SystemOverview from './components/SystemOverview'

function App() {
  const [section, setSection] = useState('dashboard')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <Sidebar current={section} onChange={setSection} />
        <main className="flex-1 min-h-screen">
          <header className="md:hidden sticky top-0 z-10 bg-slate-950/80 backdrop-blur border-b border-slate-800">
            <div className="p-4">
              <div className="text-teal-300 text-xs uppercase tracking-widest">TravelFlux</div>
              <div className="text-sm text-slate-300">Turning India's Travel Chaos into Data-Driven Coordination.</div>
            </div>
          </header>
          <div className="p-4 md:p-8 max-w-[1200px] mx-auto">
            <HeroSpline />
            <nav className="mt-6 flex gap-3 overflow-x-auto">
              {['dashboard','analytics','apis','reports','settings'].map(k => (
                <button key={k} onClick={() => setSection(k)} className={`px-3 py-1.5 rounded-full text-sm border ${section===k? 'bg-teal-600/20 text-teal-300 border-teal-600/40':'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'}`}>{k.charAt(0).toUpperCase()+k.slice(1)}</button>
              ))}
            </nav>

            {(section === 'dashboard' || section === 'analytics' || section === 'apis') && (
              <DashboardHub />
            )}

            {section === 'reports' && (
              <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200">
                <h2 className="text-lg font-semibold text-white mb-2">Reports</h2>
                <p className="text-sm text-slate-400">Export demand, pricing and load factor reports for selected corridors and time ranges.</p>
              </div>
            )}

            {section === 'settings' && (
              <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200">
                <h2 className="text-lg font-semibold text-white mb-2">Settings</h2>
                <ul className="text-sm text-slate-300 list-disc pl-5 space-y-2">
                  <li>API keys for partners</li>
                  <li>Alert thresholds for surge and congestion</li>
                  <li>Regional preferences and holidays</li>
                </ul>
              </div>
            )}

            <SystemOverview />

            <footer className="py-10 text-center text-slate-500 text-xs">Built for Ideathon — Real-time data via Kafka, ML with XGBoost & LSTM, storage on MongoDB.</footer>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
