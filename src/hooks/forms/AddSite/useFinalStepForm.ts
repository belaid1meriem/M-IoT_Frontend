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
  data?: any
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
    const newError: StepError = { 
      step, 
      error, 
      timestamp: new Date() 
    }
    setStepErrors(prev => [...prev, newError])
    console.error(`[${step}] Error:`, error)
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
    errorHook?: 'site' | 'machine' | 'object' | 'user' | null
  ): Promise<StepResult> => {
    try {
      console.log(`[${stepName}] Starting step...`)
      const result = await stepFunction(...args)
      
      // Small delay to allow hook states to update
      await new Promise(resolve => setTimeout(resolve, 100))
      
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
      
      console.log(`[${stepName}] Step completed successfully`)
      return { success: true, data: result }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : typeof err === 'string' 
          ? err 
          : 'Une erreur inconnue est survenue'
      
      addStepError(stepName, errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const createCompleteSite = async (data: CompleteSiteData, clientId: number): Promise<void> => {
    console.log('Starting site creation process...')
    setIsLoading(true)
    setStepErrors([])
    setProgress(0)
    setIsCompleted(false)

    let siteId: number | undefined = undefined

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
      
      console.log('Creating site with data:', siteData)
      const siteResult = await executeStep(
        'Création du site',
        siteHook.addSite,
        [siteData, clientId],
        'site'
      )
      
      if (!siteResult.success) {
        addStepError('Création du site', siteResult.error || 'Erreur inconnue lors de la création du site')
        setProgress(100)
        return
      }
      
      // Get the site ID from the result
      siteId = siteResult.data
      console.log('Site created with ID:', siteId)
      
      if (!siteId) {
        addStepError('Création du site', 'ID du site non retourné par l\'API')
        setProgress(100)
        return
      }
      
      setProgress(25)

      // Step 2: Upload machines file if provided
      if (data.site3) {
        setCurrentStep('Import des machines...')
        setProgress(35)
        
        console.log('Uploading machines file')
        const machineResult = await executeStep(
          'Import des machines',
          machineHook.uploadMachine,
          [data.site3],
          'machine'
        )
        
        if (!machineResult.success) {
          console.warn('Machine upload failed, continuing with other steps')
        }
        
        setProgress(50)
      }

      // Step 3: Handle asset tracking and tracked objects
      if (data.site4?.assetTracking) {
        setCurrentStep('Configuration du suivi des objets...')
        setProgress(60)
        
        if (data.site4.trackedObjectsFile) {
          setCurrentStep('Import des objets suivis...')
          setProgress(65)
          
          console.log('Uploading tracked objects file')
          const objectResult = await executeStep(
            'Import des objets suivis',
            objectHook.uploadObject,
            [data.site4.trackedObjectsFile, siteId, clientId],
            'object'
          )
          
          if (!objectResult.success) {
            console.warn('Object upload failed, continuing with other steps')
          }
        }
        
        setProgress(75)
      }

      // Step 4: Upload users file if provided
      if (data.site5) {
        setCurrentStep('Import des utilisateurs...')
        setProgress(80)
        
        console.log('Uploading users file')
        const userResult = await executeStep(
          'Import des utilisateurs',
          userHook.uploadUser,
          [data.site5, clientId],
          'user'
        )
        
        if (!userResult.success) {
          console.warn('User upload failed, continuing with finalization')
        }
        
        setProgress(90)
      }

      setCurrentStep('Finalisation...')
      setProgress(100)
      
      // Check if we have any critical errors that should prevent completion
      const hasCriticalErrors = stepErrors.some(error => 
        error.step.includes('Création du site') // Only site creation is critical
      ) || siteHook.error

      if (!hasCriticalErrors) {
        setIsCompleted(true)
        console.log('Site creation process completed successfully')
      } else {
        console.log('Site creation process completed with critical errors')
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : typeof err === 'string' 
          ? err 
          : 'Une erreur critique est survenue'
      
      console.error('Critical error in site creation process:', err)
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