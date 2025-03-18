import { NextResponse } from 'next/server';
import { Sale } from '@/models/index';

export async function GET(req) {
    try {
        const ventas = await Sale.findAll();

        const ingresosTotales = ventas.reduce((total, venta) => total + parseFloat(venta.precio), 0);

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
                grupos[clave].ingresos += parseFloat(venta.precio);
            });
            return Object.values(grupos);
        };

        // Ventas del día actual
        const hoy = new Date().toISOString().split('T')[0];
        const ventasDia = agruparVentas(ventas.filter(venta => new Date(venta.fecha_venta).toISOString().split('T')[0] === hoy), 'dia');

        // Ventas de la semana actual (de lunes a domingo)
        const ahora = new Date();
        const inicioSemana = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - ahora.getDay() + (ahora.getDay() === 0 ? -6 : 1));
        const finSemana = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - ahora.getDay() + (ahora.getDay() === 0 ? 0 : 7));
        const ventasSemana = agruparVentas(ventas.filter(venta => new Date(venta.fecha_venta) >= inicioSemana && new Date(venta.fecha_venta) <= finSemana), 'dia');

        // Ventas del mes actual
        const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0);
        const ventasMes = agruparVentas(ventas.filter(venta => new Date(venta.fecha_venta) >= inicioMes && new Date(venta.fecha_venta) <= finMes), 'mes');

        // Ventas del año actual, agrupadas por mes (con todos los meses)
        const inicioAnio = new Date(ahora.getFullYear(), 0, 1);
        const finAnio = new Date(ahora.getFullYear(), 11, 31);
        const ventasAnioFiltradas = ventas.filter(venta => new Date(venta.fecha_venta) >= inicioAnio && new Date(venta.fecha_venta) <= finAnio);
        const ventasAnioAgrupadas = agruparVentas(ventasAnioFiltradas, 'mes');

        // Crear un arreglo con todos los meses del año
        const mesesAnio = Array.from({ length: 12 }, (_, i) => {
            const fecha = new Date(ahora.getFullYear(), i, 1);
            const clave = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;
            const mesEncontrado = ventasAnioAgrupadas.find(venta => venta.fecha === clave);
            return mesEncontrado || { ingresos: 0, fecha: clave };
        });

        return NextResponse.json({
            ingresosTotales,
            ventasDia,
            ventasSemana,
            ventasMes,
            ventasAnio: mesesAnio,
            ventas,
        });
    } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
        return NextResponse.json({ error: 'Error al obtener datos de ventas' }, { status: 500 });
    }
}