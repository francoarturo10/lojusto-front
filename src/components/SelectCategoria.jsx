import { useState, useEffect } from 'react';
import api from '../api/axios';
import { ListaProductos } from './ListaProductos';

export function SelectCategoria({ onAgregarProducto }){

    const [categorias, setCategorias] = useState([]);
    const [idCat, setIdCat] = useState([]);

    useEffect(() => {
        api.get('/categorias').then(res => setCategorias(res.data));
    }, []);

    const handleCategoriaChange = async (catId) => {
        // console.log(catId);
        
        if (!catId) return;
        // const res = await api.get(`/productos/categoria/${catId}`);
        // setProductos(res.data);
        setIdCat(catId);
    };
    return(
    <div className="flex flex-col gap-4">

      {/* SELECT */}
      <select
        onChange={(e) => handleCategoriaChange(e.target.value)}
        className="w-full p-2 rounded bg-neutral-900 text-white border border-brand-red/40 focus:outline-none"
      >
        <option value="">Seleccione Categoría</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      {/* LISTA DE PRODUCTOS */}
      <ListaProductos idCat={idCat} onAgregar={onAgregarProducto} />
    </div>
    )
}