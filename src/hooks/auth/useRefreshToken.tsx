import axios from "@/api/apiClient"
import { useAuth } from "@/contexts/AuthContext"

const useRefreshToken = () => {
  const { refreshToken, setAccessToken } = useAuth();

  const refresh = async () => {
    if (!refreshToken) throw new Error('No refresh token');
    
    const response = await axios.post('/user/token/refresh/', { refresh : refreshToken });
    const accessToken  = response.data.access;
    
    setAccessToken(accessToken);
    
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken