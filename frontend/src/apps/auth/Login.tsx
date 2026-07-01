import { useState } from 'react';
import type { LoginRequest, AuthResponse, } from '../../types/Register';
import { AuthService, LoginUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const loginRequest: LoginRequest = {
            Email: email,
            Password: password
        };

        try {
            const authResponse: AuthResponse = await LoginUser(loginRequest);
            AuthService.setAuth(authResponse);
            navigate('/App');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen gap-6'>
            <div className='text-3xl leading-0.5'><span className='font-extralight'>Welcome to </span><span className='font-bold'>SmallApps!</span></div>
            <span className='text-lg text-gray-600'>Login to continue...</span>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className='w-full max-w-md'>
                <div className='flex flex-col gap-4 p-6 rounded-md shadow-normal dark:shadow-glow w-full'>
                    <div>
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                    </div>
                    <div>
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                    </div>
                    <div>
                        <Button type="submit" label="Login" />
                    </div>

                    <div>
                        <p className='p-2 text-right text-sm text-gray-600'>Don't have an account? </p>
                        <Button styles="font-bold" type="button" label="Register" onClick={() => navigate('/register')} />
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login;