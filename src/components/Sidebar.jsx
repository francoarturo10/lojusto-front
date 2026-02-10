import { Link } from "react-router-dom";

export function Sidebar({ userRole }) {
    return (
        <nav>
            <ul className="flex flex-col gap-15">
                {/* Opciones para todos los autenticados */}
                {/* <li><Link to="/">Inicio</Link></li> */}

                {/* Opciones para ADMIN y CAJA */}
                {['ADMIN', 'CAJA','MOZO'].includes(userRole) && (
                    <>
                        <li className="border-b border-brand-yellow hover:border-none hover:bg-brand-linear hover:rounded-2xl p-2 text-center"><Link className="text-brand-red font-extrabold text-lg hover:text-black" to="/crear-venta">Crear Venta</Link></li>
                        <li className="border-b border-brand-yellow hover:border-none hover:bg-brand-linear hover:rounded-2xl p-2 text-center"><Link className="text-brand-red font-extrabold text-lg hover:text-black" to="/listar-ventas">Listar Ventas</Link></li>
                    </>
                )}

                {/* Opciones SOLO para ADMIN */}
                {userRole === 'ADMIN' && (
                    <li className="border-b border-brand-yellow hover:border-none hover:bg-brand-linear hover:rounded-2xl p-2 text-center"><Link className="text-brand-red font-extrabold text-lg hover:text-black" to="/reportes">Reportes Globales</Link></li>
                )}

                {/* Opciones SOLO para CAJA */}
                {userRole === 'CAJA' && (
                    <li className="border-b border-brand-yellow hover:border-none hover:bg-brand-linear hover:rounded-2xl p-2 text-center"><Link className="text-brand-red font-extrabold text-lg hover:text-black" to="/reportes">Reportes CAJA</Link></li>
                )}

                {/* Opciones para COCINA */}
                {userRole === 'COCINA' && (
                    <li className="border-b border-brand-yellow hover:border-none hover:bg-brand-linear hover:rounded-2xl p-2 text-center"><Link className="text-brand-red font-extrabold text-lg hover:text-black" to="/pedidos-pendientes">Pedidos COCINA</Link></li>
                )}
            </ul>
        </nav>
    );
}