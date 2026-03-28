import { useDraggable, useDroppable } from '@dnd-kit/core'

export const DraggableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id })
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
      className={`cursor-grab active:cursor-grabbing touch-none transition-all duration-150 ${isDragging ? 'opacity-30 scale-95' : 'hover:scale-[1.02]'}`}
    >
      {children}
    </div>
  )
}

export const DroppableZone = ({ id, children, isEmpty }: { id: string; children: React.ReactNode; isEmpty: boolean }) => {
  const { isOver, setNodeRef, active } = useDroppable({ id })
  return (
    <div ref={setNodeRef}
      className={`rounded-xl border-2 border-dashed p-4 min-h-[240px] transition-all duration-200
        ${isOver && active ? 'border-accent-500/60 bg-accent-500/8 scale-[1.01]' : ''}
        ${active && !isOver ? 'border-primary-500/40 bg-primary-500/5' : ''}
        ${!active ? 'border-surface-700/40 bg-surface-800/20' : ''}
      `}
    >
      {isEmpty && !active ? (
        <div className="flex flex-col items-center justify-center py-12 text-center h-full">
          <svg className="w-8 h-8 text-surface-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <p className="text-xs text-surface-600">Drop items here</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">{children}</div>
      )}
    </div>
  )
}
