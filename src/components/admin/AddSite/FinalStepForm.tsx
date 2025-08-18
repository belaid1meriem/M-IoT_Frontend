import React from 'react'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Loader2,
  MapPin,
  Cog,
  Package,
  Users,
  Sparkles,
  ChevronDown,
  ChevronRight,
  AlertTriangle
} from "lucide-react"

interface FinalStepFormProps {
  isLoading: boolean
  error: string | null
  progress: number
  currentStep: string
  stepErrors: Record<string, string>
  completedSteps: string[]
  onCancel?: () => void
  onRetry?: () => void
  onContinue?: () => void
  className?: string
}

const FinalStepForm: React.FC<FinalStepFormProps> = ({
  isLoading,
  error,
  progress,
  currentStep,
  stepErrors,
  completedSteps,
  onCancel,
  onRetry,
  onContinue,
  className = ""
}) => {
  const [showErrorDetails, setShowErrorDetails] = React.useState(false)

  // Define the steps with their keys matching the hook
  const steps = [
    {
      key: 'site_creation',
      title: 'Création du site',
      description: 'Création du site avec informations de base et capteurs',
      icon: <MapPin className="w-5 h-5" />,
      critical: true
    },
    {
      key: 'machine_upload',
      title: 'Import des machines',
      description: 'Import du fichier des machines',
      icon: <Cog className="w-5 h-5" />,
      critical: false
    },
    {
      key: 'object_upload',
      title: 'Import des objets suivis',
      description: 'Import des objets pour le suivi RFID',
      icon: <Package className="w-5 h-5" />,
      critical: false
    },
    {
      key: 'user_upload',
      title: 'Import des utilisateurs',
      description: 'Import du fichier des utilisateurs',
      icon: <Users className="w-5 h-5" />,
      critical: false
    },
    {
      key: 'finalization',
      title: 'Finalisation',
      description: 'Finalisation de la création du site',
      icon: <Sparkles className="w-5 h-5" />,
      critical: true
    }
  ]

  const getStepStatus = (step: typeof steps[0]) => {
    if (stepErrors[step.key]) return 'error'
    if (completedSteps.includes(step.key)) return 'completed'
    if (currentStep.toLowerCase().includes(step.key.replace('_', ' ')) || 
        currentStep.toLowerCase().includes(step.title.toLowerCase())) return 'active'
    return 'pending'
  }

  const getStepIcon = (step: typeof steps[0]) => {
    const status = getStepStatus(step)
    
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'active':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
      case 'error':
        return step.critical ? 
               <AlertCircle className="w-5 h-5 text-red-600" /> : 
               <AlertTriangle className="w-5 h-5 text-orange-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getOverallStatus = () => {
    const criticalErrors = steps.filter(step => step.critical && stepErrors[step.key])
    const nonCriticalErrors = steps.filter(step => !step.critical && stepErrors[step.key])
    
    if (criticalErrors.length > 0) return 'critical_error'
    if (error) return 'error'
    if (progress === 100 && Object.keys(stepErrors).length === 0) return 'success'
    if (progress === 100 && nonCriticalErrors.length > 0) return 'partial_success'
    return 'in_progress'
  }

  const getStatusTitle = () => {
    const status = getOverallStatus()
    switch (status) {
      case 'critical_error':
        return 'Erreur critique lors de la création'
      case 'error':
        return 'Erreur lors de la création'
      case 'success':
        return 'Site créé avec succès!'
      case 'partial_success':
        return 'Site créé avec des avertissements'
      default:
        return 'Création du site en cours...'
    }
  }

  const getProgressColor = () => {
    const status = getOverallStatus()
    switch (status) {
      case 'critical_error':
        return 'hsl(var(--destructive))'
      case 'error':
        return 'hsl(var(--destructive))'
      case 'partial_success':
        return 'hsl(var(--warning))'
      case 'success':
        return 'hsl(var(--success))'
      default:
        return 'hsl(var(--primary))'
    }
  }

  const errorCount = Object.keys(stepErrors).length
  const criticalErrorCount = steps.filter(step => step.critical && stepErrors[step.key]).length

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          {getStatusTitle()}
        </CardTitle>
        
        {/* Error summary */}
        {errorCount > 0 && (
          <div className="flex justify-center gap-2 mt-2">
            {criticalErrorCount > 0 && (
              <Badge variant="destructive">
                {criticalErrorCount} erreur{criticalErrorCount > 1 ? 's' : ''} critique{criticalErrorCount > 1 ? 's' : ''}
              </Badge>
            )}
            {errorCount - criticalErrorCount > 0 && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {errorCount - criticalErrorCount} avertissement{errorCount - criticalErrorCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{currentStep || 'En attente...'}</span>
            <span>{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-3"
            style={{
              '--progress-foreground': getProgressColor()
            } as React.CSSProperties}
          />
        </div>

        {/* Overall Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Erreur principale:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Details (Collapsible) */}
        {errorCount > 0 && (
          <Collapsible open={showErrorDetails} onOpenChange={setShowErrorDetails}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                {showErrorDetails ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                {showErrorDetails ? 'Masquer' : 'Voir'} les détails des erreurs ({errorCount})
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {Object.entries(stepErrors).map(([stepKey, errorMessage]) => {
                const step = steps.find(s => s.key === stepKey)
                return (
                  <Alert key={stepKey} variant={step?.critical ? "destructive" : "default"}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{step?.title}:</strong> {errorMessage}
                    </AlertDescription>
                  </Alert>
                )
              })}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Steps List */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-600">Progression détaillée:</h4>
          {steps.map((step, index) => {
            const status = getStepStatus(step)
            const hasError = stepErrors[step.key]
            
            return (
              <div
                key={step.key}
                className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                  status === 'active' ? 'bg-blue-50 border-l-4 border-blue-500' :
                  status === 'completed' ? 'bg-green-50 border-l-4 border-green-500' :
                  status === 'error' && step.critical ? 'bg-red-50 border-l-4 border-red-500' :
                  status === 'error' && !step.critical ? 'bg-orange-50 border-l-4 border-orange-500' :
                  'bg-gray-50 border-l-4 border-gray-200'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getStepIcon(step)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">
                      {index + 1}. {step.title}
                    </span>
                    {step.critical && (
                      <Badge variant="outline" className="text-xs">
                        Critique
                      </Badge>
                    )}
                    {status === 'completed' && (
                      <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                        Terminé
                      </Badge>
                    )}
                    {status === 'active' && (
                      <Badge variant="default" className="text-xs bg-blue-100 text-blue-700">
                        En cours
                      </Badge>
                    )}
                    {status === 'error' && step.critical && (
                      <Badge variant="destructive" className="text-xs">
                        Erreur critique
                      </Badge>
                    )}
                    {status === 'error' && !step.critical && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                        Avertissement
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {step.description}
                  </p>
                  {hasError && (
                    <p className="text-xs mt-1 text-red-600 font-medium">
                      {hasError}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          {(criticalErrorCount > 0 || error) && onRetry && (
            <Button 
              onClick={onRetry}
              variant="default"
              className="flex-1"
            >
              Réessayer
            </Button>
          )}
          
          {isLoading && onCancel && (
            <Button 
              onClick={onCancel}
              variant="outline"
              className={(criticalErrorCount > 0 || error) && onRetry ? "flex-1" : "w-full"}
            >
              Annuler
            </Button>
          )}

          {(progress === 100 || (!error && !isLoading)) && onContinue && (
            <Button 
              onClick={onContinue}
              variant="default"
              className="w-full"
            >
              {getOverallStatus() === 'partial_success' ? 'Continuer malgré les avertissements' : 'Continuer'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default FinalStepForm