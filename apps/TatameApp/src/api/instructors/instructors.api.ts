import api from "../axiosConfig";

const getAllInstructors = async () => {
  try {
    const response = await api.get("/professores/");
    return response.data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
  }
};

export default { getAllInstructors };
