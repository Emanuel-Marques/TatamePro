import { login } from "./auth/login.api";
import { verifyToken } from "./auth/verifyToken";
import instructorsApi from "./instructors/instructors.api";

export default {
    login,
    verifyToken,
    instructorsApi,
}