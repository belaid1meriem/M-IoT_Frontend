export interface Parametre {
  nom: string;
  unite: string;
  valeur_max: number;
}

export interface MachineCapture {
  num_serie: string;
  date_install: string; // ISO date string (e.g. "2025-08-13")
  parametre: Parametre[];
}

export interface Machine {
  site: number; // site ID (foreign key)
  identificateur: string;
  status: string; // e.g., "active", "inactive", "maintenance"
  date_installation: string; // ISO datetime string (e.g. "2025-08-13T10:00:00Z")
  captures: MachineCapture[];
}
