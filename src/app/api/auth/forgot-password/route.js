import { NextResponse } from 'next/server';
import { User } from '@/models/index'; 

export async function POST(req) {
    const { correo } = await req.json();

    try {
        // Verificar si el correo electrónico existe en la base de datos
        const user = await User.findOne({ where: { correo } });
        if (!user) {
            return NextResponse.json({ error: 'Correo electrónico no encontrado.' }, { status: 404 });
        }

        // Enviar correo electrónico con enlace de restablecimiento directo 
        const resetLink = `https://learnify-rho.vercel.app/reset-password/direct?correo=${correo}`; 

        return NextResponse.json({ message: 'Enlace de restablecimiento enviado por correo electrónico.', resetLink });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
    }
}