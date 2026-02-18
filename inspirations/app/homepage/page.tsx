"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Homepage() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Check local storage or system preference on mount if desired, 
        // but for now default to light as requested or simple toggle.
        // For this demo, we'll just toggle.
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            // Ensure default is light if nothing saved
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <div className="layout-container">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="main-body" id="main-content">
                <h1 className="text-4xl font-bold mb-8 text-center pt-20">Welcome to Next App</h1>
                <p className="text-xl mb-12 text-center max-w-2xl">
                    A clean, modern start for your next big project.
                    Experience the smooth design and responsive layout.
                </p>

                {/* Dummy Content for Scroll */}
                <div className="space-y-8 w-full max-w-4xl">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="p-8 rounded-2xl bg-opacity-5 bg-gray-500 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <h3 className="text-2xl font-semibold mb-4">Section {item}</h3>
                            <p className="leading-relaxed opacity-80">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
