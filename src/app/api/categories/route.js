import Category from '@/models/Category.js'; 

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const categorias = await Category.findAll();
            res.status(200).json(categorias); // Respuesta con los datos de 'categorias'
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las categorías' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
