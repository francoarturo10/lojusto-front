import { useState } from 'react';
import { DatosCliente } from './DatosCliente';
import { SelectCategoria } from './SelectCategoria';
import api from '../api/axios';

export function FormVenta() {
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]);

  const [clienteData, setClienteData] = useState({
    nombre: '',
    celular: '',
    email: ''
  });

  const addToCart = (producto) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === producto.id);
      if (exists) {
        return prev.map(item => item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // 1. Aumentar cantidad (reutilizamos lógica de addToCart o creamos una específica)
  const aumentarCantidad = (id) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  // 2. Disminuir cantidad (si llega a 0, se mantiene en 1 o se elimina, tú decides)
  const disminuirCantidad = (id) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad - 1;
        return { ...item, cantidad: nuevaCantidad < 1 ? 1 : nuevaCantidad };
      }
      return item;
    }));
  };

  // 3. Eliminar por completo
  const eliminarDelCarrito = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmitVenta = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("El carrito está vacío");

    try {
      const clienteRes = await api.post('/clientes', clienteData);
      const clienteId = clienteRes.data.id;

      const ventaData = {
        cliente: { id: clienteId },
        estado: "PENDIENTE",
        detalles: cart.map(item => ({
          producto: { id: item.id },
          cantidad: item.cantidad
        }))
      };

      await api.post('/ventas', ventaData);
      alert("Venta realizada con éxito");
      setCart([]);
      setClienteData({ nombre: '', celular: '', email: '' });
    } catch (err) {
      console.error(err);
      alert("Error en el proceso de venta");
    }
  };

  return (
    <div className='w-full'>


      <div className='grid grid-cols-1 md:grid-cols-2' >

        <div className=''>

          <h2 className='text-2xl font-bold text-brand-yellow mb-4 text-center p-3'>
            Registro de Ventas
          </h2>

          <div className='flex flex-col gap-6'>

            <DatosCliente
              clienteData={clienteData}
              setClienteData={setClienteData}
            />

            <section >

              <h3 className='text-brand-yellow font-extrabold text-2xl mb-3'>Selección de Productos</h3>

              <SelectCategoria onAgregarProducto={addToCart} />

              {/* <ListaProductos /> */}
            </section>

          </div>
        </div>
        
        <div className='grid grid-cols-1 grid-rows-3 mt-7 md:m-3'>

          <h3 className='text-brand-red font-extrabold text-2xl text-center'>
            Resumen de Pedido
          </h3>

          {/* CONTENEDOR SCROLLABLE */}
          <div className="m-1 border border-brand-yellow rounded-2xl">
            {cart.map(item => (

              <div
                key={item.id}
                className="grid grid-cols-3 items-center bg-brand-black/30 p-2 rounded-lg "
              >

                {/* Nombre y precio */}
                <div>
                  <strong className="text-white">{item.nombre}</strong> <br />
                  <small className="text-brand-yellow">${item.precioActual.toFixed(2)}</small>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => disminuirCantidad(item.id)}
                    className="px-2 py-1 bg-brand-red text-white rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-white font-bold">{item.cantidad}</span>

                  <button
                    onClick={() => aumentarCantidad(item.id)}
                    className="px-2 py-1 bg-brand-yellow text-black rounded-lg"
                  >
                    +
                  </button>

                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-lg"
                  >
                    ✕
                  </button>
                </div>

                {/* Total del item */}
                <span className="text-right font-bold text-white text-lg">
                  ${(item.precioActual * item.cantidad).toFixed(2)}
                </span>
                
              </div>
            ))}
          
          </div>

          {/* TOTAL + BOTÓN (SE QUEDA ABAJO SIEMPRE) */}
          <div className="mt-4 ">
            {/* TOTAL */}
            <div className="flex justify-between mb-3 text-white text-lg font-semibold">
              <span>Total:</span>
              <span className='text-2xl font-extrabold text-brand-yellow'>
                ${cart.reduce((acc, i) => acc + (i.precioActual * i.cantidad), 0).toFixed(2)}
              </span>
            </div>

            {/* BOTÓN PROCESAR */}
            <button
              onClick={handleSubmitVenta}
              className="
                w-full 
                bg-brand-red 
                text-white 
                py-3 
                rounded-lg 
                font-bold 
                text-lg 
                hover:bg-red-700 
                transition-all 
                duration-200
              "
            >
              PROCESAR VENTA
            </button>
          </div>


        </div>

      </div>
    </div>
  );
}

