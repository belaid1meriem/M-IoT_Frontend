// src/hooks/api/useAddTrajectory.tsx
import useApiClient from "./auth/useApiClientSubDomain";
import { useState } from "react";

export interface TrajectoryPoint {
  nom_lieu: string;
  latitude?: number;
  longitude?: number;
  ordre: number;
  date_prevu: string;
}

export interface TrajectoryData {
  nom_trajet: string;
  objet_tracking_nom: string;
  source_nom: string;
  source_latitude?: number;
  source_longitude?: number;
  date_prevu_source: string;
  destination_nom: string;
  destination_latitude?: number;
  destination_longitude?: number;
  date_prevu_destination: string;
  points: TrajectoryPoint[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface TrajectoryError {
  type: 'validation' | 'geolocation' | 'object_not_found' | 'duplicate' | 'network' | 'server' | 'unknown';
  message: string;
  details?: ValidationError[] | string;
  field?: string;
}

export function useAddTrajectory() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TrajectoryError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const apiClient = useApiClient();

  const parseValidationErrors = (errorData: any): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (typeof errorData === 'object' && errorData !== null) {
      Object.keys(errorData).forEach(field => {
        const fieldErrors = errorData[field];
        if (Array.isArray(fieldErrors)) {
          fieldErrors.forEach(errorMsg => {
            errors.push({ field, message: errorMsg });
          });
        } else if (typeof fieldErrors === 'string') {
          errors.push({ field, message: fieldErrors });
        }
      });
    }
    
    return errors;
  };

  const determineErrorType = (error: any): TrajectoryError => {
    const status = error.response?.status;
    const errorData = error.response?.data;

    // Network errors (no response)
    if (!error.response) {
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        return {
          type: 'network',
          message: 'Problème de connexion réseau. Vérifiez votre connexion internet.'
        };
      }
      return {
        type: 'network',
        message: 'Impossible de contacter le serveur. Réessayez plus tard.'
      };
    }

    switch (status) {
      case 400: // Bad Request - Validation errors
        if (errorData) {
          // Check for specific validation error patterns from your serializers
          
          // Geolocation errors (from GeolocationService)
          if (errorData.error?.includes('géolocalisation') || 
              errorData.message_details?.includes('géolocalisation') ||
              errorData.non_field_errors?.some((err: string) => err.includes('géolocalisation'))) {
            return {
              type: 'geolocation',
              message: 'Erreur de géolocalisation',
              details: errorData.error || errorData.message_details || 'Adresse non trouvée ou coordonnées invalides'
            };
          }

          // Object not found errors (from validate_objet_tracking_nom)
          if (errorData.objet_tracking_nom || 
              errorData.error?.includes('Aucun objet trouvé') ||
              errorData.message_details?.includes('Aucun objet trouvé')) {
            return {
              type: 'object_not_found',
              message: 'Objet de tracking introuvable',
              details: errorData.objet_tracking_nom?.[0] || errorData.error || errorData.message_details || 'L\'objet spécifié n\'existe pas',
              field: 'objet_tracking_nom'
            };
          }

          // Duplicate trajectory errors (from unique_together constraint)
          if (errorData.non_field_errors?.some((err: string) => 
              err.includes('unique') || err.includes('déjà existe') || err.includes('duplicate'))) {
            return {
              type: 'duplicate',
              message: 'Trajet déjà existant',
              details: 'Un trajet avec ces paramètres existe déjà'
            };
          }

          // Field validation errors
          const validationErrors = parseValidationErrors(errorData);
          if (validationErrors.length > 0) {
            return {
              type: 'validation',
              message: 'Erreurs de validation des données',
              details: validationErrors
            };
          }

          // Generic error message from serializer
          if (errorData.error || errorData.message_details) {
            return {
              type: 'validation',
              message: 'Données invalides',
              details: errorData.error || errorData.message_details
            };
          }
        }
        
        return {
          type: 'validation',
          message: 'Les données fournies sont invalides'
        };

      case 401: // Unauthorized
        return {
          type: 'network',
          message: 'Session expirée. Veuillez vous reconnecter.'
        };

      case 403: // Forbidden
        return {
          type: 'network',
          message: 'Vous n\'avez pas les permissions nécessaires pour cette action.'
        };

      case 404: // Not Found
        return {
          type: 'network',
          message: 'Service non disponible. Contactez l\'administrateur.'
        };

      case 429: // Too Many Requests (Nominatim rate limiting)
        return {
          type: 'geolocation',
          message: 'Trop de requêtes de géolocalisation. Attendez quelques secondes et réessayez.'
        };

      case 500: // Internal Server Error
        return {
          type: 'server',
          message: 'Erreur interne du serveur. Contactez l\'administrateur.'
        };

      case 502: // Bad Gateway
      case 503: // Service Unavailable
      case 504: // Gateway Timeout
        return {
          type: 'network',
          message: 'Service temporairement indisponible. Réessayez dans quelques minutes.'
        };

      default:
        return {
          type: 'unknown',
          message: `Erreur inattendue (${status}). Contactez l\'administrateur.`
        };
    }
  };

  const addTrajectory = async (trajectoryData: TrajectoryData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate required fields before sending request
      const requiredFields = [
        'nom_trajet',
        'objet_tracking_nom', 
        'source_nom',
        'date_prevu_source',
        'destination_nom',
        'date_prevu_destination'
      ];

      const missingFields = requiredFields.filter(field => 
        !trajectoryData[field as keyof TrajectoryData]
      );

      if (missingFields.length > 0) {
        setError({
          type: 'validation',
          message: 'Champs requis manquants',
          details: missingFields.map(field => ({
            field,
            message: 'Ce champ est requis'
          }))
        });
        return;
      }

      // Validate date logic
      const sourceDate = new Date(trajectoryData.date_prevu_source);
      const destDate = new Date(trajectoryData.date_prevu_destination);
      
      if (destDate <= sourceDate) {
        setError({
          type: 'validation',
          message: 'Dates invalides',
          details: 'La date de destination doit être postérieure à la date de départ'
        });
        return;
      }

      // Validate points order if any
      if (trajectoryData.points && trajectoryData.points.length > 0) {
        const orders = trajectoryData.points.map(p => p.ordre);
        const uniqueOrders = new Set(orders);
        
        if (uniqueOrders.size !== orders.length) {
          setError({
            type: 'validation',
            message: 'Ordre des points invalide',
            details: 'Chaque point doit avoir un ordre unique'
          });
          return;
        }
      }

      await apiClient.post('/captures/planifier-trajet/', trajectoryData);
      
      setSuccess('Trajet planifié avec succès');
      
    } catch (error: any) {
      const trajectoryError = determineErrorType(error);
      setError(trajectoryError);
      
      // Log error for debugging (you can remove this in production)
      console.error('Trajectory creation error:', {
        originalError: error,
        parsedError: trajectoryError,
        responseData: error.response?.data,
        status: error.response?.status
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  return {
    isLoading,
    error,
    success,
    addTrajectory,
    clearError,
    clearSuccess
  };
}