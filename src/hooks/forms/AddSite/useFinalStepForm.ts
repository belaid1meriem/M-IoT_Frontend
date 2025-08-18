import { useState } from 'react'
import { toast } from 'sonner'
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

interface StepResult {
  success: boolean
  data?: any
  error?: string
}

interface UseCreateCompleteSiteReturn {
  isLoading: boolean
  error: string | null
  progress: number
  currentStep: string
  stepErrors: Record<string, string>
  completedSteps: string[]
  createCompleteSite: (data: CompleteSiteData, clientId: number) => Promise<number | null>
  resetState: () => void
}

export const useCreateCompleteSite = (): UseCreateCompleteSiteReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({})
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const { addSite, error: siteError, isLoading: siteLoading } = useAddSite()
  const { uploadMachine, error: machineError, isLoading: machineLoading } = useAddMachine()
  const { uploadObject, error: objectError, isLoading: objectLoading } = useAddObject()
  const { uploadUser, error: userError, isLoading: userLoading } = useAddUser()

  const resetState = () => {
    setIsLoading(false)
    setError(null)
    setProgress(0)
    setCurrentStep('')
    setStepErrors({})
    setCompletedSteps([])
  }

  const updateStepError = (stepKey: string, errorMessage: string) => {
    setStepErrors(prev => ({
      ...prev,
      [stepKey]: errorMessage
    }))
  }

  const markStepCompleted = (stepKey: string) => {
    setCompletedSteps(prev => [...prev, stepKey])
    // Clear any previous error for this step
    setStepErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[stepKey]
      return newErrors
    })
  }

  const executeStep = async <T>(
    stepKey: string,
    stepName: string,
    stepFunction: () => Promise<T>,
    progressValue: number
  ): Promise<StepResult> => {
    try {
      setCurrentStep(stepName)
      setProgress(progressValue)
      
      const result = await stepFunction()
      markStepCompleted(stepKey)
      
      return {
        success: true,
        data: result
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue'
      updateStepError(stepKey, errorMessage)
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  const createCompleteSite = async (data: CompleteSiteData, clientId: number): Promise<number | null> => {
    setIsLoading(true)
    setError(null)
    resetState()
    
    let createdSiteId: number | null = null

    try {
      // Step 1: Create the site with basic info and sensors
      const siteResult = await executeStep(
        'site_creation',
        'Création du site avec capteurs...',
        async () => {
          const siteData: Site = {
            nom: data.site1.nom,
            adresse: data.site1.adresse,
            latitude: data.site1.latitude,
            longitude: data.site1.longitude,
            captures: data.site2.capteurs,
            asset_tracking: !!data.site4?.assetTracking
          }
          
          const siteId = await addSite(siteData, clientId)
          
          if (!siteId) {
            throw new Error('Le site a été créé mais aucun ID n\'a été retourné')
          }
          
          // Check for API hook errors
          if (siteError) {
            throw new Error(siteError)
          }
          
          return siteId
        },
        25
      )

      if (!siteResult.success || !siteResult.data) {
        throw new Error(siteResult.error || 'Échec de la création du site')
      }

      createdSiteId = siteResult.data
      toast.success('Site créé avec succès')

      // Step 2: Upload machines file if provided
      if (data.site3) {
        const machineResult = await executeStep(
          'machine_upload',
          'Import des machines...',
          async () => {
            await uploadMachine(data.site3!)
            
            if (machineError) {
              throw new Error(machineError)
            }
          },
          50
        )

        if (!machineResult.success) {
          // Non-blocking error - log but continue
          toast.warning(`Erreur lors de l'import des machines: ${machineResult.error}`)
        } else {
          toast.success('Machines importées avec succès')
        }
      }

      // Step 3: Handle asset tracking and tracked objects
      if (data.site4?.assetTracking && data.site4.trackedObjectsFile) {
        const objectResult = await executeStep(
          'object_upload',
          'Import des objets suivis...',
          async () => {
            await uploadObject(data.site4!.trackedObjectsFile!, createdSiteId!, clientId)
            
            if (objectError) {
              throw new Error(objectError)
            }
          },
          75
        )

        if (!objectResult.success) {
          // Non-blocking error - log but continue
          toast.warning(`Erreur lors de l'import des objets: ${objectResult.error}`)
        } else {
          toast.success('Objets suivis importés avec succès')
        }
      }

      // Step 4: Upload users file if provided
      if (data.site5) {
        const userResult = await executeStep(
          'user_upload',
          'Import des utilisateurs...',
          async () => {
            await uploadUser(data.site5!, clientId)
            
            if (userError) {
              throw new Error(userError)
            }
          },
          90
        )

        if (!userResult.success) {
          // Non-blocking error - log but continue
          toast.warning(`Erreur lors de l'import des utilisateurs: ${userResult.error}`)
        } else {
          toast.success('Utilisateurs importés avec succès')
        }
      }

      // Final step
      await executeStep(
        'finalization',
        'Finalisation...',
        async () => {
          // Any final cleanup or validation
          return true
        },
        100
      )

      // Determine overall success
      const criticalStepFailed = stepErrors['site_creation']
      const hasNonCriticalErrors = Object.keys(stepErrors).length > 0 && !criticalStepFailed

      if (criticalStepFailed) {
        throw new Error('Échec critique: ' + stepErrors['site_creation'])
      }

      if (hasNonCriticalErrors) {
        toast.warning('Site créé avec quelques erreurs. Consultez les détails.')
      } else {
        toast.success('Site créé avec succès avec tous les composants!')
      }

      return createdSiteId

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue'
      setError(errorMessage)
      toast.error(`Erreur lors de la création: ${errorMessage}`)
      return null
    } finally {
      setIsLoading(false)
      
      // Don't reset current step and progress immediately if there were errors
      if (!error) {
        setTimeout(() => {
          setCurrentStep('')
          setProgress(0)
        }, 2000) // Keep success state visible for 2 seconds
      }
    }
  }

  return {
    isLoading: isLoading || siteLoading || machineLoading || objectLoading || userLoading,
    error,
    progress,
    currentStep,
    stepErrors,
    completedSteps,
    createCompleteSite,
    resetState
  }
}