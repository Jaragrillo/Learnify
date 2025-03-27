// 'use client'

// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const IncomeBarChart = ({ data }) => {
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: { position: 'top', labels: { font: { size: 12 } } },
//             title: { display: true, text: 'Ventas por Fecha', font: { size: 25, weight: '200' }, color: '#0D1D5F', },
//         },
//         scales: {
//             x: {
//                 grid: {
//                     display: false,
//                 },
//                 title: { display: true, text: 'Fecha', font: { size: 20, weight: '600' }, color: '#0D1D5F', },
//             },
//             y: {
//                 beginAtZero: true,
//                 title: { display: true, text: 'Ingresos', font: { size: 20, weight: '600' }, color: '#0D1D5F', },
//             },
//         },
//     };

//     const chartData = {
//         labels: data.labels,
//         datasets: [
//             {
//                 label: 'Ingresos',
//                 data: data.datasets[0].data,
//                 backgroundColor: '#cee4f1',
//                 borderColor: '#0D1D5F', 
//                 borderWidth: 1, 
//             },
//         ],
//     };

//     return <Bar options={options} data={chartData} />;
// };

// export default IncomeBarChart;

export default function IncomeBarChart() {
    return(
        <div>barchart</div>
    )
}