import type { AuthContextType } from "@/types/Auth";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


export const AuthContext = createContext<AuthContextType | undefined >(undefined)

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    // const [refreshToken, setRefreshToken] = useState<string | null>(()=> localStorage.getItem('refreshToken'))

    // useEffect(()=>{
    //   if (refreshToken) {
    //     localStorage.setItem('refreshToken', refreshToken);
    //   } else {
    //     localStorage.removeItem('refreshToken');
    //   }
    // },[refreshToken])

    return(
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};