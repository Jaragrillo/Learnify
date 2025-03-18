import { NextResponse } from 'next/server';
import User from '@/models/User.js';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { nombre, apellidos, fecha_nacimiento, correo, contraseña } = await req.json();

    // Validaciones de los datos de entrada
    if (!nombre || nombre.trim().length === 0) {
        return NextResponse.json({ message: 'El nombre es obligatorio.' }, { status: 400 });
    }

    if (!apellidos || apellidos.trim().length === 0) {
        return NextResponse.json({ message: 'Los apellidos son obligatorios.' }, { status: 400 });
    }

    if (!fecha_nacimiento) {
        return NextResponse.json({ message: 'La fecha de nacimiento es obligatoria.' }, { status: 400 });
    }

    if (!correo || correo.trim().length === 0) {
        return NextResponse.json({ message: 'El correo electrónico es obligatorio.' }, { status: 400 });
    }

    if (!correo || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
        return NextResponse.json({ message: 'El correo electrónico no es válido.' }, { status: 400 });
    }

    if (!contraseña || contraseña.length < 8) {
        return NextResponse.json({
            message: 'La contraseña debe tener al menos 8 caracteres.',
        }, { status: 400 });
    }

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ where: { correo: correo } });
        if (existingUser) {
            return NextResponse.json({ message: 'El correo ya está registrado.' }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10); // 10 es el número de salt rounds

        // Crear nuevo usuario con rol de administrador (id_rol: 1)
        const newUser = await User.create({
            nombre: nombre,
            apellidos: apellidos,
            fecha_nacimiento: fecha_nacimiento,
            correo: correo,
            contraseña: hashedPassword,
            id_rol: 1, // Establece el rol de administrador
        });

        return NextResponse.json({ message: 'Administrador creado exitosamente.', user: newUser }, { status: 201 });
    } catch (error) {
        console.error('Error al crear el administrador:', error);
        return NextResponse.json({ message: 'Error al registrar el administrador.' }, { status: 500 });
    }
}