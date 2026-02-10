import { useEffect, useState } from 'react';
import api from '../api/axios';

export function ListaProductos({ idCat, onAgregar }) { // Recibe idCat correctamente
    const [productos, setProductos] = useState([]);


    useEffect(() => {
        if (idCat) {
            api.get(`/productos/categoria/${idCat}`).then(res => setProductos(res.data));
        }
    }, [idCat]);

    return (
        <div className="mt-4 grid grid-cols-3 gap-3">

            {productos.length > 0 ? (
                productos.map(p => (
                    <button
                        key={p.id}
                        onClick={() => onAgregar(p)}
                        className="
                            bg-neutral-900 
                            text-white
                            border border-brand-red/40 
                            rounded-lg 
                            p-3 
                            text-lg
                            font-bold

                            hover:bg-brand-red/30 
                            transition
                        "
                    >
                        {p.nombre}
                        <br />
                        <small className="text-brand-yellow text-lg">
                            ${p.precioActual}
                        </small>
                    </button>
                ))
            ) : (
                <p className="col-span-2 text-center text-white/60">
                    No hay productos en esta categoría
                </p>
            )}

        </div>
    );
}