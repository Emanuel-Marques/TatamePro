import api from "@/api/axiosConfig";
import { AxiosResponseType } from "@/lib/axiosTypes";
const login = async (data: unknown) => {
    try {
        const response = await api.post(
            "/auth/login",
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const token = response.data.token;
        return { data: token }; 
    } catch (error) {
        const { response } = error as AxiosResponseType;
        return {error: response.data.message};
    }
    
}

export { login };