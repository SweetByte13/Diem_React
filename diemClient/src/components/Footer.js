import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/Context";
import ModalSupport from "./ModalSupport";

function Footer() {
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <footer className="w-full pt-7 pb-2">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <a className="flex justify-center">
                        <img src="./favicon.ico" className="size-36 flex justify-center rounded-full" />
                    </a>
                    <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-6 mb-6 border-b border-gray-300">
                        <li><a className="text-gray-800 hover:text-gray-900" href="/">Home</a></li>
                        {user === null || user === undefined ? <li><a className=" text-gray-800 hover:text-gray-900" href="/signup">Sign Up</a></li> : ""}
                        {user === null || user === undefined ? "" : <li><a className=" text-gray-800 hover:text-gray-900">Habits</a></li>}
                        {user === null || user === undefined ? "" : <li><a className=" text-gray-800 hover:text-gray-900">Calender</a></li>}
                        {user === null || user === undefined ? "" : <li><a className=" text-gray-800 hover:text-gray-900">Account</a></li>}
                        <li><a className=" text-gray-800 hover:text-gray-900 hover:cursor-pointer" onClick={openModal}>Support</a></li>
                    </ul>
                    {isModalOpen && <ModalSupport closeModal={closeModal} />}
                    <span className="text-lg text-gray-500 text-center block">© Diem 2024, All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
};
export default Footer;