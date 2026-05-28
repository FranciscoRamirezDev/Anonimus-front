'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, RegisterData } from '@/services/register';



export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<RegisterData>({
        alias: '',
        password: '',
        avatar: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await registerUser(formData);
            
            if (response.success && response.token && response.userId) {
                router.push('/');
            } else {
                setError(response.message || 'Error en el registro');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">Registro</h1>
                
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white mb-2">Alias</label>
                        <input
                            type="text"
                            name="alias"
                            value={formData.alias}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="Tu alias"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-2">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="Tu contraseña"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-2">Avatar (URL)</label>
                        <input
                            type="url"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="URL de tu avatar"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    ¿Ya tienes cuenta?{' '}
                    <button
                        onClick={() => router.push('/login')}
                        className="text-blue-500 hover:underline"
                    >
                        Inicia sesión
                    </button>
                </p>
            </div>
        </div>
    );
}
