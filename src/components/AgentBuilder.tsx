import { useState } from 'react'
import { toast } from 'sonner'
import { useAgentContext } from '../context/AgentContext'
import { ProfileStep } from './steps/ProfileStep'
import { SkillsStep } from './steps/SkillsStep'
import { LayersStep } from './steps/LayersStep'
import { ProviderStep } from './steps/ProviderStep'
import { SaveStep } from './steps/SaveStep'

const STEPS = [
  { key: 'profile', label: 'Profile', description: 'Choose a base profile for your agent' },
  { key: 'skills', label: 'Skills', description: 'Drag skills into the selected area' },
  { key: 'layers', label: 'Layers', description: 'Drag personality & reasoning layers' },
  { key: 'provider', label: 'Provider', description: 'Pick the AI engine to power your agent' },
  { key: 'save', label: 'Save', description: 'Review & save your agent configuration' },
] as const

type StepKey = (typeof STEPS)[number]['key']

const AgentBuilder = () => {
  const {
    loading,
    selectedProfile,
    selectedSkills,
    selectedLayers,
    selectedProvider,
    editingAgentName, 
    cancelEdit,
  } = useAgentContext()

  const [currentStep, setCurrentStep] = useState(0)

  const isStepComplete = (step: StepKey): boolean => {
    switch (step) {
      case 'profile': return !!selectedProfile
      case 'skills': return selectedSkills.length > 0
      case 'layers': return selectedLayers.length > 0
      case 'provider': return !!selectedProvider
      case 'save': return false
    }
  }

  const handleNext = () => {
    const step = STEPS[currentStep]
    if (!isStepComplete(step.key)) {
      toast.error(`Please select at least one ${step.label.toLowerCase()} before continuing.`)
      return
    }
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const currentStepKey = STEPS[currentStep].key

  return (
    <section className="rounded-2xl border border-surface-800/80 bg-surface-900/70 backdrop-blur-sm shadow-xl shadow-black/10 flex flex-col">
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.653-4.655m5.085-2.412a2.75 2.75 0 1 1 4.865-2.535 2.75 2.75 0 0 1-4.865 2.535Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-surface-50">Build Your Agent</h2>
              <p className="text-xs text-surface-500">Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep].description}</p>
            </div>
          </div>
          
          {editingAgentName && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-medium text-amber-400">Editing: <span className="font-bold text-amber-300">{editingAgentName}</span></span>
              </div>
              <button
                onClick={() => { cancelEdit(); setCurrentStep(0); }}
                className="text-xs font-semibold text-surface-400 hover:text-surface-200 transition-colors"
              >
                Cancel Edit
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-0 mb-2">
          {STEPS.map((step, idx) => {
            const isActive = idx === currentStep
            const isComplete = isStepComplete(step.key)
            const isPast = idx < currentStep
            return (
              <div key={step.key} className="flex items-center flex-1 last:flex-initial">
                <button onClick={() => {
                  if (idx <= currentStep || isStepComplete(STEPS[currentStep].key)) setCurrentStep(idx)
                }} className="flex flex-col items-center gap-1.5 group relative">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2
                    ${isActive ? 'border-primary-500 bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-110'
                      : isComplete || isPast ? 'border-accent-500 bg-accent-500/20 text-accent-400'
                      : 'border-surface-700 bg-surface-800/60 text-surface-500 group-hover:border-surface-500'}
                  `}>
                    {isComplete || (isPast && !isActive) ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    ) : idx + 1}
                  </div>
                  <span className={`text-[10px] font-semibold transition-colors hidden sm:block
                    ${isActive ? 'text-primary-300' : isPast || isComplete ? 'text-accent-400' : 'text-surface-600'}
                  `}>{step.label}</span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 mx-2"><div className={`h-0.5 rounded-full transition-all duration-500 ${isPast || isComplete ? 'bg-accent-500/60' : 'bg-surface-700/60'}`} /></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-surface-800/60 mx-6" />

      <div className="flex-1 overflow-y-auto p-6 min-h-[450px]">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <svg className="animate-spin h-7 w-7 mb-3 text-primary-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-surface-400">Loading components…</p>
          </div>
        )}

        {!loading && currentStepKey === 'profile' && <ProfileStep />}
        {!loading && currentStepKey === 'skills' && <SkillsStep />}
        {!loading && currentStepKey === 'layers' && <LayersStep />}
        {!loading && currentStepKey === 'provider' && <ProviderStep />}
        {!loading && currentStepKey === 'save' && <SaveStep />}
      </div>

      <div className="h-px bg-surface-800/60 mx-6" />
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200
            ${currentStep === 0
              ? 'text-surface-700 cursor-not-allowed'
              : 'text-surface-300 border border-surface-700/50 bg-surface-800/30 hover:bg-surface-800/60 hover:border-surface-600'
            }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
          Back
        </button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-6 bg-primary-500' : idx < currentStep ? 'w-1.5 bg-accent-500' : 'w-1.5 bg-surface-700'}`} />
          ))}
        </div>

        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!isStepComplete(STEPS[currentStep].key)}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all duration-200
              ${isStepComplete(STEPS[currentStep].key)
                ? 'bg-primary-600 text-white shadow-primary-600/20 hover:bg-primary-500 hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-surface-800 text-surface-500 border border-surface-700/50 shadow-none cursor-not-allowed'
              }
            `}
          >
            Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>
        ) : (
          <div className="w-[88px]" />
        )}
      </div>
    </section>
  )
}

export default AgentBuilder
