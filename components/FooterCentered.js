import Link from "next/link";
import styles from "../styles/FooterCentered.module.css";

export function FooterCentered() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>{new Date().getFullYear()} © Битова Химия</p>
        <Link href="/politika-za-zashtita-na-lichnite-danni">
          Политика за защита на личните данни
        </Link>
      </div>
    </footer>
  );
}
