import bcrypt from "bcryptjs";
import User from "@/models/User.js";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return new Response("ID no proporcionado", { status: 400 });
    }
    
    // Parseamos el body de la solicitud
    // const { id_usuario } = req.query;
    const { nombre, apellidos, correo, fecha_nacimiento, biografia, foto_perfil, currentlyPassword, newPassword } = await req.json();

     console.log("Datos recibidos:", {  nombre, apellidos, correo, fecha_nacimiento, biografia, foto_perfil });

    // Validación de datos obligatorios
    // if (!id_usuario || !nombre || !apellidos || !correo || !fecha_nacimiento) {
    //   return new Response(JSON.stringify({ error: "Todos los campos son obligatorios." }), { status: 400 });
    // }

    // Buscamos al usuario en la base de datos
    const user = await User.findByPk(id);
    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado." }), { status: 404 });
    }

    // Validar contraseña actual si se proporciona una nueva contraseña
    if (newPassword) {
      if (!currentlyPassword) {
        return new Response(JSON.stringify({ error: "Debe proporcionar la contraseña actual para cambiarla." }), { status: 400 });
      }

      const isPasswordValid = await bcrypt.compare(currentlyPassword, user.password);
      if (!isPasswordValid) {
        return new Response(JSON.stringify({ error: "La contraseña actual es incorrecta." }), { status: 403 });
      }

      // Encriptar la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Actualizar los campos del usuario
    user.nombre = nombre;
    user.apellidos = apellidos;
    user.correo = correo;
    user.fecha_nacimiento = fecha_nacimiento;
    user.foto_perfil = foto_perfil || user.foto_perfil; // Mantener foto previa si no se actualiza
    user.biografia = biografia;

    // Guardar los cambios
    await user.save();

    return new Response(JSON.stringify({ message: "Perfil actualizado correctamente." }), { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}
