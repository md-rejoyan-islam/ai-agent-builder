import { useState } from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import { useAgentContext } from '../../context/AgentContext'
import { DraggableItem, DroppableZone } from '../ui/DnD'

export const SkillsStep = () => {
  const { data, selectedSkills, addSkill, removeSkill } = useAgentContext()
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
    addSkill(itemId)
  }

  const activeSkill = data.skills.find(s => s.id === activeId)

  return (
    <>
      <div className="block lg:hidden space-y-4 mb-6">
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedSkills.map(id => {
              const skill = data.skills.find(s => s.id === id)
              return (
                <span key={id} className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 border border-accent-500/25 px-3 py-1 text-xs font-medium text-accent-400">
                  {skill?.name}
                  <button onClick={() => removeSkill(id)} className="hover:text-danger-400 transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </span>
              )
            })}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {data.skills.map(s => {
            const isChecked = selectedSkills.includes(s.id)
            const toggleSkill = () => isChecked ? removeSkill(s.id) : addSkill(s.id)
            return (
              <button
                key={s.id}
                onClick={toggleSkill}
                className={`group text-left rounded-xl border p-3.5 transition-all duration-200
                  ${isChecked
                    ? 'border-accent-500/40 bg-accent-500/8'
                    : 'border-surface-700/50 bg-surface-800/30 hover:border-surface-600 hover:bg-surface-800/50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200
                    ${isChecked ? 'border-accent-500 bg-accent-500' : 'border-surface-600 group-hover:border-surface-500'}
                  `}>
                    {isChecked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold ${isChecked ? 'text-accent-400' : 'text-surface-200'}`}>{s.name}</p>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-surface-600 bg-surface-800/60 rounded px-1.5 py-0.5">{s.category}</span>
                    </div>
                    <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">{s.description}</p>
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
                Available Skills
              </h4>
              <div className="space-y-2">
                {data.skills.filter(s => !selectedSkills.includes(s.id)).map(s => (
                  <DraggableItem key={s.id} id={s.id}>
                    <div className="rounded-xl border border-surface-700/50 bg-surface-800/30 p-3 flex items-start gap-3 hover:border-accent-500/30 hover:bg-surface-800/50 transition-all">
                      <div className="mt-1 flex flex-col gap-0.5 text-surface-600">
                        <span className="block h-0.5 w-3.5 bg-current rounded" />
                        <span className="block h-0.5 w-3.5 bg-current rounded" />
                        <span className="block h-0.5 w-3.5 bg-current rounded" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-surface-200">{s.name}</p>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-surface-600 bg-surface-800/80 rounded px-1.5 py-0.5">{s.category}</span>
                        </div>
                        <p className="text-xs text-surface-500 mt-0.5">{s.description}</p>
                      </div>
                    </div>
                  </DraggableItem>
                ))}
                {data.skills.filter(s => !selectedSkills.includes(s.id)).length === 0 && (
                  <p className="text-xs text-surface-600 text-center py-4 italic">All skills have been added!</p>
                )}
              </div>
            </div>

            <div className="flex flex-col h-full">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-3 flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                Selected ({selectedSkills.length})
              </h4>
              <DroppableZone id="skills-drop" isEmpty={selectedSkills.length === 0} className="flex-1">
                {selectedSkills.map(id => {
                  const skill = data.skills.find(sk => sk.id === id)
                  return (
                    <span key={id} className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500/15 border border-accent-500/25 px-3 py-2 text-xs font-semibold text-accent-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                      {skill?.name}
                      <button onClick={() => removeSkill(id)} className="ml-1 hover:text-danger-400 transition-colors" aria-label={`Remove ${skill?.name}`}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  )
                })}
              </DroppableZone>
            </div>
          </div>
          <DragOverlay dropAnimation={{ duration: 200, easing: 'ease-out' }} modifiers={[snapCenterToCursor]}>
            {activeId && activeSkill ? (
              <div className="rounded-xl border border-accent-500/60 bg-gradient-to-r from-surface-800/90 to-accent-500/20 p-3 flex items-start gap-3 shadow-2xl shadow-accent-500/20 cursor-grabbing w-[300px] opacity-95">
                <div className="mt-1 flex flex-col gap-0.5 text-accent-500">
                  <span className="block h-0.5 w-3.5 bg-current rounded" />
                  <span className="block h-0.5 w-3.5 bg-current rounded" />
                  <span className="block h-0.5 w-3.5 bg-current rounded" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-accent-300 drop-shadow-sm">{activeSkill.name}</p>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-surface-400 bg-surface-900 rounded px-1.5 py-0.5">{activeSkill.category}</span>
                  </div>
                  <p className="text-xs text-surface-400 mt-0.5 drop-shadow-sm">{activeSkill.description}</p>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  )
}
