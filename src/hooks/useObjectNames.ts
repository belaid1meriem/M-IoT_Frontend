import { useState, useEffect } from 'react';
import useApiClient from './auth/useApiClientSubDomain';

// Type for the object name response
export interface ObjectName {
  id: number;
  nom_objet: string;
  categorie: string;
  num_serie: string;
  etat: string;
  site_id: number;
}

// Hook return type
interface UseObjectNamesReturn {
  objectNames: ObjectName[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useObjectNames = (): UseObjectNamesReturn => {
  const [objectNames, setObjectNames] = useState<ObjectName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApiClient();

  const fetchObjectNames = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get('/captures/object-tracking-names/');
      setObjectNames(response.data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjectNames();
  }, []);

  const refetch = () => {
    fetchObjectNames();
  };

  return {
    objectNames,
    loading,
    error,
    refetch
  };
};
