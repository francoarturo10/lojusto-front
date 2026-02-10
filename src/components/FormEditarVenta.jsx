import QRCode from 'qrcode';
import { useEffect, useState, useRef } from "react";
import api from '../api/axios';

export function FormEditarVenta({ venta, onSuccess }) {
    // Referencia para asegurar que cargamos los datos solo una vez al abrir el editor
    const inicializado = useRef(false);

    const [detalles, setDetalles] = useState([]);
    const [estado, setEstado] = useState("");
    const [cliente, setCliente] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);

    // CARGA INICIAL: Solo cuando cambia el ID de la venta
    useEffect(() => {
        if (venta && venta.id) {
            setDetalles([...venta.detalles]); // Copia profunda para evitar mutaciones
            setEstado(venta.estado);
            setCliente(venta.cliente || "Desconocido");
            inicializado.current = true;
        }
    }, [venta.id]);

    useEffect(() => {
        api.get('/categorias').then(res => setCategorias(res.data));
    }, []);

    // 121, 40

    const imprimirTicket = async (datosTicket) => {
        try {
            const qrDataUrl = await QRCode.toDataURL('https://wa.me/51936869880');
            const ventana = window.open('', '_blank', 'width=300,height=600');

            ventana.document.write(`
                <html>
                <head>
                    <style>
                        @media print {
                            @page { 
                                size: 58mm auto; 
                                margin: 0; /* Elimina encabezados de URL y fecha */
                            }
                            * {
                                -webkit-print-color-adjust: exact !important; /* Fuerza gráficos de fondo */
                                print-color-adjust: exact !important;
                            }
                        }
                        body { 
                            font-family: 'Courier New', Courier, monospace; 
                            width: 48mm; 
                            margin: 0 auto; 
                            padding: 2mm; 
                            font-size: 12px; 
                            line-height: 1.2;

                        }
                        .center { text-align: center; }
                        .bold { font-weight: bold; font-size: 0.9rem }
                        .bold2 { font-weight: 600 }
                        .logo { width: 30mm; height: auto; display: block; margin: 0 auto; }
                        .line { border-top: 1px dashed black; margin: 2mm 0; width: 100%; }
                        table { width: 100%; border-collapse: collapse; }
                        .col-cant { width: 20%; }
                        .col-price { text-align: right; }
                        .qr { width: 30mm; height: 30mm; margin: 2mm auto; display: block; }
                    </style>
                </head>
                <body>
                    <div class="center">
                        <img src="./lojustoticket.png" class="logo" />
                        <div class="bold" style="font-size: 16px;"></span> <span class="bold2">LO JUSTO</span></div>
                        <div style="font-size: 10px;font-weight: bold;" ></span> <span class="bold2">Sabor y Calidad</span></div>
                        <div></span> <span class="bold2">C. Guillermo Prescott 232</span></div>
                        <div></span> <span class="bold2">Trujillo</span></div>
                        <div></span> <span class="bold2">Cel: 936 869 880</span></div>
                    </div>
                    <div class="line"></div>
                    <div>
                        <span class="bold">TICKET:</span> <span class="bold2">#${venta.id}</span><br>
                        <span class="bold">CLIENTE:</span> <span class="bold2">${datosTicket.cliente}</span><br>
                        <span class="bold">FECHA:</span> <span class="bold2">${new Date()
                            .toLocaleString('en-US', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })
                            .toLowerCase()}
                        </span><br>
                        <span class="bold">ESTADO:</span><span class="bold2"> ${datosTicket.estado}</span>
                    </div>
                    <div class="line"></div>
                    <table>
                        ${datosTicket.productos.map(d => `
                            <tr><td colspan="3"><span class="bold2">${d.producto.nombre}</span></td></tr>
                            <tr>
                                <td class="col-cant"><span class="bold2">${d.cantidad} x</span></td>
                                <td class=""><span class="bold2">s/. ${d.producto.precioActual.toFixed(2)}</span></td>
                                <td class="col-price"><span class="bold2">s/. ${(d.cantidad * d.producto.precioActual).toFixed(2)}</span></td>
                            </tr>
                        `).join('')}
                    </table>
                    <div class="line"></div>

                    <div class="total-section">
                        <table style="width: 100%;">
                            <tr>
                                <td class="bold" style="font-size: 16px;">TOTAL:</td>
                                <td class="bold" align="right" style="font-size: 16px;"><span class="bold2">s/. ${datosTicket.total.toFixed(2)}</span></td>
                            </tr>
                        </table>
                    </div>

                    <div class="center footer-text">
                        <div class="line"></div>
                        <div class="bold">¡GRACIAS POR TU COMPRA!</div>
                        <div style="font-size: 10px;font-weight: bold;">Vuelva pronto ;)</div>
                        <img src="${qrDataUrl}" class="qr" /><br>
                        <span class="bold">[QR] Escanea para reservar tu pedido</span>
                        

                    <script>
                        window.onload = function() { window.print(); setTimeout(() => { window.close(); }, 500); };
                    </script>
                </body>
                </html>
            `);
            ventana.document.close();
        } catch (err) {
            console.error("Error al imprimir", err);
        }
    };
    // 
    const handleCategoriaChange = async (catId) => {
        if (!catId) return;
        const res = await api.get(`/productos/categoria/${catId}`);
        setProductos(res.data);
    };

    const agregarProductoNuevo = (prod) => {
        setDetalles(prev => {
            const existe = prev.find(d => d.producto.id === prod.id);
            if (existe) {
                return prev.map(d =>
                    d.producto.id === prod.id ? { ...d, cantidad: d.cantidad + 1 } : d
                );
            }
            // Importante: id en null para nuevos registros
            return [...prev, { producto: prod, cantidad: 1, id: null }];
        });
    };

    const updateCantidad = (prodId, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        setDetalles(prev => prev.map(d =>
            d.producto.id === prodId ? { ...d, cantidad: nuevaCantidad } : d
        ));
    };

    const eliminarProducto = (prodId) => {
        // Filtramos por el ID del producto
        setDetalles(prev => prev.filter(d => d.producto.id !== prodId));
    };

    const handleGuardarCambios = async () => {
        if (detalles.length === 0) return alert("La venta no puede estar vacía");

        const ventaActualizada = {
            ...venta,
            cliente: cliente,
            estado: estado,
            detalles: detalles.map(d => ({
                producto: { id: d.producto.id }, // Solo mandamos el ID del producto
                cantidad: d.cantidad            // Y la cantidad nueva
            }))
        };

        try {
            await api.put(`/ventas/${venta.id}`, ventaActualizada);

            // Lógica de impresión: Si se marca como PAGADO al guardar
            if (estado === "PAGADO") {
                await imprimirTicket({
                    cliente: cliente.nombre,
                    estado: estado,
                    total: totalCalculado,
                    productos: detalles
                });
                alert("¡IMPRIMIENDO TICKET - Cambios guardados con éxito!");
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            alert("Error al guardar: " + (err.response?.data?.message || "Error desconocido"));
        }
    };

    const totalCalculado = detalles.reduce((acc, d) =>
        acc + (d.producto.precioActual * d.cantidad), 0
    );

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-3">

    {/* IZQUIERDA: BUSCADOR */}
    <div>
        <h4 className="text-2xl font-extrabold text-brand-yellow mb-3 text-center">
            Añadir Productos
        </h4>

        <select
            onChange={e => handleCategoriaChange(e.target.value)}
            className="w-full bg-brand-black text-white border border-brand-yellow rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
        >
            <option value="">-- Seleccionar Categoría --</option>
            {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
        </select>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {productos.map(p => (
                <button
                    key={p.id}
                    onClick={() => agregarProductoNuevo(p)}
                    className="bg-brand-black/40 border border-brand-yellow rounded-xl p-3 text-white hover:bg-brand-yellow hover:text-black transition-all duration-200"
                >
                    {p.nombre} <br />
                    <strong>${p.precioActual}</strong>
                </button>
            ))}
        </div>
    </div>

    {/* DERECHA: CARRITO DE EDICIÓN */}
    <div>
        <h3 className="text-brand-red font-extrabold text-3xl text-center mb-4">
            Pedido #{venta.id}
        </h3>

        <div className="max-h-[420px] overflow-y-auto border border-brand-yellow rounded-2xl p-2 space-y-3">
            {detalles.map((d) => (
                <div
                    key={d.producto.id}
                    className="grid grid-cols-4 items-center bg-brand-black/30 p-3 rounded-xl gap-3"
                >
                    <span className="col-span-2 text-white font-bold">
                        {d.producto.nombre}
                    </span>

                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => updateCantidad(d.producto.id, d.cantidad - 1)}
                            className="px-2 py-1 bg-brand-red text-white rounded-lg"
                        >
                            -
                        </button>

                        <strong className="text-white text-lg">{d.cantidad}</strong>

                        <button
                            onClick={() => updateCantidad(d.producto.id, d.cantidad + 1)}
                            className="px-2 py-1 bg-brand-yellow text-black rounded-lg"
                        >
                            +
                        </button>

                        <button
                            onClick={() => eliminarProducto(d.producto.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded-lg"
                        >
                            ✕
                        </button>
                    </div>

                    <span className="text-right font-bold text-brand-yellow text-lg">
                        ${(d.producto.precioActual * d.cantidad).toFixed(2)}
                    </span>
                </div>
            ))}
        </div>

        <div className="mt-4 space-y-3">
            <div>
                <label className="text-white font-bold">Estado: </label>
                <select
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                    className="w-full bg-brand-black text-white border border-brand-yellow rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                >
                    <option value="PAGADO">PAGADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="ANULADO">ANULADO</option>
                </select>
            </div>

            <h2 className="text-3xl font-extrabold text-brand-yellow text-right">
                Total: ${totalCalculado.toFixed(2)}
            </h2>

            <button
                onClick={handleGuardarCambios}
                className="w-full mt-2 bg-brand-red text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-all duration-200"
            >
                GUARDAR CAMBIOS
            </button>
        </div>
    </div>

</div>

    );
}
