import { useState, useCallback } from 'react'
import type { AgentData } from '../types'

export const useAgentData = () => {
  const [data, setData] = useState<AgentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAPI = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise((resolve) => setTimeout(resolve, delay))

      const response = await fetch('/data.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const jsonData: AgentData = await response.json()
      setData(jsonData)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch agent data'
      console.error('Error fetching data:', err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchAPI }
}
