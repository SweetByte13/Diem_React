import React, { useContext, useState } from "react";
import { AppContext } from "../context/Context";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        const user = {
            "username": username,
            "password": password
        }

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                alert('Invalid credentials');
                throw new Error('Invalid credentials');
            }
        })
        .then((user) => {
            setUser(user);
            console.log(user)
            navigate("/");
        })
        .catch((error) => console.error('Error:', error));
    }
    
    return (
        <div className="min-w-screen min-h-screen bg-[#251627] flex items-center justify-center px-5 py-5" >
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-1/2 overflow-hidden" style={{ maxWidth: '1000px' }}>
                <div className="flex ">
                </div>
                <div className="md:flex w-full">
                    <div className="w-full py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">WELCOME TO DIEM</h1>
                            <p>Enter your information to login</p>
                        </div>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="ml-52 w-1/2 mb-5">
                                        <label htmlFor="" className="text-xs font-semibold">Username</label>
                                        <div className="flex">
                                            <div className="-w-16 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input type="username" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="JohnSmith123" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="ml-52 w-1/2 mb-5">
                                        <label className="text-xs font-semibold">Password</label>
                                        <div className="flex">
                                            <div className="z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input type="password" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button type="submit" className="block max-w-xs mx-auto bg-[#301934] hover:bg-[#5F4563] focus:bg-[#8E718F] text-white rounded-lg px-3 py-3 font-semibold" >LOG IN</button>
                                    </div>
                                </div>
                                <div className="ml-48 w-1/2 px-3 mb-5">
                                    <span>
                                        Dont have an account?
                                        <a
                                            href="/signup"
                                            className="text-xs ml-2 text-blue-500 font-semibold"
                                        >Sign Up Now
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;