import { useState } from "react";
import Link from "next/link";
import styles from "../styles/HeaderSimple.module.css";

const sections = [
  { id: "nachalo", label: "Начало" },
  { id: "kategorii", label: "Продукти" },
  { id: "distributor", label: "Дистрибутори" },
  { id: "kontakti", label: "Контакти" },
];

export function HeaderSimple() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Био Битова Химия
        </Link>
        <button
          className={styles.burger}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Отвори меню"
        >
          ☰
        </button>
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/#${section.id}`}
              className={styles.link}
              onClick={() => setIsOpen(false)}
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
