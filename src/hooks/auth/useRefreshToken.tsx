// import { apiClient } from "@/api/apiClient"
// import { useAuth } from "@/contexts/AuthContext"

// const useRefreshToken = () => {
//   const {setAccessToken } = useAuth();

//   const refresh = async () => {
//     const response = await apiClient.post('/user/token/refresh/');
//     const accessToken  = response.data.access;
    
//     setAccessToken(accessToken);
    
//     return accessToken;
//   };

//   return refresh;
// };

// export default useRefreshToken


import { useAuth } from "@/contexts/AuthContext";
import type { RefreshTokenResponse } from "@/types/Auth";

const useRefreshToken = () => {
  const { setAccessToken } = useAuth();

  const refresh = async (): Promise<string> => {
    try {
      const response = await fetch('/user/token/refresh/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
      }

      const data: RefreshTokenResponse = await response.json();
      
      if (!data.access) {
        throw new Error('Invalid refresh response: missing access token');
      }

      const accessToken = data.access;
      setAccessToken(accessToken);
      
      return accessToken;
    } catch (error) {
      // Clear any existing token on refresh failure
      setAccessToken(null);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;