import Head from 'next/head';
import styles from '@/styles/Distributors.module.css';

export default function Distributors() {
    return (
        <>
            <Head>
                <title>Станете наш дистрибутор | Агро Експорт-Импорт</title>
                <meta name="description" content="Търсим дистрибутори за цялата страна. Изгодни условия за търговци на едро, регионални вериги и магазини." />
            </Head>

            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Разширете бизнеса си с нас</h1>
                    <p className={styles.subtitle}>Търсим надеждни дистрибутори и търговски партньори за територията на цяла България.</p>
                </header>

                <section className={styles.content}>
                    <div className={styles.benefits}>
                        <h2>Защо да изберете нас?</h2>
                        <ul className={styles.list}>
                            <li><strong>Високо качество:</strong> Доказани продукти от водещи европейски марки.</li>
                            <li><strong>Отлични маржове:</strong> Конкурентни цени на едро, гарантиращи висока рентабилност.</li>
                            <li><strong>Надеждност:</strong> Редовни доставки и постоянна наличност на склад.</li>
                            <li><strong>Ексклузивност:</strong> Възможност за регионално представителство за лоялни партньори.</li>
                        </ul>

                        <h2>Кого търсим?</h2>
                        <ul className={styles.list}>
                            <li>Регионални дистрибутори на едро</li>
                            <li>Търговски вериги и супермаркети</li>
                            <li>Специализирани магазини за домашни потреби</li>
                            <li>Снабдители на ХоРеКа сектора</li>
                        </ul>
                    </div>

                    <div className={styles.formContainer}>
                        <h2>Свържете се за оферта</h2>
                        <p className={styles.formNote}>Попълнете формата и наш представител ще се свърже с Вас за обсъждане на индивидуални условия.</p>
                        {/* cPanel compatible static form submission via standard mailto or simple action */}
                        <form action="mailto:agro_export@abv.bg" method="post" encType="text/plain" className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="company">Име на фирмата *</label>
                                <input type="text" id="company" name="company" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Лице за контакт *</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Телефон *</label>
                                <input type="tel" id="phone" name="phone" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="region">Регион на дейност</label>
                                <input type="text" id="region" name="region" />
                            </div>
                            <button type="submit" className={styles.submitBtn}>Изпрати запитване</button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}