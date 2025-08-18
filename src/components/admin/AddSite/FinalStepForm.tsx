import { useState } from 'react'
import { useMultiStepsForm } from '@/contexts/MultiStepsFormContext'
import { useCreateCompleteSite } from '@/hooks/forms/AddSite/useFinalStepForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, AlertCircle, Loader2, FileText, Users, Cog, MapPin, SatelliteDish } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useNavigate, useParams } from 'react-router'

export const FinalStepForm = () => {
  const { formData } = useMultiStepsForm()
  const { createCompleteSite, isLoading, progress, currentStep } = useCreateCompleteSite()
  const [isComplete, setIsComplete] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const clientId = parseInt(params.clientId as string, 10)

  const handleCreateSite = async () => {
    try {
      
      const completeSiteData = {
        site1: formData.site1,
        site2: formData.site2,
        site3: formData.site3,
        site4: formData.site4,
        site5: formData.site5
      }

      await createCompleteSite(completeSiteData, clientId)
      setIsComplete(true)
    } catch (err) {
      console.error('Error creating site:', err)
    }
  }

  const handleStartOver = () => {
    // setIsComplete(false)
    navigate('/admin/clients/site/new/'+clientId)
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Site créé avec succès !</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-green-700">
              Votre site "{formData.site1?.nom}" a été créé avec tous ses composants.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleStartOver} variant="outline">
                Créer un autre site
              </Button>
              <Button onClick={()=>navigate('/admin/clients/'+clientId)}>
                Voir les sites
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Récapitulatif et Création du Site
        </h2>
        <p className="text-gray-600">
          Vérifiez les informations et créez votre site complet
        </p>
      </div>

      {/* Progress Bar */}
      {isLoading && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{currentStep}</span>
                <span className="text-gray-600">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Site Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
              Information du Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Nom:</span> {formData.site1?.nom || 'Non défini'}
            </div>
            <div>
              <span className="font-medium">Adresse:</span> {formData.site1?.adresse || 'Non définie'}
            </div>
            <div>
              <span className="font-medium">Coordonnées:</span> 
              {formData.site1?.latitude && formData.site1?.longitude 
                ? ` ${formData.site1.latitude}, ${formData.site1.longitude}`
                : ' Non définies'
              }
            </div>
          </CardContent>
        </Card>

        {/* SatelliteDish */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <SatelliteDish className="w-5 h-5 text-green-600" />
              Capteurs et Paramètres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <span className="font-medium">Capteurs configurés:</span> 
              {formData.site2?.capteurs?.length || 0}
            </div>
            {formData.site2?.capteurs?.map((capteur, index) => (
              <div key={index} className="mt-2 text-sm text-gray-600">
                • {capteur.num_serie} ({capteur.parametres?.length || 0} paramètres)
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Machines */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cog className="w-5 h-5 text-orange-600" />
              Configuration des Machines
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.site3 ? (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                <span>Fichier machines importé</span>
              </div>
            ) : (
              <span className="text-gray-500">Aucun fichier importé</span>
            )}
          </CardContent>
        </Card>

        {/* Asset Tracking */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              Asset Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <span className="font-medium">Suivi des objets:</span> 
              {formData.site4?.assetTracking ? ' Activé' : ' Désactivé'}
            </div>
            {formData.site4?.assetTracking && formData.site4?.trackedObjectsFile && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-green-600" />
                <span>Fichier objets suivis importé</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Users */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-indigo-600" />
              Configuration des Utilisateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.site5 ? (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                <span>Fichier utilisateurs importé</span>
              </div>
            ) : (
              <span className="text-gray-500">Aucun fichier importé</span>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Retour
        </Button>
        <Button
          onClick={handleCreateSite}
          disabled={isLoading || !formData.site1?.nom}
          className="min-w-32"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création...
            </>
          ) : (
            'Créer le Site'
          )}
        </Button>
      </div>
    </div>
  )
}