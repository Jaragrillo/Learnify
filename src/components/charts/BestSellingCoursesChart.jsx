import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useEffect } from 'react';

export default function BestSellingCoursesChart({ data }) {
    useEffect(() => {
        console.log("BestSellingCoursesChart Data:", data);
    }, [data]);

    const chartData = data?.labels?.map((label, index) => ({
        name: label,
        Ventas: data?.datasets?.[0]?.data?.[index] || 0,
    })) || [];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                    <p className="label text-[#0D1D5F]">{`${label}`}</p>
                    <p className="label text-[#0D1D5F] font-medium">{`Ventas: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='sm:h-[400px] h-[200px]'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name">
                        <Label value="Cursos" offset={0} position="insideBottom" style={{ fill: '#0D1D5F' }} />
                    </XAxis>
                    <YAxis>
                        <Label value="Ventas" offset={0} position="insideLeft" angle={-90} style={{ fill: '#0D1D5F' }} />
                    </YAxis>
                    <Tooltip content={CustomTooltip}/>
                    <Bar dataKey="Ventas" fill="#cee4f1" stroke="#0D1D5F" strokeWidth={1} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
