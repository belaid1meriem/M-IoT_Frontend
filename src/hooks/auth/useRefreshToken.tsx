import { apiClient } from "@/api/apiClient"
import { useAuth } from "@/contexts/AuthContext"

const useRefreshToken = () => {
  const {setAccessToken } = useAuth();

  const refresh = async () => {
    const response = await apiClient.post('/user/token/refresh/');
    const accessToken  = response.data.access;
    
    setAccessToken(accessToken);
    
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken