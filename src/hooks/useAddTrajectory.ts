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

export function useAddTrajectory() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const apiClient = useApiClient();

  const addTrajectory = async (trajectoryData: TrajectoryData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.post('/planifier-trajet/', trajectoryData);
      setSuccess('Trajet planifié avec succès');
    } catch (error: any) {
      // Handle different error responses
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.data?.message_details) {
        setError(error.response.data.message_details);
      } else {
        setError('Erreur lors de la planification du trajet');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    addTrajectory
  };
}