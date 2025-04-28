import api from "../axiosConfig";

const getAllUsers = async () => {
  try {
    const response = await api.get("/utilizadores/");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};


export default { getAllUsers };