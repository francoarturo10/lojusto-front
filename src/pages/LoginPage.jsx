import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // El archivo de axios que configuramos antes
import { useAuth } from '../context/AuthContext';
import { Flame } from 'lucide-react';

export function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();


    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Crear el token Basic Auth en Base64
        const authHeader = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);

        try {
            // Intentamos una petición a un endpoint seguro para validar las credenciales
            // Puedes crear un endpoint "/api/auth/me" que devuelva los datos del usuario
            const response = await api.get('/auth/me', {
                headers: { 'Authorization': authHeader }
            });

            console.log(response.data);
            // Si es exitoso, guardamos en el contexto y localStorage
            const userData = {
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                username: response.data.username,
                role: response.data.role // Ejemplo: "ADMIN", "CAJA"
            };


            login(userData, authHeader);
            navigate('/'); // Redirigir al inicio

        } catch (err) {
            setError('Usuario o contraseña incorrectos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-linear p-4 font-sans text-brand-yellow font-bold ">
            
            {/* Contenedor del Formulario con efecto Glassmorphism */}
            <div className="w-full max-w-md bg-brand-black/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/10">
                
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black tracking-tighter text-brand-red uppercase italic">Bienvenido a</h2>
                    <div className="flex justify-center items-center gap-2">
                        <h3 className="text-4xl font-black text-brand-yellow tracking-tight">LO JUSTO</h3>
                        <Flame size={32} className="text-brand-yellow fill-brand-yellow animate-pulse" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {error && (
                        <div className="bg-brand-red/20 border border-brand-red/50 text-brand-red p-4 rounded-xl text-sm font-bold text-center">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                            placeholder="ejemplo@lojusto.com"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                            placeholder="••••••••"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* BOTÓN CON EL MISMO GRADIENTE */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 px-6 rounded-2xl font-black text-lg uppercase tracking-widest text-white shadow-xl
                                   bg-brand-linear transition-all duration-300
                                   hover:brightness-125 hover:scale-[1.02]
                                   active:scale-[0.98] 
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   flex justify-center items-center gap-3"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Ingresando...</span>
                            </>
                        ) : (
                            'Entrar'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

