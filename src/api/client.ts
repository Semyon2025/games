import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL
const needsCorsProxy = import.meta.env.PROD

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

if (needsCorsProxy) {
  // FreeToGame не отдаёт CORS-заголовки. На GitHub Pages нет своего прокси,
  // поэтому в проде заворачиваем запрос через публичный CORS proxy.
  apiClient.interceptors.request.use((config) => {
    const path = config.url ?? ''
    const query = config.params
      ? `?${new URLSearchParams(config.params as Record<string, string>).toString()}`
      : ''
    const target = new URL(`${path}${query}`, baseURL.endsWith('/') ? baseURL : `${baseURL}/`)
    config.baseURL = undefined
    config.params = undefined
    // corsproxy.io больше требует ключ; proxy.cors.dev для GET работает без регистрации
    config.url = `https://proxy.cors.dev/${target.toString()}`
    return config
  })
}

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
