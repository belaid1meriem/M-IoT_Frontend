import { useState, useCallback } from 'react'
import { useAddSite } from '../../useAddSite'
import { useAddMachine } from '../../useAddMachine'
import { useAddObject } from '../../useAddObjet'
import { useAddUser } from '../../useAddUser'
import type { Site } from '@/types/Site'

interface CompleteSiteData {
  site1: {
    nom: string
    latitude: number
    longitude: number
    adresse: string
  }
  site2: {
    capteurs: Array<{
      num_serie: string
      date_install: string
      parametres: Array<{
        nom: string
        unite: string
        valeur_max: number
      }>
    }>
  }
  site3?: File // machines file
  site4?: {
    assetTracking: boolean
    trackedObjectsFile?: File
  }
  site5?: File // users file
}

interface StepError {
  step: string
  error: string
  timestamp: Date
}

interface StepResult {
  success: boolean
  error?: string
}

export interface UseCreateCompleteSiteReturn {
  // State
  isLoading: boolean
  progress: number
  currentStep: string
  stepErrors: StepError[]
  isCompleted: boolean
  
  // Individual hook states
  siteResult: { isLoading: boolean; error: string | null; success: string | null }
  machineResult: { isLoading: boolean; error: string | null; success: string | null }
  objectResult: { isLoading: boolean; error: string | null; success: string | null }
  userResult: { isLoading: boolean; error: string | null; success: string | null }
  
  // Methods
  createCompleteSite: (data: CompleteSiteData, clientId: number) => Promise<void>
  resetState: () => void
  clearErrors: () => void
}

export const useCreateCompleteSite = (): UseCreateCompleteSiteReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [stepErrors, setStepErrors] = useState<StepError[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  // Individual hooks
  const siteHook = useAddSite()
  const machineHook = useAddMachine()
  const objectHook = useAddObject()
  const userHook = useAddUser()

  const addStepError = useCallback((step: string, error: string) => {
    setStepErrors(prev => [...prev, { 
      step, 
      error, 
      timestamp: new Date() 
    }])
  }, [])

  const resetState = useCallback(() => {
    setIsLoading(false)
    setProgress(0)
    setCurrentStep('')
    setStepErrors([])
    setIsCompleted(false)
  }, [])

  const clearErrors = useCallback(() => {
    setStepErrors([])
  }, [])

  const executeStep = async <T extends any[]>(
    stepName: string,
    stepFunction: (...args: T) => Promise<any>,
    args: T,
    errorHook?: string | null
  ): Promise<StepResult> => {
    try {
      const result = await stepFunction(...args)
      
      // Check if the corresponding hook has an error
      let hookError: string | null = null
      switch (errorHook) {
        case 'site':
          hookError = siteHook.error
          break
        case 'machine':
          hookError = machineHook.error
          break
        case 'object':
          hookError = objectHook.error
          break
        case 'user':
          hookError = userHook.error
          break
      }
      
      if (hookError) {
        addStepError(stepName, hookError)
        return { success: false, error: hookError }
      }
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue'
      addStepError(stepName, errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const createCompleteSite = async (data: CompleteSiteData, clientId: number): Promise<void> => {
    setIsLoading(true)
    setStepErrors([])
    setProgress(0)
    setIsCompleted(false)

    try {
      // Step 1: Create the site with basic info and sensors
      setCurrentStep('Création du site et des capteurs...')
      setProgress(10)
      
      const siteData: Site = {
        nom: data.site1.nom,
        adresse: data.site1.adresse,
        latitude: data.site1.latitude,
        longitude: data.site1.longitude,
        captures: data.site2.capteurs,
        asset_tracking: !!data.site4?.assetTracking
      }
      
      const siteResult = await executeStep(
        'Création du site',
        siteHook.addSite,
        [siteData, clientId],
        'site'
      )
      
      if (!siteResult.success) {
        setProgress(100)
        return
      }
      
      // For now, we'll use a mock siteId since the real one should come from the API response
      const siteId = 1 // This should come from the actual API response
      setProgress(25)

      // Step 2: Upload machines file if provided
      if (data.site3) {
        setCurrentStep('Import des machines...')
        setProgress(35)
        
        await executeStep(
          'Import des machines',
          machineHook.uploadMachine,
          [data.site3],
          'machine'
        )
        
        setProgress(50)
      }

      // Step 3: Handle asset tracking and tracked objects
      if (data.site4?.assetTracking) {
        setCurrentStep('Configuration du suivi des objets...')
        setProgress(60)
        
        if (data.site4.trackedObjectsFile) {
          setCurrentStep('Import des objets suivis...')
          setProgress(65)
          
          await executeStep(
            'Import des objets suivis',
            objectHook.uploadObject,
            [data.site4.trackedObjectsFile, siteId, clientId],
            'object'
          )
        }
        
        setProgress(75)
      }

      // Step 4: Upload users file if provided
      if (data.site5) {
        setCurrentStep('Import des utilisateurs...')
        setProgress(80)
        
        await executeStep(
          'Import des utilisateurs',
          userHook.uploadUser,
          [data.site5, clientId],
          'user'
        )
        
        setProgress(90)
      }

      setCurrentStep('Finalisation...')
      setProgress(100)
      setIsCompleted(true)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur critique est survenue'
      addStepError('Processus général', errorMessage)
      setProgress(100)
    } finally {
      setIsLoading(false)
      setCurrentStep('')
    }
  }

  return {
    // State
    isLoading,
    progress,
    currentStep,
    stepErrors,
    isCompleted,
    
    // Individual hook states
    siteResult: {
      isLoading: siteHook.isLoading,
      error: siteHook.error,
      success: siteHook.success
    },
    machineResult: {
      isLoading: machineHook.isLoading,
      error: machineHook.error,
      success: machineHook.success
    },
    objectResult: {
      isLoading: objectHook.isLoading,
      error: objectHook.error,
      success: objectHook.success
    },
    userResult: {
      isLoading: userHook.isLoading,
      error: userHook.error,
      success: userHook.success
    },
    
    // Methods
    createCompleteSite,
    resetState,
    clearErrors
  }
}