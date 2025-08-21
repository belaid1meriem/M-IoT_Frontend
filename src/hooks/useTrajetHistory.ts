import { useState, useEffect } from 'react';
import useApiClient from './auth/useApiClientSubDomain';

// Type definitions for trajectory history
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TrajetPoint {
  id: string;
  type: 'source' | 'intermediate' | 'destination';
  nom_lieu: string;
  latitude: number;
  longitude: number;
  ordre: number;
  date_prevu: string | null;
  date_entree: string | null;
  heure_entree: string | null;
  statut: "arrive" | "arrive_en_retard" | "en_attente" | "position_actuelle";
  est_position_actuelle: boolean;
}

export interface TrajetInfo {
  lieu_depart: string;
  lieu_destination: string;
  date_debut: string;
  date_fin_prevue: string;
  coordonnees_depart: Coordinates;
  coordonnees_destination: Coordinates;
}

export interface PositionActuelle {
  lieu: string;
  date_derniere_maj: string;
  heure_derniere_maj: string;
}

export interface Objet {
  nom_objet: string;
  etat_actuel: string;
}

export interface TrajetHistorique {
  trajet_id: number;
  nom_trajet: string;
  objet: Objet;
  trajet_info: TrajetInfo;
  position_actuelle: PositionActuelle;
  points_trajet: TrajetPoint[];
}


interface UseTrajetHistoriqueReturn {
  trajetData: TrajetHistorique | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useTrajetHistory = (trajetId: number): UseTrajetHistoriqueReturn => {
  const [trajetData, setTrajetData] = useState<TrajetHistorique | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApiClient()

  const fetchTrajetData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get('/captures/trajet-historique/'+trajetId+'/')
      setTrajetData(response.data);
      // setTrajetData(sampleTrajetData)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrajetData();
  }, [trajetId]);

  const refetch = () => {
    fetchTrajetData();
  };

  return {
    trajetData,
    loading,
    error,
    refetch
  };
};

// Utility functions for status handling
export const getStatusColor = (statut: string) => {
  switch (statut) {
    case 'arrive':
      return 'bg-green-100 text-green-800';
    case 'en_retard':
      return 'bg-red-100 text-red-800';
    case 'en_attente':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (statut: string) => {
  switch (statut) {
    case 'arrive':
      return 'Arrivé';
    case 'en_retard':
      return 'En retard';
    case 'en_attente':
      return 'En attente';
    default:
      return 'Inconnu';
  }
};

export const getPointTypeText = (type: string) => {
  switch (type) {
    case 'source':
      return 'Départ';
    case 'destination':
      return 'Arrivé à temps';
    case 'intermediate':
      return 'Point intermédiaire';
    default:
      return type;
  }
};