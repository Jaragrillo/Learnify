import { NextResponse } from 'next/server';
import { Contact } from '@/models/index';

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        await Contact.destroy({
            where: {
                id_contacto: id
            }
        });

        return NextResponse.json({ message: 'Mensaje eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar mensaje:', error);
        return NextResponse.json({ message: 'Error al eliminar mensaje.' }, { status: 500 });
    }
}