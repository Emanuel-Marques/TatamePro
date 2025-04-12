import api from "../axiosConfig";

export const verifyToken = async () => {
    try {
        const response = await api.get("/auth/verifyToken");
        return response.data;
    } catch (error) {
        return { valid: false };
    }
}