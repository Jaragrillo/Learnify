'use client'

import IncomeChart from "@/components/charts/IncomeChart";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState({ 
    incomes: 0, 
    users: 0, 
    salesChartData: { labels: [], values: [] }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/manage/dashboard', {
              method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
            } else {
                console.error('Error al obtener datos del dashboard');
            }
        } catch (error) {
            console.error('Error al obtener datos del dashboard:', error);
        }
    };

    fetchDashboardData();
  }, []);

  const chartData = {
    labels: dashboardData.salesChartData.labels,
    datasets: [{
      data: dashboardData.salesChartData.values,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };

  useEffect(() => {
    console.log("Chart Data:", dashboardData.salesChartData);
  }, [dashboardData.salesChartData]);

  return (
    <>
      <main className="ml-80">
        <section className="pt-10 px-10">
          <div className="flex items-center gap-2">
            <Image 
                src="/svg/dashboardDarkBlue.svg" 
                alt="dashboardDarkBlue-svg" 
                width={50} 
                height={50} 
            />
            <h2 className="text-4xl text-[#0D1D5F]">Dashboard</h2>
          </div>
        </section>
        <section className="p-10">
          <div className="flex justify-between">
            <div className="w-[45%] border-2 border-[#0D1D5F] rounded-lg p-5">
              <h3 className="text-lg font-medium">Ingresos</h3>
              <p className="text-4xl font-medium my-3">${dashboardData.incomes} COP</p>
            </div>
            <div className="w-[45%] border-2 border-[#0D1D5F] rounded-lg p-5">
              <h3 className="text-lg font-medium">Usuarios</h3>
              <p className="text-4xl font-medium my-3">{dashboardData.users}</p>
            </div>
          </div>
        </section>
        <section className="p-10">
          <IncomeChart data={chartData} />
        </section>
      </main>
    </>
  );
}