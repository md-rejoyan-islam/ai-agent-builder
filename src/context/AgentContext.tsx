import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { toast } from 'sonner'
import type { AgentContextValue } from '../types'
import { useAgentData } from '../hooks/useAgentData'
import { useAgentForm } from '../hooks/useAgentForm'
import { useSavedAgents } from '../hooks/useSavedAgents'
import { useSessionTime } from '../hooks/useSessionTime'
import { useAnalytics } from '../hooks/useAnalytics'

const AgentContext = createContext<AgentContextValue | null>(null)

export const useAgentContext = (): AgentContextValue => {
  const ctx = useContext(AgentContext)
  if (!ctx) throw new Error('useAgentContext must be used inside <AgentProvider>')
  return ctx
}

export const AgentProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, error, fetchAPI } = useAgentData()

  const {
    selectedProfile, setSelectedProfile,
    selectedSkills, addSkill, removeSkill,
    selectedLayers, addLayer, removeLayer,
    agentName, setAgentName,
    selectedProvider, setSelectedProvider,
    editingAgentName, loadAgentToForm, resetForm,
  } = useAgentForm()

  const { savedAgents, saveAgent, updateAgent, deleteAgent, clearAllAgents } = useSavedAgents()
  const sessionTime = useSessionTime()
  useAnalytics(agentName)

  useEffect(() => {
    fetchAPI()
  }, [fetchAPI])

  const saveCurrentAgent = (): boolean => {
    if (!agentName.trim()) {
      toast.error('Please enter a name for your agent.')
      return false
    }

    if (!selectedProfile) {
      toast.error('Please select a profile for your agent.')
      return false
    }

    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill.')
      return false
    }

    if (selectedLayers.length === 0) {
      toast.error('Please select at least one layer.')
      return false
    }

    if (!selectedProvider) {
      toast.error('Please select a provider.')
      return false
    }

    const nameExists = savedAgents.some(
      existing => 
        existing.name.trim().toLowerCase() === agentName.trim().toLowerCase() &&
        existing.name.trim().toLowerCase() !== editingAgentName?.trim().toLowerCase()
    )

    if (nameExists) {
      toast.error(`An agent named "${agentName}" already exists. Please use a different name.`)
      return false
    }

    const agentData = {
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    }

    if (editingAgentName) {
      updateAgent(editingAgentName, agentData)
      toast.success(`Agent "${agentName}" updated successfully!`)
    } else {
      saveAgent(agentData)
      toast.success(`Agent "${agentName}" saved successfully!`)
    }
    
    resetForm()
    return true
  }

  const loadAgent = loadAgentToForm
  const cancelEdit = resetForm

  const value: AgentContextValue = {
    data, loading, error, fetchAPI,
    selectedProfile, setSelectedProfile,
    selectedSkills, addSkill, removeSkill,
    selectedLayers, addLayer, removeLayer,
    selectedProvider, setSelectedProvider,
    agentName, setAgentName, editingAgentName, saveCurrentAgent, cancelEdit,
    savedAgents, loadAgent, deleteAgent, clearAllAgents,
    sessionTime,
  }

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
}
