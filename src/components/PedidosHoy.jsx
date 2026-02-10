import { useState, useEffect } from 'react';
import api from '../api/axios';

export function PedidosHoy(){
    const [hoy, setHoy] = useState();

    useEffect(() => {
        api.get('/reportes/pedidos-hoy').then(res => setHoy(res.data));
    })
    
    return (
        <div className="bg-brand-black/40 p-5 rounded-2xl border border-brand-yellow shadow-lg text-center">
            <h2 className="text-brand-yellow text-2xl font-bold">
                # Ventas del Día: 
                <span className="text-white ml-2">{hoy}</span>
            </h2>
        </div>

    )
}