import type { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
  accessToken: string | null 
  refreshToken: string | null
  setAccessToken: Dispatch<SetStateAction<string | null>>
  setRefreshToken: Dispatch<SetStateAction<string | null>>
}

