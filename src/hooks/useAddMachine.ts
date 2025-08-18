import type { Machine } from "@/types/Machine";
import { useState } from "react";
import useApiClient from "./auth/useApiClient";

export function useAddMachine() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const apiClient = useApiClient()

  /**
   * Add a new machine with provided data
   */
  const addMachine = async (machineData: Machine, clientId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.post("/machine/add-machine/?client_id="+clientId, machineData);
      setSuccess("Machine added successfully");
    } catch (error) {
      setError("Failed to add machine");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ******************TODO**************************
   * Upload a machine file (e.g. CSV, JSON, Image, etc.)
   */
  const uploadMachine = async (file: File): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await apiClient.post("/machines/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Machine uploaded successfully");
    } catch (error) {
      setError("Failed to upload machine");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    addMachine,
    uploadMachine,
  };
}
