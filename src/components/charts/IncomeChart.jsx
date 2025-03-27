import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController);

export default function IncomeChart({ data }) {

    useEffect(() => {
        console.log("IncomeChart Data:", data);
    }, [data]);

    const validatedData = data?.datasets?.[0]?.data.map(Number) || [];

    const chartData = {
        labels: data?.labels || [],
        datasets: [{
            label: 'Ingresos',
            data: validatedData,
            fill: false,
            borderColor: '#0D1D5F',
            tension: 0.1,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Ventas por Fecha', font: { size: 25, weight: '200' }, color: '#0D1D5F', },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fechas',
                    font: { size: 20, weight: '600' }, color: '#0D1D5F',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Ingresos',
                    font: { size: 20, weight: '600' }, color: '#0D1D5F',
                },
            },
        },
    };

    return (
        <div className="h-[400px] w-full relative">
            <Line 
                options={options} 
                data={chartData} 
                className='!w-full !h-full'
            />
        </div>
    );
}