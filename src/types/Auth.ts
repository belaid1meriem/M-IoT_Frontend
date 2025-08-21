import type { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
  accessToken: string | null 
  setAccessToken: Dispatch<SetStateAction<string | null>>
}

