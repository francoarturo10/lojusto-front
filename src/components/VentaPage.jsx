import { useEffect, useState } from 'react';
import api from '../api/axios';

export function VentaPage() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        api.get('/reportes/ventas-mensuales')
            .then(res => setVentas(res.data))
            .catch(err => console.error("No autorizado o error de red", err));
    }, []);
    
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>Ventas Globales</h1>
            
            {ventas.length === 0 ? (
                <p>Cargando datos o no hay ventas registradas...</p>
            ) : (
                <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4' }}>
                            <th>ID</th>
                            <th>Mes</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            /* Usamos mesNumero como key porque es único (1 al 12) */
                            <tr key={venta.mesNumero}> 
                                <td>{venta.mesNumero}</td>
                                <td>{venta.mesNombre}</td>
                                <td>${venta.totalVentas.toFixed(2)}</td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}