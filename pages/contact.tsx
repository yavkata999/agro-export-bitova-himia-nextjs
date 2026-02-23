import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Contact.module.css';
import formStyles from '@/styles/Form.module.css';
import { useEmailForm } from '@/hooks/useEmailForm';
import FormAlert from '@/components/FormAlert';

export default function Contact() {
    const { handleSubmit, isLoading, isSuccess, error } = useEmailForm();

    return (
        <>
            <Head>
                <title>Контакти | Официален вносител на Grupa INCO | Bitova-Himia</title>
                <meta name="description" content="Свържете се с Bitova-Himia.com (Агро Експорт-Импорт ООД) - официален вносител и дистрибутор на продуктите на Grupa INCO за България." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://bitova-himia.com'}/contact`} />
            </Head>
            <div className={styles.container}>
                <h1 className={styles.title}>Свържете се с нас</h1>
                <p className={styles.subtitle}>Имате въпроси относно продуктите на Grupa INCO? Нашият екип е на Ваше разположение.</p>

                {/* ... Останалата част от кода остава абсолютно същата ... */}
                <div className={styles.grid}>
                    <div className={styles.infoColumn}>
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

                    <div className={formStyles.formWrapper}>
                        <h2>Форма за общи запитвания</h2>
                        <p className={formStyles.formNote}>
                            Използвайте тази форма за въпроси относно продукти, наличности или обща информация за крайни клиенти.
                            Ако сте търговец, моля, използвайте <Link href="/distributors" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>B2B формата за дистрибутори</Link>.
                        </p>

                        <FormAlert isSuccess={isSuccess} error={error} />
                        <form onSubmit={handleSubmit} className={formStyles.form}>
                            <input type="hidden" name="form_type" value="ОБЩО ЗАПИТВАНЕ ОТ КЛИЕНТ" />

                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_name">Име *</label>
                                <input type="text" id="user_name" name="user_name" required disabled={isLoading} minLength={2} maxLength={100} pattern="^[\p{L}\s\.\-]+$" title="Моля, въведете валидно име" />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_email">Email *</label>
                                <input type="email" id="user_email" name="user_email" required disabled={isLoading} maxLength={100} />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_phone">Телефон</label>
                                <input type="tel" id="user_phone" name="user_phone" disabled={isLoading} pattern="^\+?[0-9\s\-\(\)]{5,20}$" title="Моля, въведете валиден телефонен номер" />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="message">Съобщение *</label>
                                <textarea id="message" name="message" rows={5} required disabled={isLoading} minLength={10} maxLength={1000}></textarea>
                            </div>
                            <button type="submit" className={formStyles.submitBtn} disabled={isLoading}>
                                {isLoading ? 'Изпращане...' : 'Изпрати запитване'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}