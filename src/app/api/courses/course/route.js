import { NextResponse } from 'next/server';
import Course from '@/models/Course.js';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { SECRET_KEY } from '../../auth/login/route';

export async function POST(req) {
    const cookieStore = cookies(); // Obtiene el almacén de cookies
    const token = await cookieStore.get('auth-token')?.value; // Obtiene el valor del token

    if (!token) {
        return NextResponse.json({ message: 'No autenticado.' }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;

    const formData = await req.formData(); // Usamos formData para manejar archivos

    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const price = formData.get('price');
    const coverImage = formData.get('coverImage');
    
    // Validaciones de los datos de entrada
    if (!title || title.trim().length === 0) {
        return NextResponse.json({ message: 'El título es obligatorio.' }, { status: 400 });
    }

    if (!description || description.trim().length === 0) {
        return NextResponse.json({ message: 'La descripción es obligatoria.' }, { status: 400 });
    }

    if (!category) {
        return NextResponse.json({ message: 'La categoría es obligatoria.' }, { status: 400 });
    }

    if (!price || parseFloat(price) <= 0) {
        return NextResponse.json({ message: 'El precio debe ser mayor a 0.' }, { status: 400 });
    }

    if (!coverImage || coverImage.size === 0) {
        return NextResponse.json({ message: 'La portada es obligatoria.' }, { status: 400 });
    }

    try {
        // Crear nuevo curso
        const newCourse = await Course.create({
            titulo: title,
            descripcion: description,
            id_categoria: category,
            precio: price,
            img_portada: coverImage, 
            id_autor: userId, 
        });

        return NextResponse.json({ message: 'Curso creado exitosamente.', course: newCourse }, { status: 201 });
    } catch (error) {
        console.error('Error al crear el curso:', error);
        return NextResponse.json({ message: 'Error al crear el curso.' }, { status: 500 });
    }
}