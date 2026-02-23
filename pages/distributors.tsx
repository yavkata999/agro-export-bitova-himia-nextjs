import Head from 'next/head';
import styles from '@/styles/Distributors.module.css';
import formStyles from '@/styles/Form.module.css';
import { useEmailForm } from '@/hooks/useEmailForm';
import FormAlert from '@/components/FormAlert';

export default function Distributors() {
    const { handleSubmit, isLoading, isSuccess, error } = useEmailForm();

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

                    <div className={formStyles.formWrapper}>
                        {/* UPDATED UI MESSAGING */}
                        <h2>Форма за партньорство на едро</h2>
                        <p className={formStyles.formNote}>
                            Попълнете тази форма, ако представлявате бизнес и желаете да получавате цени на едро.
                            Наш търговски представител ще се свърже с Вас в най-кратък срок.
                        </p>

                        <FormAlert isSuccess={isSuccess} error={error} successMessage="Благодарим Ви за интереса! Наш представител ще се свърже с Вас скоро." />

                        <form onSubmit={handleSubmit} className={formStyles.form}>
                            <input type="hidden" name="form_type" value="НОВ ДИСТРИБУТОР" />

                            <div className={formStyles.formGroup}>
                                <label htmlFor="company">Име на фирмата *</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    required
                                    disabled={isLoading}
                                    minLength={2}
                                    maxLength={150}
                                />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_name">Лице за контакт *</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    required
                                    disabled={isLoading}
                                    minLength={2}
                                    maxLength={100}
                                    pattern="^[\p{L}\s\.\-]+$"
                                    title="Моля, въведете валидно име (само букви, интервали и тирета)"
                                />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_phone">Телефон *</label>
                                <input
                                    type="tel"
                                    id="user_phone"
                                    name="user_phone"
                                    required
                                    disabled={isLoading}
                                    pattern="^\+?[0-9\s\-\(\)]{5,20}$"
                                    title="Моля, въведете валиден телефонен номер"
                                />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_email">Email *</label>
                                <input
                                    type="email"
                                    id="user_email"
                                    name="user_email"
                                    required
                                    disabled={isLoading}
                                    maxLength={100}
                                />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="region">Регион на дейност</label>
                                <input
                                    type="text"
                                    id="region"
                                    name="region"
                                    disabled={isLoading}
                                    maxLength={100}
                                />
                            </div>
                            <button type="submit" className={formStyles.submitBtn} disabled={isLoading}>
                                {isLoading ? 'Изпращане...' : 'Изпрати запитване'}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}