import { useState, useEffect } from 'react';
import { Bar, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip } from 'recharts'
import api from '../api/axios';

export function Charts(){

    const [ventasMensuales, setVentasMensuales] = useState([]);

    useEffect(() => { 
        api.get('/reportes/ventas-mensuales').then(res => setVentasMensuales(res.data));
    },[])
    
    return (
        <div className="bg-brand-black/40 p-5 rounded-2xl border border-brand-yellow shadow-lg">

            <h2 className="text-brand-yellow text-2xl font-bold mb-4 text-center">
                Ventas del Año
            </h2>

            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ventasMensuales}>
                        <XAxis dataKey="mesNombre" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="totalVentas" fill="#f4b41a" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>


    )
}