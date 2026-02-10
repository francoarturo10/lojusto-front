import { useState, useEffect } from 'react';
import api from '../api/axios';

export function ProductosHoy(){
    const [hoy, setHoy] = useState([]);

    useEffect(() => {
        api.get('/reportes/productos-hoy').then(res => setHoy(res.data));
    },[])
    let i = 0
    return (
        <div className="bg-brand-black/40 p-5 rounded-2xl border border-brand-yellow shadow-lg">
    
            <h2 className="text-brand-yellow text-2xl font-bold mb-4 text-center">
                Productos Más Vendidos del Día
            </h2>

            <table className="w-full text-white text-center border border-brand-yellow rounded-xl overflow-hidden">
                <thead className="bg-brand-red text-white">
                    <tr>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Cantidad</th>
                    </tr>
                </thead>

                <tbody>
                    {hoy.map((p, i) => (
                        <tr key={i} className="border-t border-brand-yellow">
                            <td className="p-2">{p.producto}</td>
                            <td className="p-2 text-brand-yellow font-bold">{p.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )
}