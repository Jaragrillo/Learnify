import Category from '@/models/Category.js';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const categorias = await Category.findAll();
        return NextResponse.json(categorias);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return NextResponse.json({ error: 'Error al obtener las categorías' }, { status: 500 });
    }
}