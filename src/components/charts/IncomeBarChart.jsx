import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const IncomeBarChart = ({ data }) => {
    const chartData = data?.labels?.map((label, index) => ({
        name: label,
        Ingresos: data?.datasets?.[0]?.data?.[index] || 0,
    })) || [];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value="Fecha" offset={0} position="insideBottom" style={{ fill: '#0D1D5F' }} />
                </XAxis>
                <YAxis>
                    <Label value="Ingresos" offset={0} position="insideLeft" angle={-90} style={{ fill: '#0D1D5F' }} />
                </YAxis>
                <Tooltip />
                <Bar dataKey="Ingresos" fill="#cee4f1" stroke="#0D1D5F" strokeWidth={1} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default IncomeBarChart;