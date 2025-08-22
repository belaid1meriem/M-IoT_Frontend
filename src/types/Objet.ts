export interface Objet {
  site: number; // site ID (foreign key)
  num_serie: string;
  type: string; // e.g. "actif", "passif"
  date_install: string; // ISO date string (e.g. "2025-08-14")
}

export interface ObjetGET {
  id: number
  site: number; // site ID (foreign key)
  num_serie: string;
  type: string; // e.g. "actif", "passif"
  status: string;
  date_install: string; // ISO date string (e.g. "2025-08-14")
  date_dernier_serveillance: string | null
}
