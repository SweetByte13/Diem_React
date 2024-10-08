import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/Context";
import { AdjustmentsHorizontalIcon, CalendarDateRangeIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import Header from "../components/Header";

function Home() {
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    return (
        <>
            <body>
                <Header />
                <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <svg
                            aria-hidden="true"
                            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                        >
                            <defs>
                                <pattern
                                    x="50%"
                                    y={-1}
                                    id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                                    width={200}
                                    height={200}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                                </pattern>
                            </defs>
                            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                                <path
                                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                    strokeWidth={0}
                                />
                            </svg>
                            <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
                        </svg>
                    </div>
                    <div className="">
                        <div className="pl-96 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl">
                            <div className="lg:pr-4">
                                <div className="lg:max-w-lg">
                                    <p className="text-base font-semibold leading-7 text-indigo-600">About Diem...</p>
                                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better habit tracking app</h1>
                                    <p className="mt-6 text-xl leading-8 text-gray-700">
                                        Diem is a daily habit tracker that is changing the game!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">

                        </div>
                        <div className="pl-96 lg:mx-auto lg:w-full lg:max-w-7xl">
                            <div className="lg:pr-4">
                                <div className="max-w-xl text-base  leading-7 text-gray-700 lg:max-w-lg">
                                    <p className="text-justify">
                                        Diem is a comprehensive habit tracking application designed to help you build and maintain positive habits.
                                        It offers a variety of views, including monthly, weekly, and daily, allowing you to easily track your progress over time.
                                        As you complete each habit, you can check it off, providing a sense of accomplishment.

                                    </p>
                                    <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                        <li className="flex gap-x-3">
                                            <PencilSquareIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                                            <span>
                                                <strong className="font-semibold text-gray-900">Tracking habits.</strong>
                                            </span>
                                        </li>
                                        <li className="flex gap-x-3">
                                            <CalendarDateRangeIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                                            <span>
                                                <strong className="font-semibold text-gray-900">View habits.</strong>
                                            </span>
                                        </li>
                                        <li className="flex gap-x-3">
                                            <AdjustmentsHorizontalIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                                            <span>
                                                <strong className="font-semibold text-gray-900">Check metrics.</strong>
                                            </span>
                                        </li>
                                    </ul>
                                    <p className="text-justify mt-8">
                                        Diem also provides detailed statistics on your habits, showing you how far you’ve come and how close you are to achieving your goals.
                                        The app sends notifications to remind you to complete your habits, encouraging consistency and habit change.
                                        With Diem, you can track all your habits in one place and are encouraged to add new habits to continuously improve your lifestyle.
                                    </p>
                                    <h2 className="text-justify mt-16 text-2xl font-bold tracking-tight text-gray-900">No motivation? No problem.</h2>
                                    <p className="text-justify mt-6">
                                        Diem is designed to tackle the challenge of lack of motivation by providing timely notifications of encouragement.
                                        These reminders help keep you on track and motivated to complete your habits. By consistently checking off habits and seeing your progress,
                                        Diem teaches you how to build consistency and discipline.
                                        This approach helps you develop a routine that becomes second nature, making it easier to stick to your habits even when motivation wanes.
                                        With Diem, you learn that consistency and discipline are key to achieving your goals, ultimately helping you circumvent the need for constant motivation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}
export default Home;