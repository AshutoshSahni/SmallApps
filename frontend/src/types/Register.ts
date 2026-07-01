export interface RegisterRequest {
    Username: string;
    Email: string;
    Password: string;
}

export interface AuthResponse {
    token: string;
    email: string;
    roles: string[];
}

export interface LoginRequest {
    Email: string;
    Password: string;
}