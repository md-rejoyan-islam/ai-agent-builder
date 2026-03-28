import { useAgentContext } from '../context/AgentContext'
import { useNavigate } from 'react-router-dom'

const SavedAgentsList = () => {
  const { savedAgents, data, clearAllAgents, loadAgent, deleteAgent } = useAgentContext()
  const navigate = useNavigate()

  return (
    <section className="rounded-2xl border border-surface-800/80 bg-surface-900/70 backdrop-blur-sm p-6 shadow-xl shadow-black/10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-surface-50">
            Saved Agents
            <span className="ml-2 text-xs font-medium text-surface-500">({savedAgents.length})</span>
          </h2>
        </div>
        {savedAgents.length > 0 && (
          <button
            onClick={clearAllAgents}
            className="inline-flex items-center gap-1.5 rounded-lg border border-danger-500/20 bg-danger-500/10 px-3 py-1.5 text-xs font-medium text-danger-400 transition-all duration-200 hover:bg-danger-500/20 hover:border-danger-500/30"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {savedAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-2xl bg-surface-800/60 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-surface-400">No saved agents yet</p>
          <p className="text-xs text-surface-600 mt-1">Configure and save your first agent using the builder above</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-surface-800/60">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-surface-800/60 bg-surface-800/30">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">#</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">Name</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">Profile</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">Skills</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">Layers</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">Provider</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedAgents.map((agent, index) => {
                const profileName = data?.agentProfiles.find(p => p.id === agent.profileId)?.name || '—'
                return (
                  <tr
                    key={index}
                    className="border-b border-surface-800/40 last:border-none transition-colors hover:bg-surface-800/30"
                  >
                    <td className="px-4 py-3 text-surface-600 font-medium">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary-300">{agent.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="font-semibold text-surface-100 truncate max-w-[160px]">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-surface-300">{profileName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {agent.skillIds?.length > 0 ? agent.skillIds.map(id => (
                          <span key={id} className="inline-flex items-center rounded bg-accent-500/10 px-1.5 py-0.5 text-[10px] font-medium text-accent-400 whitespace-nowrap">
                            {data?.skills.find(s => s.id === id)?.name || id}
                          </span>
                        )) : <span className="text-xs text-surface-600">—</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {agent.layerIds?.length > 0 ? agent.layerIds.map(id => (
                          <span key={id} className="inline-flex items-center rounded bg-violet-400/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-400 whitespace-nowrap">
                            {data?.layers.find(l => l.id === id)?.name || id}
                          </span>
                        )) : <span className="text-xs text-surface-600">—</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {agent.provider ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          {agent.provider}
                        </span>
                      ) : (
                        <span className="text-surface-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            loadAgent(agent)
                            navigate(`/edit/${encodeURIComponent(agent.name)}`)
                          }}
                          className="rounded-lg bg-primary-600/20 border border-primary-500/20 px-3 py-1.5 text-xs font-semibold text-primary-300 transition-all duration-200 hover:bg-primary-600/30"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAgent(index)}
                          className="rounded-lg bg-danger-500/10 border border-danger-500/15 p-1.5 text-danger-400 transition-all duration-200 hover:bg-danger-500/20"
                          aria-label={`Delete ${agent.name}`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default SavedAgentsList
