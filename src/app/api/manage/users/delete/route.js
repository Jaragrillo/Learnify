import { User } from '@/models/index';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID del usuario es requerido' }, { status: 400 });
    }

    try {
        const deletedUser = await User.destroy({
            where: { id_usuario: id },
        });

        if (deletedUser > 0) {
            return NextResponse.json({ message: 'Usuario eliminado correctamente' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}