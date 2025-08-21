import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Play, CheckCircle, Clock, MapPin, Target, AlertTriangle } from 'lucide-react'
import type { TrajetHistorique, TrajetPoint } from '@/hooks/useTrajetHistory';

export interface HistoryCardProps {
  trajetData: TrajetHistorique;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ trajetData }) => {
  // Default data if none provided
  const defaultTrajetData: TrajetHistorique = {
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
      lieu: "Oran",
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
        statut: "arrive" as const,
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
        statut: "en_attente" as const,
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
        statut: "arrive" as const,
        est_position_actuelle: true
      }
    ]
  };

  const data = trajetData || defaultTrajetData;

  // Helper functions with proper typing
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

  const formatTime = (timeStr: string | null): string => {
    if (!timeStr) return '00:00';
    return timeStr.substring(0, 5);
  };

  const getStatusIcon = (point: TrajetPoint) => {
    const iconClass = "w-3 h-3";

    if (point.type === 'destination') {
      if (point.statut === 'arrive') {
        return (
          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
            <MapPin className={`${iconClass} text-purple-600 `} />
          </div>
        );
      } else {
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
            <MapPin className={`${iconClass} text-yellow-600`} />
          </div>
        );
      }
    }

    if (point.est_position_actuelle) {
      return (
        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
          <MapPin className={`${iconClass} text-purple-600`} />
        </div>
      );
    }
    
    if (point.type === 'source') {
      return (
        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
          <div className={`w-2 h-2 bg-green-600 rounded-full`} />
        </div>
      );
    }
    
    if (point.type === 'intermediate') {
      if (point.statut === 'arrive') {
        return (
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <div className={`w-2 h-2 bg-green-600 rounded-full`} />
          </div>
        );
      } else if (point.statut === 'arrive_en_retard') {
        return (
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className={`${iconClass} text-red-600`} />
          </div>
        );
      } else {
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock className={`${iconClass} text-yellow-600`} />
          </div>
        );
      }
    }
    
    return (
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
        <Clock className={`${iconClass} text-muted-foreground`} />
      </div>
    );
  };

  const getTextColor = (point: TrajetPoint): string => {
    if (point.est_position_actuelle) return 'text-gray-600';
    if (point.statut === 'arrive') return 'text-green-500';
    if (point.statut === 'arrive_en_retard') return 'text-red-500';
    if (point.statut === 'en_attente') return 'text-muted-foreground';
    return 'text-muted-foreground';
  };

  const getStatusText = (point: TrajetPoint): string => {
    if (point.type === 'source') return 'Départ';
    if (point.type === 'destination' && point.statut === 'en_attente') return 'Destination finale, en Attente';
    if (point.type === 'destination' && point.statut === 'arrive') return 'Destination finale, Arrivé';
    if (point.type === 'destination' && point.statut === 'arrive_en_retard') return 'Destination finale, Arrivé en Retard';
    if (point.est_position_actuelle) return 'Position actuelle';
    if (point.statut === 'arrive') return  'Arrivé à temps';
    if (point.statut === 'arrive_en_retard') return  'Arrivé en Retard';
    if (point.statut === 'en_attente') return 'En Attente';
    return point.statut;
  };

  const getDescription = (point: TrajetPoint): string => {
    if (point.statut === 'en_attente') {
      const date = point.date_prevu ;
      return `Programmé le ${formatDate(date)}`;
    }
    if (point.statut === 'arrive_en_retard') {
      const date = point.date_prevu ;
      return `L'Arrivé  était prévu le ${formatDate(date)}`;
    }
    return '' ;
  };

  const renderTimeInfo = (point: TrajetPoint) => {
    const hasTimeInfo = point.date_prevu || point.est_position_actuelle;
    
    if (!hasTimeInfo) {
      return <div className="text-muted-foreground text-xs">-</div>;
    }

    if (point.statut==='en_attente') {
      return <div className="text-muted-foreground text-xs"></div>;
    }

    const displayDate = point.date_prevu || data.position_actuelle.date_derniere_maj;
    const displayTime = point.heure_entree || data.position_actuelle.heure_derniere_maj;

    return (
      <>
        <div className={`text-xs font-medium ${getTextColor(point)}`}>
          {formatDate(displayDate)}
        </div>
        <div className={`text-xs ${getTextColor(point)}`}>
          {formatTime(displayTime)}
        </div>
      </>
    );
  };

  return (
    <Card className="border border-gray-200 rounded-lg absolute top-0 left-0 z-30 max-h-full w-md overflow-auto">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground tracking-wide">
              {data.objet.nom_objet}
            </span>
            <Badge variant="outline">
              {data.objet.etat_actuel}
            </Badge>
          </div>
          <h2 className="text-lg font-semibold mb-3">{data.nom_trajet}</h2>
          <div className="flex items-center gap-3 w-fit text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{data.trajet_info.date_debut}</span>
            <span>→</span>
            <span>{data.trajet_info.date_fin_prevue}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-2">
          {data.points_trajet
            .sort((a, b) => a.ordre - b.ordre)
            .map((point, idx, arr) => (
              <div
                key={point.id}
                className="grid grid-cols-[1.5rem_1fr] gap-3"
              >
                <div className="relative flex justify-center pb-16 last:pb-0">
                  {getStatusIcon(point)}

                  {idx < arr.length - 1 && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 top-6 bottom-0 w-px bg-muted"
                    />
                  )}
                </div>

                <div className="pb-6 last:pb-0">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col items-start justify-start gap-0.5">
                      <h4 className="font-semibold">{getStatusText(point)}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {point.nom_lieu}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {getDescription(point)}
                      </p>
                  </div>
                    <div className="text-right text-muted-foreground">
                      {renderTimeInfo(point)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;