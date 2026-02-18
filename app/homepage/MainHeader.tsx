"use client";

import React from "react";
import styles from "./header.module.css";

// Placeholder for now, can be expanded if needed
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps { }

export default function MainHeader({ }: HeaderProps) {
    // Basic navigation or actions can be added here

    return (
        <header className={styles.header} id="header-section">
            <div className={styles.headerLeft}>
                {/* Logo and Project Name */}
                <div className={styles.logoContainer}>
                    <div className={styles.logoIconWrapper}>
                        <svg
                            className={styles.logoIcon}
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
                    <span className={styles.projectName}>NEXTAPP</span>
                </div>
            </div>

            <div className={styles.headerCenter}>
                {/* Navigation Section */}
                <div className={styles.navSection}>
                    <span className={styles.navLink}>Features</span>
                    <span className={styles.navLink}>Use Cases</span>
                    <span className={styles.navLink}>Resources</span>
                    <span className={styles.navLink}>Pricing</span>
                </div>
            </div>

            <div className={styles.headerRight}>
                <button className={`${styles.btn} ${styles.btnLogin}`}>LOGIN</button>
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnPop}`}>GET STARTED</button>
            </div>
        </header>
    );
}
