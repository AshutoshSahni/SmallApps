import { useState } from 'react';
import type { AuthResponse, RegisterRequest, } from '../../types/Register';
import { RegisterUser, AuthService } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        const registerRequest: RegisterRequest = {
            Username: username,
            Email: email,
            Password: password
        };

        try {
            const authResponse: AuthResponse = await RegisterUser(registerRequest);
            AuthService.setAuth(authResponse);

            // navigate to NotesApp
            navigate('/notes');



        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen gap-6'>
            <div className='text-3xl leading-0.5'><span className='font-extralight'>Welcome to </span><span className='font-bold'>SmallApps!</span></div>
            <span className='text-lg text-gray-600'>Signup to continue...</span>
            <div className='w-full max-w-md'>
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <div className='flex flex-col gap-4 p-6 rounded-md shadow-normal dark:shadow-glow w-full'>
                    <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" label="Register" />
                </div>
            </form>

            <div className='flex flex-col mt-5 gap-2 w-full'>
                <div className='p-2 text-right text-sm text-gray-600'>Already have an account? </div>
                <Button styles="font-bold" type="button" label="Login" onClick={() => navigate('/')} />
            </div>
</div>
        </div>
    )
}

export default Register