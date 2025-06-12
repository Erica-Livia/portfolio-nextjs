import React, { useState } from 'react';

function Signup() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        conditions: false,
    });

    // State for errors
    const [error, setError] = useState('');

    // Handle input change
    function handleChange(e: any) {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    // Form submit handler
    async function handleSubmit(e: any) {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.conditions) {
            setError('You must agree to the terms and conditions');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // API to register user
            const res = await fetch('http://127.0.0.1:8000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.message || 'Failed to register');
                return;
            }

            // On success, redirect user or show message
            window.location.href = '/admin';
        } catch (err) {
            setError('Something went wrong');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="items-center" onSubmit={handleSubmit}>

                <label htmlFor="firstName" className="text-[16px] text-grey">First name</label><br/>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-grey text-black text-[18px] w-90"
                    required
                /><br/>

                <label htmlFor="lastName" className="text-[16px] text-grey">Last name</label><br/>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-grey text-black  text-[18px] w-90"
                    required
                /><br/>

                <label htmlFor="email" className="text-[16px] text-grey">Email</label><br/>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-grey text-black  text-[18px] w-90"
                    required
                /><br/>

                <label htmlFor="password" className="text-[16px] text-grey">Password</label><br/>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-grey text-black  text-[18px] w-90"
                    required
                /><br/>

                <label htmlFor="confirmPassword" className="text-[16px] text-grey">Confirm Password</label><br/>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-grey text-black  text-[18px] w-90"
                    required
                /><br/>

                <div className="flex w-[300px] gap-2 pt-8">
                    <input
                        type="checkbox"
                        id="conditions"
                        name="conditions"
                        checked={formData.conditions}
                        onChange={handleChange}
                        value="Yes"
                        required
                    />
                    <label htmlFor="conditions" className="text-[14px] leading-none items-center">
                        By ticking this box, I certify that I have read and understood the terms & conditions of this platform.
                    </label>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

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
