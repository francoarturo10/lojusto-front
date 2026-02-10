import { useEffect, useState } from "react";
import api from '../api/axios';
import { FormEditarVenta } from './FormEditarVenta';

export function ListaVentas() {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

    const cargarVentas = () => {
        setLoading(true);
        api.get('/ventas/hoy')
            .then(res => {
                setVentas(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        cargarVentas();
    }, []);

    const finalizarEdicion = () => {
        setVentaSeleccionada(null);
        cargarVentas();
    };

    if (loading) return <p className="text-center py-10 text-gray-300">Cargando...</p>;

    // -------------------------------------------------------
    // VISTA DE EDICIÓN
    // -------------------------------------------------------
    if (ventaSeleccionada) {
        return (
            <div className="p-5">
                <button
                    onClick={() => setVentaSeleccionada(null)}
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                >
                    ← Cancelar y Volver
                </button>

                <div className="mt-5">
                    <FormEditarVenta
                        venta={ventaSeleccionada}
                        onSuccess={finalizarEdicion}
                    />
                </div>
            </div>
        );
    }

    // -------------------------------------------------------
    // LISTA DE VENTAS
    // -------------------------------------------------------
    return (
        <div className="p-5">

            {/* TÍTULO + TOTAL */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-2xl font-bold text-white">Ventas de Hoy</h2>

                <div className="bg-neutral-900 border border-brand-red/40 shadow-md px-4 py-3 rounded-xl">
                    <small className="text-gray-300">Total:</small>
                    <div className="text-xl font-bold text-brand-yellow">
                        ${ventas.reduce((acc, v) => acc + (v.totalVenta || 0), 0).toFixed(2)}
                    </div>
                </div>
            </div>

            {/* TABLA */}
            <div className="mt-6 overflow-auto">
                <table className="w-full text-left border-collapse bg-neutral-900 rounded-xl overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-neutral-800 text-gray-300 text-sm uppercase tracking-wide">
                            <th className="p-3">ID</th>
                            <th className="p-3">Hora</th>
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3">Total</th>
                            <th className="p-3 text-center">Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ventas.map(v => (
                            <tr
                                key={v.id}
                                className="border-b border-neutral-800 hover:bg-neutral-800/60 transition"
                            >
                                <td className="p-3 text-gray-300">{v.id}</td>

                                <td className="p-3 text-gray-300">
                                    {new Date(v.fecha).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>

                                <td className="p-3 text-gray-300">{v.cliente?.nombre}</td>

                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold 
                                                ${v.estado === "PAGADO" ? "bg-green-700 text-white" :
                                            v.estado === "PENDIENTE" ? "bg-yellow-600 text-white" :
                                                "bg-red-700 text-white"}`}
                                    >
                                        {v.estado}
                                    </span>
                                </td>

                                <td className="p-3 text-brand-yellow font-bold">
                                    ${v.totalVenta?.toFixed(2)}
                                </td>

                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => setVentaSeleccionada(v)}
                                        className="px-4 py-1 rounded-lg bg-brand-red text-white text-sm font-semibold 
                                                   hover:bg-red-700 transition"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
