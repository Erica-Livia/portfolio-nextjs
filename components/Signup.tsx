"use client";
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        conditions: false,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.conditions) {
            setError('You must agree to the terms and conditions');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { firstName, lastName, email, password, role } = formData;
            const name = `${firstName} ${lastName}`;

            const res = await axios.post('http://127.0.0.1:8000/auth/signup', {
                name,
                email,
                password,
                role
            });

            if (res.status === 201) {
                setSuccess("Signup successful! Please check your email to verify your account.");
                // Optionally redirect:
                // window.location.href = '/verify-pending';
            }
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong');
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="items-center" onSubmit={handleSubmit}>

                <label htmlFor="firstName" className="text-[16px] text-grey">First name</label><br />
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-grey text-black text-[18px] w-90"
                    required
                /><br />

                <label htmlFor="lastName" className="text-[16px] text-grey">Last name</label><br />
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-grey text-black text-[18px] w-90"
                    required
                /><br />

                <label htmlFor="email" className="text-[16px] text-grey">Email</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-grey text-black text-[18px] w-90"
                    required
                /><br />

                <label htmlFor="password" className="text-[16px] text-grey">Password</label><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-grey text-black text-[18px] w-90"
                    required
                /><br />

                <label htmlFor="confirmPassword" className="text-[16px] text-grey">Confirm Password</label><br />
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-grey text-black text-[18px] w-90"
                    required
                /><br />

                <div className="flex w-[300px] gap-2 pt-8">
                    <input
                        type="checkbox"
                        id="conditions"
                        name="conditions"
                        checked={formData.conditions}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="conditions" className="text-[14px] leading-none items-center">
                        By ticking this box, I certify that I have read and understood the terms & conditions of this platform.
                    </label>
                </div>

                {error && <p className="text-red-500 mt-2 w-96">{error}</p>}
                {success && <p className="text-green-500 mt-2 w-96">{success}</p>}

                <button
                    type="submit"
                    className="bg-gray w-full my-8 text-white border border-white px-6 py-2 rounded-xl text-[18px] font-bold hover:bg-green hover:text-black hover:border-green cursor-pointer transition-colors duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Signup;
