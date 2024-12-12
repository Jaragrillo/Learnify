import { NextResponse } from 'next/server';
import { sequelize } from '../../../../lib/db.js'; 
import User from '../../../../models/User.js'; 

export async function POST(req) {
  const { name, lastName, dateOfBirth, email, password } = await req.json();

  // Validaciones de los datos de entrada
  if (!name || name.trim().length === 0) {
    return NextResponse.json({ message: 'El nombre es obligatorio.' }, { status: 400 });
  }

  if (!lastName || lastName.trim().length === 0) {
    return NextResponse.json({ message: 'Los apellidos son obligatorios.' }, { status: 400 });
  }

  if (!dateOfBirth) {
    return NextResponse.json({ message: 'La fecha de nacimiento es obligatoria.' }, { status: 400 });
  }

  if (!email || email.trim().length === 0) {
    return NextResponse.json({ message: 'La correo electrónico es obligatorio.' }, { status: 400 });
  }

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ message: 'El correo electrónico no es válido.' }, { status: 400 });
  }

  if (!password || password.length < 8) {
    return NextResponse.json({
      message: 'La contraseña debe tener al menos 8 caracteres.',
    }, { status: 400 });
  }

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { correo: email } });
    if (existingUser) {
      return NextResponse.json({ message: 'El correo ya está registrado.' }, { status: 400 });
    }

    // Crear nuevo usuario
    const newUser = await User.create({
      nombre: name,
      apellidos: lastName,
      fecha_nacimiento: dateOfBirth,
      correo: email,
      contraseña: password,
      id_rol: 2, // Establece un rol por defecto
    });

    return NextResponse.json({ message: 'Usuario creado exitosamente.', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return NextResponse.json({ message: 'Error al registrar el usuario.' }, { status: 500 });
  }
}
