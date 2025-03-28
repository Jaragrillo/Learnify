'use client'

import IncomeBarChart from "@/components/charts/IncomeBarChart";
import IncomeChart from "@/components/charts/IncomeChart";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import * as XLSX from 'xlsx';

export default function AdminSalesPage() {
  const [dashboardSalesData, setDashboardSalesData] = useState({
    ingresosTotales: 0,
    ventasDia: [],
    ventasSemana: [],
    ventasMes: [],
    ventasAnio: [],
    ventas: [],
  });
  // Estados para manejar la paginación
  const [currentPageSales, setCurrentPageSales] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  // Función para crear el excel de las ventas
  const handleDownloadSalesReport = () => {
    const ventas = dashboardSalesData.ventas.map(venta => ({
      ID: venta.id_venta,
      Curso: venta.Course.titulo,
      Autor: `${venta.Autor.nombre} ${venta.Autor.apellidos}`,
      Cliente: `${venta.Cliente.nombre} ${venta.Cliente.apellidos}`,
      Precio: formatCurrency(venta.precio),
      'Fecha Venta': new Date(venta.fecha_venta).toLocaleDateString(),
    }));

    // Obtener la fecha actual
    const fechaDescarga = new Date().toLocaleDateString();

    // Crear el encabezado del informe
    const headerInforme = [[`Informe de Ventas hasta ${fechaDescarga}`]];

    // Crear el encabezado de las columnas
    const headerColumnas = Object.keys(ventas[0]);

    // Combinar el encabezado del informe y el encabezado de las columnas con los datos
    const data = [headerColumnas, ...ventas.map(venta => Object.values(venta))];

    // Crear la hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, headerInforme, { origin: 'A1' }); // Añadir el encabezado del informe
    XLSX.utils.sheet_add_aoa(worksheet, data, { origin: 'A2' }); // Añadir el encabezado de las columnas y los datos

    // Unir las celdas del encabezado del informe
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Unir desde A1 hasta F1
    ];

    // Crear el libro de Excel y descargar el archivo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');
    XLSX.writeFile(workbook, `Informe_Ventas_${fechaDescarga.replace(/\//g, '-')}.xlsx`);
  };

  // Funciones para manejar la paginación de la tabla de ventas
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setItemsPerPage(window.innerWidth < 640 ? 5 : 10);
      };

      handleResize(); // Establecer el valor inicial

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Función para cambiar de página
  const handlePageChangeSales = (pageNumber) => {
    setCurrentPageSales(pageNumber);
  };

  // Cálculo de los datos a mostrar en cada página
  const currentSales = useMemo(() => {
    const startIndex = (currentPageSales - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dashboardSalesData.ventas.slice(startIndex, endIndex);
  }, [dashboardSalesData.ventas, currentPageSales, itemsPerPage]);

  return (
    <>
      <main className="lg:ml-80">
        <section className="pt-10 px-10">
          <div className="flex items-center gap-2">
            <Image 
                src="/svg/moneyDarkBlue.svg" 
                alt="moneyDarkBlue-svg" 
                width={50} 
                height={50} 
            />
            <h2 className="text-2xl sm:text-4xl text-[#0D1D5F]">Ventas</h2>
          </div>
        </section>
        <section className="p-10">
          <div className="flex justify-between">
            <div className="w-full border-2 border-[#0D1D5F] rounded-lg p-5">
              <h3 className="text-xl font-medium">Ingresos totales</h3>
              <p className="text-2xl sm:text-4xl font-medium my-3">{formatCurrency(dashboardSalesData.ingresosTotales)} COP</p>
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
          <div className="flex flex-row-reverse mb-2">
            <button 
              className="flex items-center gap-1 group"
              onClick={handleDownloadSalesReport}
            >
              <p className="text-sm sm:text-2xl group-hover:underline text-[#0D1D5F]">Descargar informe de las ventas</p>
              <Image 
                  src="/svg/downloadDarkBlue.svg" 
                  alt="downloadDarkBlue-svg" 
                  width={50} 
                  height={50} 
              />
            </button>
          </div>
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
                {currentSales.map(venta => (
                  <tr key={venta.id_venta}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{venta.id_venta}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{venta.Course.titulo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{`${venta.Autor.nombre.split(' ')[0]} ${venta.Autor.apellidos.charAt(0)}.`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{`${venta.Cliente.nombre.split(' ')[0]} ${venta.Cliente.apellidos.charAt(0)}.`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{formatCurrency(venta.precio)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{new Date(venta.fecha_venta).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginación para ventas */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(dashboardSalesData.ventas.length / itemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-1 rounded ${currentPageSales === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePageChangeSales(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}