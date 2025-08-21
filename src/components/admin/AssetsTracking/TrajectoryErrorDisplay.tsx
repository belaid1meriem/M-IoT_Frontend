import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Wifi, MapPin, Copy, Server, AlertTriangle } from 'lucide-react';
import type {TrajectoryError, ValidationError} from '@/hooks/useAddTrajectory'


interface TrajectoryErrorDisplayProps {
  error: TrajectoryError | null;
  onDismiss?: () => void;
}

export const TrajectoryErrorDisplay: React.FC<TrajectoryErrorDisplayProps> = ({ 
  error, 
  onDismiss 
}) => {
  if (!error) return null;

  // Get appropriate icon based on error type
  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'network':
        return <Wifi className="h-4 w-4" />;
      case 'geolocation':
        return <MapPin className="h-4 w-4" />;
      case 'object_not_found':
        return <AlertTriangle className="h-4 w-4" />;
      case 'duplicate':
        return <Copy className="h-4 w-4" />;
      case 'server':
        return <Server className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Get appropriate variant based on error type
  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'network':
      case 'server':
        return 'destructive' as const;
      case 'validation':
      case 'geolocation':
      case 'object_not_found':
      case 'duplicate':
        return 'destructive' as const;
      default:
        return 'destructive' as const;
    }
  };

  // Render validation errors list
  const renderValidationErrors = (details: ValidationError[]) => {
    return (
      <ul className="mt-2 space-y-1 text-sm">
        {details.map((validationError, index) => (
          <li key={index} className="flex flex-col">
            <span className="font-medium capitalize">
              {validationError.field.replace(/_/g, ' ')}:
            </span>
            <span className="text-muted-foreground ml-2">
              {validationError.message}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  // Render string details
  const renderStringDetails = (details: string) => {
    return (
      <div className="mt-2 text-sm text-muted-foreground">
        {details}
      </div>
    );
  };

  // Render error details based on type
  const renderErrorDetails = () => {
    if (!error.details) return null;

    if (Array.isArray(error.details)) {
      return renderValidationErrors(error.details);
    }

    if (typeof error.details === 'string') {
      return renderStringDetails(error.details);
    }

    return null;
  };

  return (
    <Alert 
      variant={getAlertVariant(error.type)} 
      className="mb-4"
    >
      {getErrorIcon(error.type)}
      <AlertTitle className="flex items-center justify-between">
        {error.message}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 rounded-full p-1 hover:bg-background/20 transition-colors"
            aria-label="Fermer l'erreur"
          >
            <AlertCircle className="h-4 w-4 rotate-45" />
          </button>
        )}
      </AlertTitle>
      
      {error.details && (
        <AlertDescription>
          {renderErrorDetails()}
        </AlertDescription>
      )}
      
      {error.field && !error.details && (
        <AlertDescription>
          <span className="font-medium">Champ concerné:</span> {error.field}
        </AlertDescription>
      )}
    </Alert>
  );
};