"use client";

import React, { useState } from "react";
import AuthModal from "../components/AuthModal";

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

    const handleLoginClick = () => {
        setAuthModalTab('login');
        setIsAuthModalOpen(true);
    };

    const handleSignupClick = () => {
        setAuthModalTab('signup');
        setIsAuthModalOpen(true);
    };

    return (
        <>
            <header className="header" id="header-section">
                <div className="header-left">
                    {/* Logo and Project Name */}
                    <div className="logo-container">
                        <div className="logo-icon-wrapper">
                            <svg
                                className="logo-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <span className="project-name">NEXTAPP</span>
                    </div>
                </div>

                <div className="header-center">
                    {/* Navigation Section */}
                    <div className="nav-section">
                        <span className="nav-link">Features</span>
                        <span className="nav-link">Use Cases</span>
                        <span className="nav-link">Resources</span>
                        <span className="nav-link">Pricing</span>
                    </div>
                </div>

                <div className="header-right">
                    <button className="btn btn-login" onClick={handleLoginClick}>LOGIN</button>
                    <button className="btn btn-primary btn-pop" onClick={handleSignupClick}>GET STARTED</button>

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                    >
                        {theme === "light" ? (
                            // Moon icon for Light mode
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        ) : (
                            // Sun icon for Dark mode
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                defaultTab={authModalTab}
            />
        </>
    );
}
