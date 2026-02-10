import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Inicializar estado desde localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        // console.log(savedUser);
        
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Guarda los datos en el disco duro del navegador y actualiza la interfaz
    const login = (userData, token) => {
        console.log("hi: ", userData);
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('auth_token', token);
        setUser(userData);
    };

    // Borra los rastros (tokens y datos) y limpia el estado para que la app sepa que ya no hay nadie conectado.
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);