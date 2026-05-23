const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface RegisterData {
    alias: string;
    password: string;
    avatar: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    userId?: string;
    token?: string;
}

export async function registerUser(data: RegisterData): Promise<RegisterResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error en el registro');
        }

        const result: RegisterResponse = await response.json();
        return result;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error desconocido en el registro');
    }
}