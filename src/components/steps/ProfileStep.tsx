import { useAgentContext } from '../../context/AgentContext'

export const ProfileStep = () => {
  const { data, selectedProfile, setSelectedProfile } = useAgentContext()
  
  if (!data) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {data.agentProfiles.map(p => {
        const isSelected = selectedProfile === p.id
        return (
          <button key={p.id} onClick={() => setSelectedProfile(isSelected ? '' : p.id)}
            className={`group relative text-left rounded-xl border p-4 transition-all duration-200
              ${isSelected ? 'border-primary-500/50 bg-primary-500/10 shadow-lg shadow-primary-500/5' : 'border-surface-700/50 bg-surface-800/30 hover:border-surface-600 hover:bg-surface-800/50'}
            `}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                ${isSelected ? 'border-primary-500 bg-primary-500' : 'border-surface-600 group-hover:border-surface-500'}`}>
                {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${isSelected ? 'text-primary-300' : 'text-surface-200'}`}>{p.name}</p>
                <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">{p.description}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
