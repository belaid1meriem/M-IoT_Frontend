export type Client = {
  id: number
  client: string
  industrie: string
  adresse: string
  email: string
}

export interface ClientDetailsData {
  client: string;
  industrie: string;
  description: string;
  adresse: string;
  etat: string;
  telephone: string;
  email: string;
  dateAjout: string;
  sites: string[];
}
