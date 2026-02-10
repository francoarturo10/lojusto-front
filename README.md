# Sistema de ventas del restaurante "Lo Justo"
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-1.13-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![Lucide React](https://img.shields.io/badge/Lucide--React-0.563-000000?logo=lucide&logoColor=white)](https://lucide.dev/)
[![React Router](https://img.shields.io/badge/React%20Router-7.13-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.7-22B5BF)](https://recharts.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://ventas-react-tailwind.vercel.app/)

Este proyecto consiste en un sistema de punto de venta (POS) diseñado para el restaurante "Lo Justo" específicamente para la gestión de ventas, autenticación por roles y visualización de reportes en tiempor real. Este proyecto demuestra habilidades avanzadas en el manejo de estados complejos, diseño responsivo y consumo de APIs REST.

---
## Despliegue en Vercel: 

> Link: https://lojusto-front-blue.vercel.app/

## 🧰 Tecnologías utilizadas

- **React 19**
- **React Router Dom**
- **Axios**
- **Tailwind CSS**
- **Lucide Icons**
- **Recharts**
- **Qrcode**

---

## Funcionalidades Principales
Este sistema permite:
* Autenticación de usuarios con roles: **ADMIN, CAJA, MOZO, COCINA.**
* Protección de rutas según permisos.
* Registro de ventas con carrito dinámico.
* Persistencia de sesión mediante localStorage.
* Navegación estructurada con layouts y rutas anidadas.

---

## 🛒 Módulo de ventas

El formulario de ventas permite:
- Registrar datos del cliente
- Seleccionar productos por categoría
- Gestionar un carrito dinámico:
  - Agregar productos
  - Aumentar / disminuir cantidad
  - Eliminar ítems
- Calcular el total automáticamente

La venta se envía al backend en dos pasos:
1. Registro del cliente
2. Registro de la venta con su detalle

Este flujo replica un proceso real de punto de venta (POS).

---

## 🎨 UI / UX

- Diseño **responsive** (mobile-first)
- Uso de **Tailwind CSS**
- Sidebar adaptable

---

## Arquitectura

### 🔐 Autenticación global (Context API)
Se utiliza React Context para manejar:
* Usuario autenticado
* Login / Logout
* Persistencia de sesión

Esto evita prop drilling y centraliza la lógica de seguridad.

```text
AuthContext
├─ user
├─ login()
├─ logout()
└─ isAuthenticated
```

La sesión se conserva incluso al recargar la página gracias a localStorage.

---

## 🛣️ Enrutamiento y control de acceso
El enrutamiento se gestiona con React Router usando createBrowserRouter.
Se implementa un componente ProtectedRoute que:
* Verifica autenticación
* Valida roles permitidos
- Bloquea accesos no autorizados

Ejemplo conceptual:
- **ADMIN / CAJA / MOZO** → ventas y reportes
- **COCINA** → pedidos pendientes

Esto simula un escenario real de aplicaciones empresariales.

---

### 🧱 Layout principal

El `RootLayout`:
- Protege toda la aplicación
- Contiene el **Sidebar responsive**
- Maneja navegación móvil y desktop

Incluye:
- Datos del usuario autenticado
- Rol activo
- Botón de cierre de sesión

---

## Impresora XP-58

### **Imprimir directamente:**
    
* ingresar a prpiedades de chrome, entrar a "accesos directos" y en "destino", debe quedar asi: 
  > "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --kiosk-printing http://localhost:5173
* finalmente aplicar y volver a abrir.
  
    