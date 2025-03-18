import { NextResponse } from 'next/server';
import { Sale } from '@/models/index'; // Ajusta la ruta si es necesario

export async function GET(req) {
    try {
        const ventas = await Sale.findAll();

        const ingresosTotales = ventas.reduce((total, venta) => total + venta.precio, 0);

        const agruparVentas = (ventas, periodo) => {
            const grupos = {};
            ventas.forEach(venta => {
                const fecha = new Date(venta.fecha_venta);
                let clave;

                switch (periodo) {
                    case 'dia': clave = fecha.toISOString().split('T')[0]; break;
                    case 'semana':
                        const inicioSemana = new Date(fecha);
                        inicioSemana.setDate(fecha.getDate() - fecha.getDay());
                        clave = inicioSemana.toISOString().split('T')[0];
                        break;
                    case 'mes': clave = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`; break;
                    case 'anio': clave = fecha.getFullYear(); break;
                    default: clave = fecha.toISOString().split('T')[0];
                }

                if (!grupos[clave]) grupos[clave] = { ingresos: 0, fecha: clave };
                grupos[clave].ingresos += venta.precio;
            });
            return Object.values(grupos);
        };

        const ventasDia = agruparVentas(ventas, 'dia');
        const ventasSemana = agruparVentas(ventas, 'semana');
        const ventasMes = agruparVentas(ventas, 'mes');
        const ventasAnio = agruparVentas(ventas, 'anio');

        return NextResponse.json({
            ingresosTotales,
            ventasDia,
            ventasSemana,
            ventasMes,
            ventasAnio,
            ventas,
        });
    } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
        return NextResponse.json({ error: 'Error al obtener datos de ventas' }, { status: 500 });
    }
}