// src/app/api/contact/route.js
import { NextResponse } from 'next/server';
import { Contact } from '@/models/index'; // Ajusta la ruta a tus modelos

export async function POST(req) {
    try {
        const { nombre, apellidos, correo, tipo_consulta, mensaje } = await req.json();

        if (!nombre || !apellidos || !correo || !tipo_consulta || !mensaje) {
            return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
        }

        const newContact = await Contact.create({
            nombre,
            apellidos,
            correo,
            tipo_consulta,
            mensaje,
        });

        return NextResponse.json({ message: "Mensaje enviado correctamente.", contact: newContact }, { status: 201 });
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
    }
}