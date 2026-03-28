import { useNavigate } from 'react-router-dom'
import { useAgentContext } from '../context/AgentContext'
import SavedAgentsList from '../components/SavedAgentsList'

const HomePage = () => {
  const navigate = useNavigate()
  const { cancelEdit } = useAgentContext()

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-50">Saved Agents</h1>
          <p className="text-sm text-surface-400 mt-1">Manage, edit, or remove your configured AI agents.</p>
        </div>
        <button
          onClick={() => {
            cancelEdit() // Reset context state
            navigate('/create')
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-600/20 transition-all duration-200 hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Agent
        </button>
      </div>

      <SavedAgentsList />
    </div>
  )
}

export default HomePage
