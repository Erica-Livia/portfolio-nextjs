"use client"
import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const res = await fetch('http://127.0.0.1:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token);

                if (typeof window !== 'undefined') {
                    if (data.role === 'admin') {
                        window.location.href = '/';
                    } else {
                        window.location.href = '/admin/dashboard';
                    }
                }
            } else {
                const errData = await res.json();
                setErrorMsg(errData.message || 'Login failed');
            }
        } catch (error) {
            setErrorMsg('Network error');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="items-center" onSubmit={handleSubmit}>

                <label htmlFor="email" className="text-[16px] text-grey">Email</label><br/>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-grey text-black text-[18px] w-90"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br/>

                <label htmlFor="password" className="text-[16px] text-grey">Password</label><br/>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-grey text-black text-[18px] w-90"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/>

                {errorMsg && <p className="text-red-500">{errorMsg}</p>}

                <button
                    type="submit"
                    className="bg-gray w-full my-8 text-white border border-white px-6 py-2 rounded-xl text-[18px] font-bold hover:bg-green hover:text-black hover:border-green cursor-pointer transition-colors duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
