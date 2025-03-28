import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/models/index'; 

export async function PUT(req) {
    const { correo, contraseña } = await req.json();

    try {
        // Hashear la nueva contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Actualizar la contraseña en la base de datos
        await User.update({ contraseña: hashedPassword }, { where: { correo } });

        return NextResponse.json({ message: 'Contraseña restablecida correctamente.' });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
    }
}