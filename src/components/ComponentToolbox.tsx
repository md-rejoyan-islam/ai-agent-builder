import { useState } from 'react'
import { useAgentContext } from '../context/AgentContext'
import DraggableCard from './dnd/DraggableCard'

const providers = [
  { id: 'Gemini', name: 'Gemini', description: 'Google\'s multimodal AI model' },
  { id: 'ChatGPT', name: 'ChatGPT', description: 'OpenAI\'s conversational AI' },
  { id: 'Claude', name: 'Claude', description: 'Anthropic\'s helpful AI assistant' },
  { id: 'DeepSeek', name: 'DeepSeek', description: 'Advanced reasoning AI model' },
  { id: 'Kimi', name: 'Kimi', description: 'Moonshot\'s long-context AI' },
]

const ComponentToolbox = () => {
  const {
    data, loading, error,
    selectedProfile, selectedSkills, selectedLayers, selectedProvider,
  } = useAgentContext()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'profiles' | 'skills' | 'layers' | 'providers'>('profiles')

  const tabs = [
    { key: 'profiles' as const, label: 'Profiles', count: data?.agentProfiles.length ?? 0, color: 'primary' },
    { key: 'skills' as const, label: 'Skills', count: data?.skills.length ?? 0, color: 'accent' },
    { key: 'layers' as const, label: 'Layers', count: data?.layers.length ?? 0, color: 'violet' },
    { key: 'providers' as const, label: 'Providers', count: providers.length, color: 'amber' },
  ]

  const filterBySearch = (name: string, desc?: string) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return name.toLowerCase().includes(q) || (desc?.toLowerCase().includes(q) ?? false)
  }

  return (
    <section className="rounded-2xl border border-surface-800/80 bg-surface-900/70 backdrop-blur-sm shadow-xl shadow-black/10 flex flex-col h-full">
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75l-5.571-3m11.142 0 4.179 2.25L12 17.25l-9.75-5.25 4.179-2.25m11.142 0 4.179 2.25L12 22.5l-9.75-5.25 4.179-2.25" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-surface-50">Components</h2>
            <p className="text-xs text-surface-500">Drag items into the builder →</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg border border-surface-700/50 bg-surface-800/50 px-3 py-2 mb-4">
          <svg className="w-4 h-4 text-surface-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="flex-1 bg-transparent text-sm text-surface-200 placeholder-surface-600 outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-surface-800/60">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-all duration-150 border-b-2 -mb-px
                ${activeTab === tab.key
                  ? `border-${tab.color}-400 text-surface-100`
                  : 'border-transparent text-surface-500 hover:text-surface-300'
                }
              `}
            >
              {tab.label}
              <span className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 
                ${activeTab === tab.key
                  ? `bg-${tab.color}-500/20 text-${tab.color}-400`
                  : 'bg-surface-800 text-surface-600'
                }
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 pt-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="animate-spin h-6 w-6 mb-2 text-primary-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-surface-400">Loading components…</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        {data && (
          <div className="grid gap-2.5">
            {/* Profiles Tab */}
            {activeTab === 'profiles' && data.agentProfiles
              .filter(p => filterBySearch(p.name, p.description))
              .map(profile => (
                <DraggableCard
                  key={profile.id}
                  id={profile.id}
                  type="profile"
                  name={profile.name}
                  description={profile.description}
                  isSelected={selectedProfile === profile.id}
                />
              ))
            }

            {/* Skills Tab */}
            {activeTab === 'skills' && data.skills
              .filter(s => filterBySearch(s.name, s.description))
              .map(skill => (
                <DraggableCard
                  key={skill.id}
                  id={skill.id}
                  type="skill"
                  name={skill.name}
                  subtitle={skill.category}
                  description={skill.description}
                  isSelected={selectedSkills.includes(skill.id)}
                />
              ))
            }

            {/* Layers Tab */}
            {activeTab === 'layers' && data.layers
              .filter(l => filterBySearch(l.name, l.description))
              .map(layer => (
                <DraggableCard
                  key={layer.id}
                  id={layer.id}
                  type="layer"
                  name={layer.name}
                  subtitle={layer.type}
                  description={layer.description}
                  isSelected={selectedLayers.includes(layer.id)}
                />
              ))
            }

            {/* Providers Tab */}
            {activeTab === 'providers' && providers
              .filter(p => filterBySearch(p.name, p.description))
              .map(provider => (
                <DraggableCard
                  key={provider.id}
                  id={provider.id}
                  type="provider"
                  name={provider.name}
                  description={provider.description}
                  isSelected={selectedProvider === provider.id}
                />
              ))
            }
          </div>
        )}
      </div>
    </section>
  )
}

export default ComponentToolbox
