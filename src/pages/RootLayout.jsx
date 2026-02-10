import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { X, Menu } from "lucide-react";
import { useState } from "react";

export function RootLayout() {
    const { user, logout, isAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen bg-bg-main relative">

            {/* BOTÓN SOLO EN MÓVIL/TABLET */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-5 left-5 text-brand-yellow z-40"
            >
                <Menu size={32} />
            </button>

            {/* OVERLAY OSCURO PARA CUANDO EL SIDEBAR ESTÁ ABIERTO EN MÓVIL */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* SIDEBAR RESPONSIVE */}
            <aside
                className={`
                    bg-brand-black h-screen flex flex-col justify-evenly items-center 
                    transition-all duration-300 fixed md:static z-40

                    /* Desktop/Tablet */
                    md:w-64 md:translate-x-0

                    /* Mobile */
                    w-64 top-0 ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Botón cerrar SOLO en móvil */}
                <button
                    onClick={() => setOpen(false)}
                    className="md:hidden absolute top-5 right-5 text-brand-red"
                >
                    <X size={30} />
                </button>

                <div className="flex flex-col items-center text-left gap-3 mt-10 md:mt-0">
                    <img src="./logo-removebg.png" alt="logo" className="w-25" />
                    <div className="p-4 flex flex-col gap-2">
                        <span className="text-brand-yellow">
                            Bienvenid@,{" "}
                            <strong className="text-brand-red font-extrabold text-lg">
                                {user.firstname} {user.lastname}
                            </strong>
                        </span>
                        <span className="text-brand-yellow">
                            Rol:{" "}
                            <strong className="text-brand-red text-lg">
                                {user.role}
                            </strong>
                        </span>
                        <span className="text-brand-yellow">
                            Usuario:{" "}
                            <strong className="text-brand-red">
                                {user.username}
                            </strong>
                        </span>
                    </div>
                </div>

                <Sidebar userRole={user.role} />

                <button
                    onClick={logout}
                    className="w-40 rounded-2xl bg-brand-red p-2 text-black text-lg hover:bg-brand-linear font-extrabold mb-8 md:mb-0"
                >
                    Cerrar Sesión
                </button>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 md:ml-0">
                <Outlet />
            </main>
        </div>
    );
}
