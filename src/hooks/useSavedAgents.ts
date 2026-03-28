import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import type { SavedAgent } from '../types'

export const useSavedAgents = () => {
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('savedAgents')
    if (saved) {
      try {
        setSavedAgents(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved agents', e)
      }
    }
  }, [])

  const saveAgent = (agent: SavedAgent) => {
    const updatedAgents = [...savedAgents, agent]
    setSavedAgents(updatedAgents)
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents))
  }

  const updateAgent = (oldName: string, newAgent: SavedAgent) => {
    const updatedAgents = savedAgents.map(a => 
      a.name.trim().toLowerCase() === oldName.trim().toLowerCase() ? newAgent : a
    )
    setSavedAgents(updatedAgents)
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents))
  }

  const deleteAgent = (indexToRemove: number) => {
    const agentName = savedAgents[indexToRemove]?.name || 'Agent'
    toast(`Delete "${agentName}"?`, {
      description: 'This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: () => {
          setSavedAgents(prev => {
            const updated = prev.filter((_, index) => index !== indexToRemove)
            localStorage.setItem('savedAgents', JSON.stringify(updated))
            return updated
          })
          toast.success(`"${agentName}" deleted.`)
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    })
  }

  const clearAllAgents = () => {
    toast('Clear all saved agents?', {
      description: 'This action cannot be undone.',
      action: {
        label: 'Clear All',
        onClick: () => {
          setSavedAgents([])
          localStorage.removeItem('savedAgents')
          toast.success('All saved agents cleared.')
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    })
  }

  return { savedAgents, saveAgent, updateAgent, deleteAgent, clearAllAgents }
}
