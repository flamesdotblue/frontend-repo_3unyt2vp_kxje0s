import Spline from '@splinetool/react-spline'

export default function HeroSpline() {
  return (
    <section className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden bg-black rounded-xl">
      <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 flex items-end p-6 md:p-10">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold text-white">TravelFlux — Turning India's Travel Chaos into Data-Driven Coordination.</h1>
          <p className="mt-2 text-slate-300 max-w-3xl text-sm md:text-base">
            Mobility intelligence for Tier-2/3 intercity operators, OTAs and government agencies. Real-time aggregation via Kafka, AI models (XGBoost, LSTM), and actionable dashboards.
          </p>
        </div>
      </div>
    </section>
  )
}
