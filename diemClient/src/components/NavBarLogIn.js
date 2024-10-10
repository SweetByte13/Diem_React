import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBarLogIn() {
    const navigate = useNavigate();
    function handleSignUpClick(e){
        navigate("/signup")
    }
    function handleLogInClick(e){
        navigate("/login")
    }

    return (
        <Disclosure as="nav" className="border-l-indigo-950 outline">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center mr-96">
                            <img
                                alt="Your Company"
                                src="./favicon.ico"
                                className="h-12 w-auto rounded-full"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            onClick={(e) => handleSignUpClick(e)}
                            type="button"
                            className="relative rounded-md bg-[#301934] p-2 pt-1 pb-1 text-white mr-4 hover:bg-{#5F4563} hover:bg-[#5F4563] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <>
                                Sign Up
                            </>
                        </button>
                        <br></br>
                        <button
                            onClick={(e) => handleLogInClick(e)}
                            type="button"
                            className="relative rounded-md bg-[#301934] p-2 pt-1 pb-1 text-white mr-4 hover:bg-[#5F4563] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <>
                                Log In
                            </>
                        </button>
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
