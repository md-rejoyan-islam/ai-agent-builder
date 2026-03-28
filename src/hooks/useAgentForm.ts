import { useState } from 'react'
import type { SavedAgent } from '../types'

export const useAgentForm = () => {
  const [selectedProfile, setSelectedProfile] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [agentName, setAgentName] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [editingAgentName, setEditingAgentName] = useState<string | null>(null)

  const addLayer = (layerId: string) => {
    if (!selectedLayers.includes(layerId)) {
      setSelectedLayers(prev => [...prev, layerId])
    }
  }

  const addSkill = (skillId: string) => {
    if (!selectedSkills.includes(skillId)) {
      setSelectedSkills(prev => [...prev, skillId])
    }
  }

  const removeLayer = (layerId: string) => {
    setSelectedLayers(prev => prev.filter(id => id !== layerId))
  }

  const removeSkill = (skillId: string) => {
    setSelectedSkills(prev => prev.filter(id => id !== skillId))
  }

  const loadAgentToForm = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || '')
    setSelectedSkills([...(agent.skillIds || [])])
    setSelectedLayers([...(agent.layerIds || [])])
    setAgentName(agent.name)
    setSelectedProvider(agent.provider || '')
    setEditingAgentName(agent.name)
  }

  const resetForm = () => {
    setAgentName('')
    setSelectedProfile('')
    setSelectedSkills([])
    setSelectedLayers([])
    setSelectedProvider('')
    setEditingAgentName(null)
  }

  return {
    selectedProfile, setSelectedProfile,
    selectedSkills, addSkill, removeSkill,
    selectedLayers, addLayer, removeLayer,
    agentName, setAgentName,
    selectedProvider, setSelectedProvider,
    editingAgentName, setEditingAgentName,
    loadAgentToForm, resetForm,
  }
}
