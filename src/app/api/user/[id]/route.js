import User from "@/models/User.js";

export async function GET(request, { params }) {
  const { id } = await params; // Obtenemos el ID desde los parámetros de la URL

  if (!id) {
    return new Response(JSON.stringify({ message: "ID de usuario no proporcionado" }), { status: 400 });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return new Response(JSON.stringify({ message: "Usuario no encontrado" }), { status: 404 });
    }
    
    return new Response(
      JSON.stringify({
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
        fecha_nacimiento: user.fecha_nacimiento,
        contraseña: user.contraseña,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return new Response(
      JSON.stringify({ message: "Error en el servidor" }),
      { status: 500 }
    );
  }
}
