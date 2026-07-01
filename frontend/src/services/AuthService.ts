import type { RegisterRequest, AuthResponse, LoginRequest } from '../types/Register';
import { BASE_URL } from './GlobalVariables';

//#region REGISTER SERVICE
export const RegisterUser = async (
    register: RegisterRequest
): Promise<AuthResponse> => {

    const response = await fetch(`${BASE_URL}Auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(register)
    });

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    return await response.json();
}
//#endregion

//#region LOGIN SERVICE
export const LoginUser = async (login: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}Auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    });
    if (!response.ok) {
        throw new Error('Failed to login user');
    }
    return await response.json();
}
//#endregion

// #region AUTH SERVICE
export const AuthService = {
    setAuth(auth: AuthResponse) {
        localStorage.setItem("token", auth.token);
        localStorage.setItem("email", auth.email);
        localStorage.setItem("roles", JSON.stringify(auth.roles));
    },  

    getToken() {
        return localStorage.getItem("token");
    },

    getEmail() {
        return localStorage.getItem("email");
    },

    getRoles() {
        const roles = localStorage.getItem("roles");
        return roles ? JSON.parse(roles) : [];
    },

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("roles");
    },

    isAuthenticated() {
        return !!localStorage.getItem("token");
    }
};
// #endregion