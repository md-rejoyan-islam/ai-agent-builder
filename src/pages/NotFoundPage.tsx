import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
      <div className="h-20 w-20 rounded-2xl bg-surface-800/40 flex items-center justify-center mb-6 border border-surface-700/30">
        <svg className="w-10 h-10 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h1 className="text-7xl font-black bg-gradient-to-br from-primary-400 to-accent-500 bg-clip-text text-transparent mb-4 tracking-tight drop-shadow-sm">
        404
      </h1>
      <h2 className="text-2xl font-bold text-surface-50 mb-3">Page Not Found</h2>
      <p className="text-sm text-surface-400 mb-8 max-w-sm leading-relaxed">
        Oops! We couldn't find the page you're looking for. It might have been removed or the link is incorrect.
      </p>
      
      <Link
        to="/"
        className="group inline-flex items-center gap-2 rounded-xl bg-surface-800/50 border border-surface-700/50 px-6 py-3 text-sm font-semibold text-surface-200 transition-all duration-200 hover:bg-surface-800 hover:text-white hover:border-surface-600 shadow-lg shadow-black/5"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Return to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
