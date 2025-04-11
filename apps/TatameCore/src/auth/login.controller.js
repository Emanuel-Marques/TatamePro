import authService from "./auth.service.js";

export async function login(req, res) {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }
  try {
    const token = await authService.login(email, senha);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
