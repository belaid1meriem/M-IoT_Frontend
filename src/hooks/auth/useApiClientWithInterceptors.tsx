// useApiClientWithInterceptors.ts (Generic hook)
import { useEffect, useRef, useCallback } from "react";
import type { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import type { QueuedRequest } from "@/types/Auth";

const useApiClientWithInterceptors = (apiClientInstance: AxiosInstance): AxiosInstance => {
    const refresh = useRefreshToken();
    const { accessToken, setAccessToken } = useAuth();
    const navigate = useNavigate();
    const isRefreshing = useRef<boolean>(false);
    const failedQueue = useRef<QueuedRequest[]>([]);

    const processQueue = useCallback((error: any, token: string | null = null): void => {
        failedQueue.current.forEach(({ resolve, reject }) => {
            if (error) {
                reject(error);
            } else if (token) {
                resolve(token);
            }
        });
        
        failedQueue.current = [];
    }, []);

    useEffect(() => {
        const requestIntercept = apiClientInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (accessToken && !config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, 
            (error: AxiosError) => Promise.reject(error)
        );

        const responseIntercept = apiClientInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const prevRequest = error?.config as InternalAxiosRequestConfig & { sent?: boolean };
                
                if (error?.response?.status === 401 && prevRequest && !prevRequest.sent) {
                    if (isRefreshing.current) {
                        // Queue the request while refresh is in progress
                        return new Promise<string>((resolve, reject) => {
                            failedQueue.current.push({ resolve, reject });
                        }).then((token: string) => {
                            prevRequest.headers['Authorization'] = `Bearer ${token}`;
                            return apiClientInstance(prevRequest);
                        }).catch((err: any) => {
                            return Promise.reject(err);
                        });
                    }

                    prevRequest.sent = true;
                    isRefreshing.current = true;

                    try {
                        const newAccessToken = await refresh();
                        
                        // Process all queued requests
                        processQueue(null, newAccessToken);
                        
                        // Retry the original request
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return apiClientInstance(prevRequest);
                        
                    } catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        
                        // Process queued requests with error
                        processQueue(refreshError, null);
                        
                        // Clear auth data and redirect
                        setAccessToken(null);
                        navigate('/auth/login');
                        
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing.current = false;
                    }
                }
                
                return Promise.reject(error);
            }
        );

        // Cleanup function to remove interceptors
        return () => {
            apiClientInstance.interceptors.request.eject(requestIntercept);
            apiClientInstance.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh, navigate, setAccessToken, processQueue, apiClientInstance]);

    return apiClientInstance;
};

export default useApiClientWithInterceptors;