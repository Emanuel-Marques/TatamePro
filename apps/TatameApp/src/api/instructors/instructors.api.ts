import { InstrutorData } from "@/lib/data";
import api from "../axiosConfig";

const getAllInstructors = async () => {
  try {
    const response = await api.get("/professores/");
    return response.data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
  }
};

const createInstructor = async (data: Partial<InstrutorData>) => {
  try {
    const response = await api.post("/professores/cadastrar", data);
    return response.data;
  } catch (error) {
    console.error("Error creating instructor:", error);
  }
}

export default { getAllInstructors, createInstructor };
