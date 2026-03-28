import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col px-4 py-6 sm:px-6 lg:px-10 relative overflow-x-hidden">
      {/* Subtle grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Gradient glow blobs */}
      <div className="pointer-events-none fixed top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-accent-500/8 blur-[100px]" />
      <div className="max-w-[1280px] w-full mx-auto">
        <Header />
      </div>

      <main className="flex flex-col flex-1 mt-6 max-w-[1280px] w-full mx-auto">
        <Outlet />
      </main>

      <footer className="mt-12 pt-6 border-t border-surface-800 text-center flex flex-col items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-surface-800/60 flex items-center justify-center mb-1">
          <svg className="w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-surface-300">AI Agent Builder</p>
        <p className="text-xs text-surface-500">&copy; {new Date().getFullYear()} — Build smarter agents, faster.</p>
      </footer>
    </div>
  )
}

export default MainLayout
