import styles from '@/styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.companyInfo}>
                    <strong>Агро Експорт-Импорт ООД</strong>
                    <p>гр. Варна, ул. Иван Аксаков № 26</p>
                    <p>Email: agro_export@abv.bg</p>
                </div>
                <div className={styles.links}>
                    <Link href="/distributors">Станете Дистрибутор</Link>
                    <Link href="/contact">Контакти</Link>
                    <Link href="/politika-za-zashtita-na-lichnite-danni">Политика за поверителност</Link>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Агро Експорт-Импорт ООД. Всички права запазени.
            </div>
        </footer>
    );
}