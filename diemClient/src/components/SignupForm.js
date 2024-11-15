import React, { useContext, useState } from "react";
import { AppContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

function SignupForm() {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validationSchema = yup.object().shape({
        username: yup.string().min(5, "Username must be five characters or longer.").max(30, "Username can not be more than thirty characters."),
        email: yup.string().email("Invalid email address").min(8, "Must be a valid email address"),
        password: yup.string().min(6, "Password must be six characters or more.").max(20, "Password can not be longer than twenty characters."),
        confirmPassword: yup.string().oneOf([yup.ref('password')], "Password does not match"),
    });

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    };

    function handleSignupFormSubmit(e) {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
            email: email
        };

        fetch("/api/signup", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                alert('Invalid credentials');
                throw new Error('Invalid credentials');
            }
        }).then((user) => {
            setUser(user);
            navigate("/calendar");
        }).catch((error) => console.error('Error:', error));
    }

    return (
        <div className="min-w-screen min-h-screen bg-[#251627] flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
                <div className="flex"></div>
                <div className="md:flex w-full">
                    <div className="w-full py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">WELCOME TO DIEM</h1>
                            <p>Enter your information to register</p>
                        </div>
                        <form onSubmit={handleSignupFormSubmit}>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="ml-56 w-1/2 px-3 mb-5">
                                        <label htmlFor="username" className="text-xs font-semibold px-1">Username</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input type="text" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="JohnSmith123" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="ml-56 w-1/2 px-3 mb-5">
                                        <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input type="email" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="ml-56 w-1/2 px-3 mb-5">
                                        <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input type="password" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="ml-56 w-1/2 px-3 mb-5">
                                        <label htmlFor="confirmPassword" className="text-xs font-semibold px-1">Confirm Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input type="password" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button type="submit" className="block w-full max-w-xs mx-auto bg-[#301934] hover:bg-[#5F4563] focus:bg-[#8E718F] text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                                    </div>
                                </div>
                                <div className="ml-80 w-1/2 px-3 mb-5">
                                    <span>
                                        Already have an account?
                                        <a href="/login" className="text-xs ml-2 text-blue-500 font-semibold">Log In Now</a>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
