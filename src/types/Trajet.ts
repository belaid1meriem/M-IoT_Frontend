export interface Trajet {
  id: number;
  nom_trajet: string;
  objet_nom: string;
  capteur_num_serie: string;
  etat_objet: "recu" | "en_transit" | "stocke" | "perdu" | "reçu"; 
  localisation_actuelle: string;
  latitude_actuelle: number;
  longitude_actuelle: number;
  derniere_mise_a_jour: string;
  heure_derniere_mise_a_jour: string; 
}