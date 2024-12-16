import axios from "axios";

// Централизованная функция logout
export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Перенаправление на страницу логина
}

// Создаём экземпляр Axios
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
});

// Функция для обновления accessToken
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("Refresh token not found");
    }

    try {
        const response = await axios.post(
            "http://localhost:8080/auth/refresh",
            { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Обновляем accessToken и refreshToken в localStorage
        localStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
        }

        return accessToken;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error; // Пробрасываем ошибку выше для обработки в интерсепторе
    }
}

// Интерсептор запросов: добавление accessToken
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Интерсептор ответов: обновление токена при 401 и logout при ошибке
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();

                // Обновляем заголовок Authorization
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                // Повторяем оригинальный запрос
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Unable to refresh access token:", err);
                logout();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
