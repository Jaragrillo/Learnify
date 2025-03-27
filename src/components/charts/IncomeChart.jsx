'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useEffect } from 'react';

export default function IncomeChart({ data }) {

    useEffect(() => {
        console.log("IncomeChart Data:", data);
    }, [data]);

    const validatedData = data?.datasets?.[0]?.data.map((value, index) => ({
        name: data?.labels?.[index] || `Fecha ${index + 1}`,
        Ingresos: Number(value) || 0,
    })) || [];

    return (
        <div className='sm:h-[400px] h-[200px]'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={validatedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis  dataKey="name">
                        <Label value="Fechas" offset={0} position="insideBottom" style={{ fill: '#0D1D5F' }} />
                    </XAxis>
                    <YAxis>
                        <Label value="Ingresos" offset={0} position="insideLeft" style={{ fill: '#0D1D5F' }} angle={-90} />
                    </YAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey="Ingresos" stroke="#0D1D5F" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}