import { useNavigate } from 'react-router-dom'
import { useAgentContext } from '../../context/AgentContext'

export const SaveStep = () => {
  const {
    data,
    selectedProfile,
    selectedSkills,
    selectedLayers,
    selectedProvider,
    agentName,
    setAgentName,
    editingAgentName,
    saveCurrentAgent
  } = useAgentContext()

  const navigate = useNavigate()
  const profile = data?.agentProfiles.find(p => p.id === selectedProfile)

  return (
    <div className="max-w-lg mx-auto space-y-5 mb-6">
      <div className="rounded-xl border border-surface-700/50 bg-surface-800/30 p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-4">Configuration Summary</h4>
        <div className="flex items-center justify-between py-2 border-b border-surface-800/40">
          <span className="text-sm text-surface-500">Profile</span>
          <span className="text-sm font-semibold text-primary-300">{profile?.name || '—'}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-surface-800/40 gap-2">
          <span className="text-sm text-surface-500 whitespace-nowrap">Skills</span>
          <div className="flex flex-wrap flex-1 sm:justify-end gap-1.5">
            {selectedSkills.length > 0 ? selectedSkills.map(id => (
              <span key={id} className="inline-flex items-center rounded bg-accent-500/10 px-1.5 py-0.5 text-[11px] font-medium text-accent-400">
                {data?.skills.find(s => s.id === id)?.name}
              </span>
            )) : <span className="text-sm text-surface-600 italic">None selected</span>}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-surface-800/40 gap-2">
          <span className="text-sm text-surface-500 whitespace-nowrap">Layers</span>
          <div className="flex flex-wrap flex-1 sm:justify-end gap-1.5">
            {selectedLayers.length > 0 ? selectedLayers.map(id => (
              <span key={id} className="inline-flex items-center rounded bg-violet-400/10 px-1.5 py-0.5 text-[11px] font-medium text-violet-400">
                {data?.layers.find(l => l.id === id)?.name}
              </span>
            )) : <span className="text-sm text-surface-600 italic">None selected</span>}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-surface-500">Provider</span>
          <span className="text-sm font-semibold text-amber-400">{selectedProvider || '—'}</span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-surface-200 mb-2">Agent Name</label>
        <input
          type="text"
          placeholder="Give your agent a name…"
          value={agentName}
          onChange={e => setAgentName(e.target.value)}
          className="w-full rounded-xl border border-surface-700/50 bg-surface-800/60 px-4 py-3 text-sm text-surface-100 placeholder-surface-600 outline-none transition-all duration-200 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20"
        />
      </div>
      <button
        onClick={() => {
          const success = saveCurrentAgent()
          if (success) {
            setTimeout(() => navigate('/'), 100)
          }
        }}
        className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-600/20 transition-all duration-200 hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0"
      >
        {editingAgentName ? 'Update Agent' : 'Save Agent'}
      </button>
    </div>
  )
}
