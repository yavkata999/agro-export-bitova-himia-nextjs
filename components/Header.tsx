import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <Link href="/" onClick={closeMenu}>Битова Химия</Link>
                </div>

                <button
                    className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <Link href="/" onClick={closeMenu}>Начало</Link>
                    <Link href="/products" onClick={closeMenu}>Продукти</Link>
                    <Link href="/distributors" className={styles.highlight} onClick={closeMenu}>Дистрибутори</Link>
                    <Link href="/about" onClick={closeMenu}>За нас</Link>
                    <Link href="/contact" onClick={closeMenu}>Контакти</Link>
                </nav>
            </div>
        </header>
    );
}