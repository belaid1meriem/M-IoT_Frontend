import type { Capture } from "./Site";

export interface Machine {
  site: number; // site ID (foreign key)
  identificateur: string;
  status: string; // e.g., "active", "inactive", "maintenance"
  date_installation: string; // ISO datetime string (e.g. "2025-08-13T10:00:00Z")
  captures: Capture[];
}

export interface MachineGET {
  site: number; // site ID (foreign key)
  identificateur: string;
  status: string; // e.g., "active", "inactive", "maintenance"
  date_dernier_serv: string; // ISO datetime string (e.g. "2025-08-13T10:00:00Z")
  captures: Capture[];
}
