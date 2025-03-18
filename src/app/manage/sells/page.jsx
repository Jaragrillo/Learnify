'use client'

import IncomeBarChart from "@/components/charts/IncomeBarChart";
import IncomeChart from "@/components/charts/IncomeChart";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AdminSalesPage() {
  const [dashboardSalesData, setDashboardSalesData] = useState({
    ingresosTotales: 0,
    ventasDia: [],
    ventasSemana: [],
    ventasMes: [],
    ventasAnio: [],
    ventas: [],
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('/api/manage/sells');
        if (response.ok) {
          const data = await response.json();
          setDashboardSalesData(data);
        } else {
          console.error('Error al obtener datos de ventas');
        }
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
      }
    };

    fetchSalesData();
  }, []);

  const prepareChartData = (ventas) => {
    if (ventas.length === 0) {
      return { labels: [], datasets: [{ data: [] }] };
    }

    const labels = ventas.map(venta => venta.fecha);
    const data = ventas.map(venta => parseFloat(venta.ingresos));

    // Verificar los datos
    console.log("Chart Data:", { labels, data });

    return {
      labels: labels,
      datasets: [{ data: data }],
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(amount);
  };

  return (
    <>
      <main className="ml-80">
        <section className="pt-10 px-10">
          <div className="flex items-center gap-2">
            <Image 
                src="/svg/moneyDarkBlue.svg" 
                alt="moneyDarkBlue-svg" 
                width={50} 
                height={50} 
            />
            <h2 className="text-4xl text-[#0D1D5F]">Ventas</h2>
          </div>
        </section>
        <section className="p-10">
          <div className="flex justify-between">
            <div className="w-full border-2 border-[#0D1D5F] rounded-lg p-5">
              <h3 className="text-xl font-medium">Ingresos totales</h3>
              <p className="text-4xl font-medium my-3">{formatCurrency(dashboardSalesData.ingresosTotales)} COP</p>
            </div>
          </div>
        </section>
        <section className="px-10">
          <div>
            <h4 className="text-2xl font-medium text-[#0D1D5F] mb-10">Ingresos del Día</h4>
            <div>
              {dashboardSalesData.ventasDia.length > 0 ? (
                <IncomeBarChart data={prepareChartData(dashboardSalesData.ventasDia)} />
              ) : (
                <p>No se han realizado compras el día de hoy.</p>
              )}
            </div>
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
          <div>
            <h4 className="text-2xl font-medium text-[#0D1D5F] mb-10">Ingresos Semanales</h4>
            <div>
              {dashboardSalesData.ventasSemana.length > 0 ? (
                <IncomeChart data={prepareChartData(dashboardSalesData.ventasSemana)} />
              ) : (
                <p>No se han realizado compras esta semana.</p>
              )}
            </div>
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
          <div>
            <h4 className="text-2xl font-medium text-[#0D1D5F] mb-10">Ingresos Mensuales</h4>
            <div>
              {dashboardSalesData.ventasMes.length > 0 ? (
                <IncomeBarChart data={prepareChartData(dashboardSalesData.ventasMes)} />
              ) : (
                <p>No se han realizado compras este mes.</p>
              )}
            </div>
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
          <div>
            <h4 className="text-2xl font-medium text-[#0D1D5F] mb-10">Ingresos Año Hasta la Fecha</h4>
            <div>
              {dashboardSalesData.ventasAnio.length > 0 ? (
                <IncomeChart data={prepareChartData(dashboardSalesData.ventasAnio)} />
              ) : (
                <p>No se han realizado compras este año.</p>
              )}
            </div>
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
        </section>
        <section className="px-10 pb-10">
          <h3 className="text-2xl font-medium text-[#0D1D5F] mb-10">Ventas</h3>
          <div className="overflow-x-auto border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Venta</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardSalesData.ventas.map(venta => (
                  <tr key={venta.id_venta}>
                    <td className="px-6 py-4 whitespace-nowrap">{venta.id_venta}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{venta.id_curso}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{venta.id_autor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{venta.id_cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(venta.precio)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(venta.fecha_venta).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}