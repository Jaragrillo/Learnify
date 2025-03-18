// pages/api/manage/users.js
import { NextResponse } from 'next/server';
import { User } from '@/models/index'; 

export async function GET(req) {
    try {
        const usuarios = await User.findAll();

        return NextResponse.json(usuarios);
    } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
        return NextResponse.json({ error: 'Error al obtener datos de usuarios' }, { status: 500 });
    }
}