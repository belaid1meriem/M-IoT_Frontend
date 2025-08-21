export interface TrajectoryPoint {
  nom_lieu: string;
  latitude?: number;
  longitude?: number;
  ordre: number;
  date_prevu: string;
}

export interface TrajectoryFormData {
  nom_trajet: string;
  objet_tracking_nom: string;
  source_nom: string;
  source_latitude?: number | string;
  source_longitude?: number | string;
  date_prevu_source: string;
  destination_nom: string;
  destination_latitude?: number | string;
  destination_longitude?: number | string;
  date_prevu_destination: string;
  points: Array<{
    nom_lieu: string;
    latitude?: number | string;
    longitude?: number | string;
    ordre: number;
    date_prevu: string;
  }>;
}

export interface TrajectoryApiData {
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