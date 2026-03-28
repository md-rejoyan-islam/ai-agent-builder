import { useAgentContext } from '../../context/AgentContext'

export const ProviderStep = () => {
  const { selectedProvider, setSelectedProvider } = useAgentContext()
  
  const providers = [
    { id: 'Gemini', name: 'Gemini', description: 'Google\'s multimodal AI model' },
    { id: 'ChatGPT', name: 'ChatGPT', description: 'OpenAI\'s conversational AI' },
    { id: 'Claude', name: 'Claude', description: 'Anthropic\'s helpful AI assistant' },
    { id: 'DeepSeek', name: 'DeepSeek', description: 'Advanced reasoning AI model' },
    { id: 'Kimi', name: 'Kimi', description: 'Moonshot\'s long-context AI' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {providers.map(p => {
        const isSelected = selectedProvider === p.id
        return (
          <button key={p.id} onClick={() => setSelectedProvider(isSelected ? '' : p.id)}
            className={`group relative text-left rounded-xl border p-4 transition-all duration-200
              ${isSelected ? 'border-amber-400/50 bg-amber-400/10 shadow-lg shadow-amber-400/5' : 'border-surface-700/50 bg-surface-800/30 hover:border-surface-600 hover:bg-surface-800/50'}
            `}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                ${isSelected ? 'border-amber-400 bg-amber-400' : 'border-surface-600 group-hover:border-surface-500'}`}>
                {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${isSelected ? 'text-amber-400' : 'text-surface-200'}`}>{p.name}</p>
                <p className="text-xs text-surface-500 mt-0.5">{p.description}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
