import User from "@/models/User.js"; // Asegúrate de que este modelo esté bien configurado

export default async function handler(req, res) {
  const {
    query: { id_usuario }, // Obtiene el ID de los parámetros de la URL
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        // Buscar usuario por ID
        const user = await User.findByPk(id_usuario);
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json({
          nombre: user.nombre,
          correo: user.correo,
          rol: user.id_usuario,
          // Otros campos que quieras incluir
        });
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).json({ message: "Error en el servidor" });
      }
    default:
      return res.status(405).json({ message: "Método no permitido" });
  }
}
