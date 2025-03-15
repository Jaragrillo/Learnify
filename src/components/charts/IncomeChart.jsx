import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function IncomeChart({ data }) {

    useEffect(() => {
        console.log("IncomeChart Data:", data);
    }, [data]);

    const chartData = {
        labels: data.labels,
        datasets: [{
            label: 'Ingresos',
            data: data.datasets[0].data,
            fill: false,
            borderColor: '#0D1D5F',
            tension: 0.1,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Ventas por Fecha' },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fechas',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Ingresos',
                },
            },
        },
    };

    return <Line options={options} data={chartData} />;
}