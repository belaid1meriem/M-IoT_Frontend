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

interface UseCreateCompleteSiteReturn {
  isLoading: boolean
  error: string | null
  progress: number
  currentStep: string
  createCompleteSite: (data: CompleteSiteData, clientId: number) => Promise<any>
}

export const useCreateCompleteSite = (): UseCreateCompleteSiteReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')

  const { addSite } = useAddSite()
  const { uploadMachine } = useAddMachine()
  const { uploadObject } = useAddObject()
  const { uploadUser } = useAddUser()

  const createCompleteSite = async (data: CompleteSiteData, clientId: number) => {
    setIsLoading(true)
    setError(null)
    setProgress(0)

    try {
      // Step 1: Create the site with basic info and sensors
      setCurrentStep('Création du site...')
      setProgress(20)
      
      const siteData: Site = {
        nom: data.site1.nom,
        adresse: data.site1.adresse,
        latitude: data.site1.latitude,
        longitude: data.site1.longitude,
        captures: data.site2.capteurs,
        asset_tracking: !! data.site4?.assetTracking
      }
      
      const siteId = await addSite(siteData, clientId)
      
      if (!siteId){
        throw Error('Une Erreur est servenue lors de la création du site')
      }
      setProgress(40)

      // Step 2: Upload machines file if provided
      if (data.site3) {
        setCurrentStep('Import des machines...')
        // await uploadMachine(data.site3, siteId, clientId)
        setProgress(60)
      }

      // Step 3: Handle asset tracking and tracked objects
      if (data.site4?.assetTracking) {
        setCurrentStep('Activation du suivi des objets...')
        
        if (data.site4.trackedObjectsFile) {
          setCurrentStep('Import des objets suivis...')
          await uploadObject(data.site4.trackedObjectsFile, siteId, clientId)
        }
        setProgress(80)
      }

      // Step 4: Upload users file if provided
      if (data.site5) {
        setCurrentStep('Import des utilisateurs...')
        await uploadUser(data.site5, clientId)
        setProgress(90)
      }

      setCurrentStep('Finalisation...')
      setProgress(100)
      
      toast.success('Site créé avec succès avec tous les composants!')
      return 

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(`Erreur lors de la création complète: ${errorMessage}`)
    } finally {
      setIsLoading(false)
      setCurrentStep('')
      setProgress(0)
    }
  }

  return {
    isLoading,
    error,
    progress,
    currentStep,
    createCompleteSite
  }
}