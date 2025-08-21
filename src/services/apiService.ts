import type { AxiosError } from 'axios';
import type { ApiResponse } from '../types/http';

export async function apiCall<T>(request: () => Promise<T>): Promise<ApiResponse<T>> {
  try {
    const data = await request();

    return { 
        success: true,
        data,
    };

  } catch (error) {
    const err = error as AxiosError;

    let message = 'An error occured, please try again!';

    if (err.response?.data && typeof err.response.data === 'object') {
      message = (err.response.data as any).message || JSON.stringify(err.response.data);
    } else if (err.message) {
      message = err.message;
    }

    return {
        success: false,
        error: message,
        status: err.response?.status,
    };

  }
}
