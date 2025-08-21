import type { User } from "@/types/User";
import { useState } from "react";
import useApiClient from "./auth/useApiClient";

export function useAddUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const apiClient = useApiClient()
  
  /**
   * Add a new user with provided data
   */
  const addUser = async (userData: User, clientId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.post("/clientUsers/add-clientuser/?client_id="+clientId, userData);
      setSuccess("User added successfully");
    } catch (error) {
      setError("Failed to add user");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Upload a user file (bulk import, e.g. CSV or JSON)
   */
  const uploadUser = async (file: File, clientId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await apiClient.post("/clientUsers/upload-clientuser/?client_id="+clientId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Users uploaded successfully");
    } catch (error) {
      setError("Failed to upload users");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    addUser,
    uploadUser,
  };
}
