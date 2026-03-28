import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAgentContext } from '../context/AgentContext'
import AgentBuilder from '../components/AgentBuilder'

const AgentFormPage = ({ isEditing }: { isEditing?: boolean }) => {
  const { name } = useParams()
  const navigate = useNavigate()
  const { savedAgents, loadAgent, cancelEdit, editingAgentName } = useAgentContext()

  useEffect(() => {
    if (isEditing && name) {
      const decodedName = decodeURIComponent(name)
      const agentToEdit = savedAgents.find(a => a.name === decodedName)
      
      if (agentToEdit) {
        if (editingAgentName !== decodedName) {
          loadAgent(agentToEdit)
        }
      } else {
        // Not found, go back home
        navigate('/')
      }
    } else {
      cancelEdit()
    }
  }, [isEditing, name, savedAgents, loadAgent, cancelEdit, editingAgentName, navigate])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-surface-300 transition-colors mb-2 tracking-wide uppercase"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-2xl font-bold text-surface-50">
            {isEditing ? 'Edit Agent' : 'Create New Agent'}
          </h1>
          <p className="text-sm text-surface-400 mt-1">
            {isEditing 
              ? 'Modify the capabilities and configuration of your existing agent.' 
              : 'Construct a new AI assistant by picking skills and layers.'}
          </p>
        </div>
      </div>

      <AgentBuilder />
    </div>
  )
}

export default AgentFormPage
