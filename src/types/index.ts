
export interface AgentProfile {
  id: string
  name: string
  description: string
}

export interface Skill {
  id: string
  name: string
  category: string
  description: string
}

export interface Layer {
  id: string
  name: string
  type: string
  description: string
}

export interface AgentData {
  agentProfiles: AgentProfile[]
  skills: Skill[]
  layers: Layer[]
}

export interface SavedAgent {
  name: string
  profileId: string
  skillIds: string[]
  layerIds: string[]
  provider?: string
}

export interface AgentContextValue {
  data: AgentData | null
  loading: boolean
  error: string | null
  fetchAPI: () => void

  selectedProfile: string
  setSelectedProfile: (id: string) => void
  selectedSkills: string[]
  addSkill: (id: string) => void
  removeSkill: (id: string) => void
  selectedLayers: string[]
  addLayer: (id: string) => void
  removeLayer: (id: string) => void
  selectedProvider: string
  setSelectedProvider: (provider: string) => void

  agentName: string
  setAgentName: (name: string) => void
  editingAgentName: string | null
  saveCurrentAgent: () => boolean
  cancelEdit: () => void

  savedAgents: SavedAgent[]
  loadAgent: (agent: SavedAgent) => void
  deleteAgent: (index: number) => void
  clearAllAgents: () => void

  sessionTime: number
}
