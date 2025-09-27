import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ifcomunidade-backend.onrender.com/api',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    // Rotas públicas GET
    const isPublicGet =
      config.method === 'get' &&
      (config.url.includes('/postagens') ||
        config.url.includes('/usuarios') ||
        config.url.includes('/media/images/'));

    // Rotas públicas POST
    const isPublicPost =
      config.method === 'post' &&
      (config.url.includes('/media/images/') ||
        config.url.includes('token/') ||
        config.url.includes('usuarios/'));

    if (token && !(isPublicGet || isPublicPost)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const isPublicPost =
      originalRequest.method === 'post' &&
      (originalRequest.url.includes('/media/images/') ||
        originalRequest.url.includes('token/') ||
        originalRequest.url.includes('usuarios/'));

    const isPublicGet =
      originalRequest.method === 'get' &&
      (originalRequest.url.includes('/postagens') ||
        originalRequest.url.includes('/usuarios') ||
        originalRequest.url.includes('/media/images/'));

    // Só tenta refresh token se NÃO for rota pública
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !(isPublicGet || isPublicPost)
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('Refresh token não encontrado');

        const { data } = await axiosInstance.post('token/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = data.access;
        localStorage.setItem('token', newAccessToken);

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete axiosInstance.defaults.headers.common['Authorization'];
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
