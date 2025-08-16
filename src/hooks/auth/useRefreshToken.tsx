import axios from "@/api/apiClient"
import { useAuth } from "@/contexts/AuthContext"

const useRefreshToken = () => {
  const {setAccessToken } = useAuth();

  const refresh = async () => {
    const response = await axios.post('/user/token/refresh/', {}, {
      headers: {
        withCredentials: true
      }
    });
    const accessToken  = response.data.access;
    
    setAccessToken(accessToken);
    
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken