"use client"
import React, { useState } from "react";
import { SiGithub } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import emailjs from "emailjs-com";

function Footer() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [emailError, setEmailError] = useState("");

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setEmailError("");

        emailjs.send('service_2pki30o', 'template_cxkec5c', {
            name: formData.name,
            email: formData.email,
            message: formData.message
        }, 'HLc-IHhppbndQIspW')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert("Message sent successfully!");
            }, (err) => {
                console.error('FAILED...', err);
                alert("Failed to send the message. Please try again.");
            });

        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-black text-white m-0 px-4 lg:px-32" id="contact">
            <div className="flex flex-col pt-8 mb-12 pb-8 ">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="w-full lg:w-1/2 space-y-5">
                        <h2 className="text-white text-4xl lg:text-48px">Contact</h2>
                        <p className="text-grey text-18px">
                            I would love to hear about your project and how I could help. Please fill in the form, and I’ll get back to you as soon as possible.
                        </p>
                    </div>
                    <div className="forms w-full lg:w-1/3 mt-8 lg:mt-0">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    name="name"
                                    placeholder="NAME"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-darkGrey text-white border-b border-grey focus:outline-none"
                                />
                            </div>
                            <div>
                                <input
                                    name="email"
                                    placeholder="EMAIL"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-darkGrey text-white border-b border-grey focus:outline-none"
                                />
                                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="MESSAGE"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-darkGrey text-white border-b border-grey focus:outline-none h-28">
                                </textarea>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <button type="submit" className="text-white border-b border-b-green pb-2 hover:text-green">
                                    SEND MESSAGE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="md:flex justify-center md:justify-between text-24px pb-5 text-center space-y-8">
                <a href="/">ericalivia</a>
                <ul className="list-none flex gap-x-5 justify-center">
                    <li>
                        <a href="https://github.com/Erica-Livia/" target="_blank" rel="noopener noreferrer">
                            <SiGithub />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/erica-livia/" target="_blank" rel="noopener noreferrer">
                            <BsLinkedin />
                        </a>
                    </li>
                    <li>
                        <a href="https://x.com/BurundianLivia" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
