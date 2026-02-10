import { useState } from "react"
import api from '../api/axios';

export function DatosCliente({ clienteData, setClienteData }) {
  const [sugerencias, setSugerencias] = useState([]); // <--- NUEVO: Para la lista desplegable


  // --- LÓGICA DE AUTOCOMPLETADO ---
  const handleNombreChange = async (e) => {
    const valor = e.target.value;
    setClienteData({ ...clienteData, nombre: valor });

    if (valor.length > 2) { // Buscar a partir de 3 letras
      try {
        // Ajusta la URL según tu backend, por ejemplo: /api/clientes/buscar?nombre=...
        const res = await api.get(`/clientes/buscar?nombre=${valor}`);
        setSugerencias(res.data);
      } catch (err) {
        console.error("Error buscando sugerencias", err);
      }
    } else {
      setSugerencias([]);
    }
  };

  const seleccionarCliente = (cliente) => {
    setClienteData({
      nombre: cliente.nombre,
      celular: cliente.celular,
      email: cliente.email || ''
    });
    setSugerencias([]); // Limpiar sugerencias al seleccionar
  };
  return (
    <div>
      <section className="bg-brand-black border border-brand-red rounded-xl p-4 ">
        <h3 className="text-brand-yellow text-xl font-semibold mb-3">
          Datos del Cliente
        </h3>

        <div className="flex flex-col gap-4">

          {/* --- INPUT NOMBRE --- */}
          <div className="relative">
            <input
              placeholder="caja@lojusto.com"
              value={clienteData.nombre}
              onChange={handleNombreChange}
              className="w-full p-2 rounded bg-neutral-900 text-white border border-brand-red/40 focus:outline-none"
            />

            {/* --- DROPDOWN --- */}
            {sugerencias.length > 0 && (
              <ul className="absolute z-20 w-full bg-neutral-900 border border-brand-red/50 mt-1 rounded shadow-lg max-h-40 overflow-y-auto">
                {sugerencias.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => seleccionarCliente(s)}
                    className="p-2 hover:bg-brand-red/30 cursor-pointer text-sm text-white"
                  >
                    {s.nombre} ({s.celular})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* --- INPUT CELULAR --- */}
          <input
            placeholder="Celular"
            value={clienteData.celular}
            onChange={(e) =>
              setClienteData({ ...clienteData, celular: e.target.value })
            }
            className="w-full p-2 rounded bg-neutral-900 text-white border border-brand-red/40 focus:outline-none"
          />

        </div>
      </section>
    </div>
  )
}

