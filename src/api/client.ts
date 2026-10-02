import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const message =
        (typeof error.response?.data === 'object' &&
          error.response.data !== null &&
          'message' in error.response.data &&
          String(error.response.data.message)) ||
        error.message

      return Promise.reject(new Error(status ? `${status}: ${message}` : message))
    }

    return Promise.reject(error)
  },
)
