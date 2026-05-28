const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface LoginData {
    alias: string;
    password: string;
}

export interface LoginUser {
    id_usuario: number;
    alias: string;
    avatar_url: string;
    fecha_registro: string;
}

export interface LoginResponse {
    message: string;
    user: LoginUser;
    token: string;
}

export async function loginUserService(data: LoginData): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alias: data.alias,
                password_hash: data.password,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error en el inicio de sesión');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error desconocido en el inicio de sesión');
    }
}
