import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Distributors.module.css';
import formStyles from '@/styles/Form.module.css';
import { useEmailForm } from '@/hooks/useEmailForm';
import FormAlert from '@/components/FormAlert';

export default function Distributors() {
    const { handleSubmit, isLoading, isSuccess, error } = useEmailForm();

    return (
        <>
            <Head>
                <title>Станете дистрибутор на Grupa INCO | Bitova-Himia.com</title>
                <meta name="description" content="Работете директно с ексклузивния вносител на Grupa INCO за България. Отлични маржове, гарантиран произход и защита на територия." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://bitova-himia.com'}/distributors`} />
            </Head>

            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Станете част от мрежата на Grupa INCO в България</h1>
                    <p className={styles.subtitle}>
                        Агро Експорт-Импорт ООД е <strong>ексклузивен вносител</strong>. Работейки с нас, Вие работите директно с производителя.
                    </p>
                </header>

                <section className={styles.content}>
                    <div className={styles.benefits}>
                        <h2>Защо да станете наш партньор?</h2>
                        <ul className={styles.list}>
                            <li><strong>Без прекупвачи:</strong> Получавате продуктите на Grupa INCO от първа ръка, което гарантира най-високия възможен марж за Вашия бизнес.</li>
                            <li><strong>Европейски сертификати:</strong> Висококачествена полска битова химия, отговаряща на всички стандарти на ЕС.</li>
                            <li><strong>Ексклузивност по региони:</strong> Предлагаме възможност за защитена търговска територия за сериозни партньори.</li>
                            <li><strong>Маркетингова подкрепа:</strong> Като официален представител, ние инвестираме в налагането на марката на национално ниво.</li>
                        </ul>

                        <h2>Подходящо партньорство за:</h2>
                        <ul className={styles.list}>
                            <li>Регионални дистрибуторски бази</li>
                            <li>Търговци на едро (B2B)</li>
                            <li>Снабдители на ХоРеКа и почистващи фирми</li>
                            <li>Локални вериги супермаркети</li>
                        </ul>
                    </div>

                    <div className={formStyles.formWrapper}>
                        <h2>B2B Форма за партньорство</h2>
                        <p className={formStyles.formNote}>
                            Заявете желание за дистрибуция и ще Ви изпратим пълна ценова листа на едро за продуктите на Grupa INCO.
                        </p>

                        <FormAlert isSuccess={isSuccess} error={error} />
                        <form onSubmit={handleSubmit} className={formStyles.form}>
                            {/* HIDDEN FIELD */}
                            <input type="hidden" name="form_type" value="ЗАЯВКА ЗА ДИСТРИБУТОР НА GRUPA INCO" />
                            {/* ... Формата остава същата както досега ... */}
                            <div className={formStyles.formGroup}>
                                <label htmlFor="company">Име на фирмата *</label>
                                <input type="text" id="company" name="company" required disabled={isLoading} />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_name">Лице за контакт *</label>
                                <input type="text" id="user_name" name="user_name" required disabled={isLoading} />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_phone">Телефон *</label>
                                <input type="tel" id="user_phone" name="user_phone" required disabled={isLoading} />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="user_email">Email *</label>
                                <input type="email" id="user_email" name="user_email" required disabled={isLoading} />
                            </div>
                            <div className={formStyles.formGroup}>
                                <label htmlFor="region">Регион на дейност</label>
                                <input type="text" id="region" name="region" disabled={isLoading} />
                            </div>
                            <button type="submit" className={formStyles.submitBtn} disabled={isLoading}>
                                {isLoading ? 'Изпращане...' : 'Заявете цени на едро'}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}