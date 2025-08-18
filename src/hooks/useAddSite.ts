import type { Site } from "@/types/Site";
import { useState } from "react";
import useApiClient from "./auth/useApiClient";

export function useAddSite() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const apiClient = useApiClient()

  /**
   * Add a new site with provided data
   */
  const addSite = async (siteData: Site, clientId: number): Promise<number | undefined> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response= await apiClient.post("/site/add-site/?client_id="+clientId, siteData);
      setSuccess("Site added successfully");
      return response.data.id || 1
    } catch (error) {
      setError("Failed to add site");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * **********************TODO**************************
   * Upload a site file (e.g. CSV, JSON, Image, etc.)
   */
  const uploadSite = async (file: File): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await apiClient.post("/sites/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Site uploaded successfully");
    } catch (error) {
      setError("Failed to upload site");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    addSite,
    uploadSite,
  };
}
