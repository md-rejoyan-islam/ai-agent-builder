import { useState } from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import { useAgentContext } from '../../context/AgentContext'
import { DraggableItem, DroppableZone } from '../ui/DnD'

export const LayersStep = () => {
  const { data, selectedLayers, addLayer, removeLayer } = useAgentContext()
  const [activeId, setActiveId] = useState<string | null>(null)
  
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  if (!data) return null

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    if (!event.over) return
    const itemId = event.active.id as string
    addLayer(itemId)
  }

  const activeLayer = data.layers.find(l => l.id === activeId)

  return (
    <>
      <div className="block lg:hidden space-y-4 mb-6">
        {selectedLayers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedLayers.map(id => {
              const layer = data.layers.find(l => l.id === id)
              return (
                <span key={id} className="inline-flex items-center gap-1.5 rounded-full bg-violet-400/15 border border-violet-400/25 px-3 py-1 text-xs font-medium text-violet-400">
                  {layer?.name}
                  <button onClick={() => removeLayer(id)} className="hover:text-danger-400 transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </span>
              )
            })}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {data.layers.map(l => {
            const isChecked = selectedLayers.includes(l.id)
            const toggleLayer = () => isChecked ? removeLayer(l.id) : addLayer(l.id)
            return (
              <button
                key={l.id}
                onClick={toggleLayer}
                className={`group text-left rounded-xl border p-3.5 transition-all duration-200
                  ${isChecked
                    ? 'border-violet-400/40 bg-violet-400/8'
                    : 'border-surface-700/50 bg-surface-800/30 hover:border-surface-600 hover:bg-surface-800/50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200
                    ${isChecked ? 'border-violet-400 bg-violet-400' : 'border-surface-600 group-hover:border-surface-500'}
                  `}>
                    {isChecked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold ${isChecked ? 'text-violet-400' : 'text-surface-200'}`}>{l.name}</p>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-surface-600 bg-surface-800/60 rounded px-1.5 py-0.5">{l.type}</span>
                    </div>
                    <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">{l.description}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="hidden lg:block mb-6">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-3 flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                Available Layers
              </h4>
              <div className="space-y-2">
                {data.layers.filter(l => !selectedLayers.includes(l.id)).map(l => (
                  <DraggableItem key={l.id} id={l.id}>
                    <div className="rounded-xl border border-surface-700/50 bg-surface-800/30 p-3 flex items-start gap-3 hover:border-violet-400/30 hover:bg-surface-800/50 transition-all">
                      <div className="mt-1 flex flex-col gap-0.5 text-surface-600">
                        <span className="block h-0.5 w-3.5 bg-current rounded" />
                        <span className="block h-0.5 w-3.5 bg-current rounded" />
                        <span className="block h-0.5 w-3.5 bg-current rounded" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-surface-200">{l.name}</p>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-surface-600 bg-surface-800/80 rounded px-1.5 py-0.5">{l.type}</span>
                        </div>
                        <p className="text-xs text-surface-500 mt-0.5">{l.description}</p>
                      </div>
                    </div>
                  </DraggableItem>
                ))}
                {data.layers.filter(l => !selectedLayers.includes(l.id)).length === 0 && (
                  <p className="text-xs text-surface-600 text-center py-4 italic">All layers have been added!</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-3 flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                Selected ({selectedLayers.length})
              </h4>
              <DroppableZone id="layers-drop" isEmpty={selectedLayers.length === 0}>
                {selectedLayers.map(id => {
                  const layer = data.layers.find(la => la.id === id)
                  return (
                    <span key={id} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-400/15 border border-violet-400/25 px-3 py-2 text-xs font-semibold text-violet-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      {layer?.name}
                      <button onClick={() => removeLayer(id)} className="ml-1 hover:text-danger-400 transition-colors" aria-label={`Remove ${layer?.name}`}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  )
                })}
              </DroppableZone>
            </div>
          </div>
          <DragOverlay dropAnimation={{ duration: 200, easing: 'ease-out' }}>
            {activeId && activeLayer ? (
              <div className="rounded-xl border border-violet-500/60 bg-gradient-to-r from-surface-800/90 to-violet-400/30 p-3 flex items-start gap-3 shadow-2xl shadow-violet-500/20 cursor-grabbing w-[280px] scale-95 opacity-95">
                <div className="mt-1 flex flex-col gap-0.5 text-violet-400">
                  <span className="block h-0.5 w-3.5 bg-current rounded" />
                  <span className="block h-0.5 w-3.5 bg-current rounded" />
                  <span className="block h-0.5 w-3.5 bg-current rounded" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-violet-300 drop-shadow-sm">{activeLayer.name}</p>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-surface-400 bg-surface-900 rounded px-1.5 py-0.5">{activeLayer.type}</span>
                  </div>
                  <p className="text-xs text-surface-400 mt-0.5 drop-shadow-sm">{activeLayer.description}</p>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  )
}
