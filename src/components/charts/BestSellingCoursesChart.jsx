// 'use client'

// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import React, { useEffect } from 'react';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function BestSellingCoursesChart({ data }) {
//     useEffect(() => {
//         console.log("BestSellingCoursesChart Data:", data);
//     }, [data]);

//     const chartData = {
//         labels: data.labels,
//         datasets: [{
//             label: 'Ventas',
//             data: data.datasets[0].data,
//             backgroundColor: '#cee4f1',
//             borderColor: '#0D1D5F', 
//             borderWidth: 1, 
//         }],
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         redraw: true,
//         plugins: {
//             legend: { position: 'top', labels: { font: { size: 12 } } },
//             title: { display: true, text: 'Cursos Más Vendidos', font: { size: 25, weight: '200' }, color: '#0D1D5F', },
//         },
//         scales: {
//             x: {
//                 title: { display: true, text: 'Cursos', font: { size: 20, weight: '600' }, color: '#0D1D5F', },
//             },
//             y: {
//                 title: { display: true, text: 'Ventas', font: { size: 20, weight: '600' }, color: '#0D1D5F', },
//                 beginAtZero: true, // Inicia el eje Y desde 0
//             },
//         },
//     };

//     return <Bar options={options} data={chartData} />;
// }

// export default React.memo(BestSellingCoursesChart);

export default function BestSellingCoursesChart() {
    return(
        <div>barchart</div>
    )
}