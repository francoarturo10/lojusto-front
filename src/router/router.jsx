import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
import { RootLayout } from "../pages/RootLayout";
import { FormVenta } from "../components/FormVenta";
import { ListaVentas } from "../components/ListaVentas";
import { ChartsPage } from "../pages/ChartsPage";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <RootLayout />,
        children: [
            // Rutas para ADMIN y CAJA
            {
                element: <ProtectedRoute allowedRoles={['ADMIN', 'CAJA','MOZO']} />,
                children: [
                    { path: 'crear-venta', element: <FormVenta /> },
                    // { path: 'categorias', element: <CategoriasPage /> },
                    { path: 'listar-ventas', element: <ListaVentas /> },
                ]
            },
            // Rutas solo para ADMIN
            {
                element: <ProtectedRoute allowedRoles={['ADMIN', 'CAJA','MOZO']} />,
                children: [
                    { path: 'reportes', element: <ChartsPage /> },
                ]
            },
            // Ruta para COCINA
            {
                element: <ProtectedRoute allowedRoles={['COCINA']} />,
                children: [
                    { path: 'pedidos-pendientes', element: <h3>pedidos para cocina</h3> },
                ]
            }
        ]
    }
]);