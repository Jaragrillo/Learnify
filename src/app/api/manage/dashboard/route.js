import { User, Sale } from '@/models/index';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
    try {
        // Obtener el total de ingresos y el número total de usuarios
        const totalIncomes = await Sale.sum('precio');
        const totalUsers = await User.count();

        // Obtener datos de ventas 
        const salesData = await Sale.findAll({
            attributes: ['precio', 'fecha_venta'],
            order: [['id_venta', 'ASC']], // Ordenar por ID de venta ascendente
        });

        // Preparar los datos para el gráfico
        const chartData = {
            labels: salesData.map(sale => {
                if (sale.fecha_venta) {
                    const date = new Date(sale.fecha_venta); // Convertir a objeto Date
                    return date.toISOString().split('T')[0]; // Usar solo la fecha
                } else {
                    return 'Fecha no disponible'; // Manejar fechas nulas o indefinidas
                }
            }),
            values: salesData.map(sale => parseFloat(sale.precio) || 0), // Convertir a número
        };

        // Preparar los datos para el dashboard
        const dashboardData = {
            incomes: totalIncomes || 0, // Asegurar que sea 0 si no hay ingresos
            users: totalUsers,
            salesChartData: chartData,
        };
        console.log("Sales Chart Data:", chartData);

        

        return NextResponse.json(dashboardData);
    } catch (error) {
        console.error('Error al obtener datos del dashboard:', error);
        return NextResponse.json({ message: 'Error al obtener datos del dashboard' }, { status: 500 });
    }
}