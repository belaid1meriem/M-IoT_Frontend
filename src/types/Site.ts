export interface Parametre {
  nom: string;
  unite: string;
  valeur_max: number;
}

export interface Capture {
  num_serie: string;
  date_install: string; // ISO date string (e.g., "2025-08-09")
  parametres: Parametre[];
}

export interface Site {
  nom: string;
  adresse: string;
  latitude: number;
  longitude: number;
  asset_tracking: boolean;
  captures: Capture[];
}