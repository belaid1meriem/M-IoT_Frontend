import apiClient from "@/api/apiClient";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

const useApiClient = () => {
    const refresh = useRefreshToken();
    const { accessToken, setAccessToken } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {

        const requestIntercept = apiClient.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                  console.log(accessToken)
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

    const responseIntercept = apiClient.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          
            try {
              // Call refresh endpoint with refresh token in body
              const newAccessToken = await refresh()
              
              // Update tokens in context
              setAccessToken(newAccessToken);
              
              // Retry original request with new token
              prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              return apiClient(prevRequest);
              
            } catch (refreshError) {
              // Refresh failed, clear all auth data
              setAccessToken(null);
              
              // Redirect to login
              navigate('/auth/login')

              return Promise.reject(refreshError);
            }
          // } else {
          //   // No refresh token, redirect to login
          //   setAccessToken(null);
              
          //   // Redirect to login
          //   navigate('/auth/login')
          // }
        }
        
        return Promise.reject(error);
      }
    );

        return () => {
            apiClient.interceptors.request.eject(requestIntercept);
            apiClient.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh])

    return apiClient;
}

export default useApiClient;