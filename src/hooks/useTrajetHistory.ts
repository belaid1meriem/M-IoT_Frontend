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


// Sample data
const sampleTrajetData: TrajetHistorique = {
  trajet_id: 1,
  nom_trajet: "Livraison Test",
  objet: {
    nom_objet: "colis_AD",
    etat_actuel: "recu"
  },
  trajet_info: {
    lieu_depart: "Alger",
    lieu_destination: "Oran",
    date_debut: "2025-08-18",
    date_fin_prevue: "2025-08-25",
    coordonnees_depart: {
      latitude: 36.7729333,
      longitude: 3.0588445
    },
    coordonnees_destination: {
      latitude: 35.7044415,
      longitude: -0.6502981
    }
  },
  position_actuelle: {
    lieu: "Chlef",
    date_derniere_maj: "2025-08-25",
    heure_derniere_maj: "00:00:00"
  },
  points_trajet: [
    {
      id: "source_1",
      type: "source",
      nom_lieu: "Alger",
      latitude: 36.7729333,
      longitude: 3.0588445,
      ordre: 0,
      date_prevu: "2025-08-18",
      date_entree: null,
      heure_entree: null,
      statut: "arrive",
      est_position_actuelle: false
    },
    {
      id: "point_1",
      type: "intermediate",
      nom_lieu: "Chlef",
      latitude: 36.20342,
      longitude: 1.2680696,
      ordre: 1,
      date_prevu: null,
      date_entree: null,
      heure_entree: null,
      statut: "arrive_en_retard",
      est_position_actuelle: false
    },
    {
      id: "destination_1",
      type: "destination",
      nom_lieu: "Oran",
      latitude: 35.7044415,
      longitude: -0.6502981,
      ordre: 2,
      date_prevu: "2025-08-25",
      date_entree: null,
      heure_entree: null,
      statut: "arrive",
      est_position_actuelle: true
    }
  ]
};

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