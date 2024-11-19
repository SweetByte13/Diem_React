import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { AppContext } from "../context/Context";

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Habits', href: '/habits', current: false },
    { name: 'Statistics', href: '#', current: false },
    {
        name: 'Calendar', href: '/calendar', current: false,
        submenu: [
            { name: 'Daily', href: "/daily" },
            { name: 'Weekly', href: "/weekly" },
            { name: 'Monthly', href: "/monthly" }
        ]
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
    const navigate = useNavigate();
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    // useEffect(() => {
    //     // Check if user is logged in by checking session or authentication state
    //     const checkLoginStatus = async () => {
    //         try {
    //             const response = await fetch("http://localhost:5555/check_session", {
    //           
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUser(data.user);
    //             } else {
    //                 setUser(null);
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //             setUser(null);
    //         }
    //     };

    //     checkLoginStatus();
    // }, []);

    function handleLogout() {
        fetch("http://localhost:5555/logout", {
            method: 'DELETE',
        })
            .then((resp) => {
                if (resp.ok) {
                    setUser(null);
                    navigate("/"); // Navigate to the Home page after logout
                } else {
                    alert('Failed to log out');
                    throw new Error('Failed to log out');
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    function handleSignUpClick(e) {
        navigate("/signup");
    }

    function handleLogInClick(e) {
        navigate("/login");
    }

    return (
        <Disclosure as="nav" className="border-l-indigo-950 outline">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
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
                        {user && (
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex items-center space-x-4">
                                    {navigation.map((item) => (
                                        item.submenu ? (
                                            <div className="relative group" key={item.name}>
                                                <a
                                                    href={item.href}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    className={classNames(
                                                        item.current,
                                                        'no-underline text-black hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                                <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-md mt-2 z-50">
                                                    {item.submenu.map((subItem) => (
                                                        <a
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            {subItem.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.current,
                                                    'no-underline text-black hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {user!== null && user!==undefined ? (
                            <>
                                <button
                                    type="button"
                                    className="relative rounded-full bg-[#301934] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt=""
                                                src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <MenuItem>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Your Profile
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Settings
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Sign out
                                            </a>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={(e) => handleSignUpClick(e)}
                                    type="button"
                                    className="relative rounded-md bg-[#301934] p-2 pt-1 pb-1 text-white mr-4 hover:bg-[#5F4563] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    Sign Up
                                </button>
                                <button
                                    onClick={handleLogInClick}
                                    type="button"
                                    className="relative rounded-md bg-[#301934] p-2 pt-1 pb-1 text-white mr-4 hover:bg-[#5F4563] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    Log In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        item.submenu ? (
                            <DisclosureButton key={item.name} className="block w-full text-left">
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <DisclosureButton
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block rounded-md px-3 py-2 text-base font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                            <DisclosurePanel className="space-y-1">
                                                {item.submenu.map((subItem) => (
                                                    <DisclosureButton
                                                        key={subItem.name}
                                                        as="a"
                                                        href={subItem.href}
                                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                                    >
                                                        {subItem.name}
                                                    </DisclosureButton>
                                                ))}
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                            </DisclosureButton>
                        ) : (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        )
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
