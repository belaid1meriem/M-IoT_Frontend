import type { Objet } from "@/types/Objet";
import { useState } from "react";
import useApiClient from "./auth/useApiClient";

export function useAddObject() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const apiClient = useApiClient()
  /**
   * Add a new object with provided data
   */
  const addObject = async (objectData: Objet, clientId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.post("/captures/add-tag-rfid/?client_id="+clientId, objectData);
      setSuccess("Object added successfully");
    } catch (error) {
      setError("Failed to add object");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Upload an object file (e.g. CSV, JSON, Image, etc.)
   */
  const uploadObject = async (file: File, siteId: number, clientId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("site", siteId.toString());

      await apiClient.post("/captures/upload-tag-rfid/?client_id="+clientId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Object uploaded successfully");
    } catch (error) {
      setError("Failed to upload object");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    addObject,
    uploadObject,
  };
}
