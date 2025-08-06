"use client";
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

function Signup() {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        conditions: false,
    };
    const [formData, setFormData] = useState(initialFormData);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formData.conditions) {
            toast.error('You must agree to the terms and conditions');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const { firstName, lastName, email, password, role } = formData;
        const name = `${firstName} ${lastName}`;

        // 4. Use toast.promise to handle the API call states
        const signupPromise = axios.post('http://127.0.0.1:8000/auth/signup', {
            name,
            email,
            password,
            role
        });

        toast.promise(
            signupPromise,
            {
                loading: 'Creating your account...',
                success: (res) => res.data.message || "Signup successful! Please check your email.",
                error: (err: AxiosError<{ message: string }>) => {
                    return err.response?.data?.message || 'Signup failed. Please try again.';
                }
            }
        )
            .then(() => {
                setFormData(initialFormData);
            })
            .catch((err) => {
                console.error("Signup failed:", err);
            });
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