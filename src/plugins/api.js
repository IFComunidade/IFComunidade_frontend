import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    const isPublicGet = config.method === 'get' && config.url.includes('/postagens')
    if (token && !isPublicGet) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('Refresh token não encontrado')
        }

        const { data } = await axiosInstance.post('token/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = data.access
        localStorage.setItem('token', newAccessToken)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete axiosInstance.defaults.headers.common['Authorization']
        window.location.href = '/Login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
