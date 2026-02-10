import { useState, useEffect } from 'react';
import api from '../api/axios';

export function ClientesHoy(){
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        api.get('/reportes/clientes-total').then(res => setClientes(res.data));
    },[])
    console.log(clientes);

    return (
        <div className="bg-brand-black/40 p-5 rounded-2xl border border-brand-yellow shadow-lg">
    
            <h2 className="text-brand-yellow text-2xl font-bold mb-4 text-center">
                Clientes con Más Compras
            </h2>

            <table className="w-full text-white text-center border border-brand-yellow rounded-xl overflow-hidden">
                <thead className="bg-brand-red text-white">
                    <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Total Compras</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map((c) => (
                        <tr key={c.clienteId} className="border-t border-brand-yellow">
                            <td className="p-2">{c.clienteId}</td>
                            <td className="p-2">{c.nombre}</td>
                            <td className="p-2 text-brand-yellow font-bold">{c.totalCompras}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )
}