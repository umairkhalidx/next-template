"use client";

import React from "react";
import styles from "./footer.module.css";

export default function MainFooter() {
    return (
        <footer className={styles.footer} id="footer-section">
            <div className={styles.footerContent}>
                {/* Brand Section */}
                <div className={styles.footerBrand}>
                    <div className={styles.footerLogo}>
                        <div className={styles.logoIconWrapper}>
                            <svg className={styles.logoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className={styles.projectName}>NEXTAPP</span>
                    </div>
                    <p className={styles.footerTagline}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit<br />
                        Donec aliquam accumsan euismod. Nullam mauris ex, lobortis pharetra erat at, condimentum finibus turpis.
                    </p>
                </div>

                {/* Navigation Grid */}
                <div className={styles.footerNavGrid}>
                    <div className={styles.footerNavColumn}>
                        <h4>USE CASES</h4>
                        <ul>
                            <li><a href="#">Option 1</a></li>
                            <li><a href="#">Option 2</a></li>
                            <li><a href="#">Option 3</a></li>
                            <li><a href="#">Option 4</a></li>
                            <li><a href="#">Option 5</a></li>
                            <li><a href="#">Option 6</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerNavColumn}>
                        <h4>RESOURCES</h4>
                        <ul>
                            <li><a href="#">Option 1</a></li>
                            <li><a href="#">Option 2</a></li>
                            <li><a href="#">Option 3</a></li>
                            <li><a href="#">Option 4</a></li>
                            <li><a href="#">Option 5</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerNavColumn}>
                        <h4>COMPANY</h4>
                        <ul>
                            <li><a href="#">Option 1</a></li>
                            <li><a href="#">Option 2</a></li>
                            <li><a href="#">Option 3</a></li>
                            <li><a href="#">Option 4</a></li>
                            <li><a href="#">Option 5</a></li>
                        </ul>
                    </div>
                </div>

                {/* Socials & Status */}
                <div className={styles.footerBottomSection}>
                    <div className={styles.socialIcons}>
                        <a href="#" aria-label="Twitter">
                            <svg fill="currentColor" viewBox="0 0 24 24" className={styles.socialIcon}>
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <svg fill="currentColor" viewBox="0 0 24 24" className={styles.socialIcon}>
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>

                    <div className={styles.statusBadge}>
                        <span className={styles.statusDot}></span>
                        <span className={styles.statusLabel}>GLOBAL NETWORK STATUS:</span>
                        <span className={styles.statusValue}>OPERATIONAL</span>
                    </div>
                </div>

                <div className={styles.footerCopyright}>
                    <p>&copy; 2026 NEXTAPP STRATEGIC SYSTEMS. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
