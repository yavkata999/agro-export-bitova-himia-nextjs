import Head from 'next/head';
import styles from '@/styles/Contact.module.css';

export default function Contact() {
    return (
        <>
            <Head>
                <title>Контакти | Агро Експорт-Импорт</title>
                <meta name="description" content="Свържете се с Агро Експорт-Импорт ООД." />
            </Head>
            <div className={styles.container}>
                <h1 className={styles.title}>Контакти</h1>
                <div className={styles.grid}>
                    <div className={styles.infoCard}>
                        <h3>Офис и Данни за фактура</h3>
                        <p><strong>Агро Експорт-Импорт ООД</strong></p>
                        <p>ЕИК: 103164689</p>
                        <p>гр. Варна, ул. Иван Аксаков № 26</p>
                    </div>
                    <div className={styles.infoCard}>
                        <h3>Адрес за кореспонденция</h3>
                        <p>гр. Варна, ул. Орех №2</p>
                        <p><strong>Телефон:</strong> +359 895 64 61 64</p>
                        <p><strong>Email:</strong> agro_export@abv.bg</p>
                    </div>
                </div>
            </div>
        </>
    );
}