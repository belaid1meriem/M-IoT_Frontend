import type { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
  accessToken: string | null 
  setAccessToken: Dispatch<SetStateAction<string | null>>
}

export interface RefreshTokenResponse {
  access: string;
  refresh?: string;
}

export interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}