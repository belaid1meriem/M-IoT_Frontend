export type Client = {
  id: number
  client: string
  industrie: string
  adresse: string
  email: string
}

export interface ClientDetailsData {
  nom_entreprise: string;
  industrie: string;
  adresse: string;
  status: string;
  telephone: string;
  email: string;
  created_at: string;
  sites: {
    id: number,
    nom: string
  }[];
}
