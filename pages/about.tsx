import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function About() {
    return (
        <>
            <Head>
                <title>За нас | Изключителен представител на Grupa INCO | Bitova-Himia</title>
                <meta name="description" content="Агро Експорт-Импорт ООД е ексклузивен дистрибутор на продуктите на Grupa INCO (Полша) за територията на България." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://bitova-himia.com'}/about`} />
            </Head>
            <div style={{ maxWidth: 'var(--container-width)', margin: '4rem auto', padding: '0 20px' }}>
                <h1 style={{ color: 'var(--color-primary)', marginBottom: '2rem' }}>За Bitova-Himia.com</h1>
                <div style={{ lineHeight: '1.8', color: 'var(--color-text)' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Платформата <strong>Bitova-Himia.com</strong> е създадена и се управлява от <strong>Агро Експорт-Импорт ООД</strong> –
                        компания с дългогодишен опит и утвърдени позиции на българския пазар (повече за нас на <a href="https://agro-export.com/za-nas" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>agro-export.com</a>).
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        С гордост обявяваме, че сме <strong>изключителен (ексклузивен) представител и официален вносител</strong> на полския химически гигант <strong>Grupa INCO</strong> за територията на Република България.
                        Grupa INCO е водещ европейски производител с десетилетия история, известен със своите безкомпромисни стандарти за качество и иновации в сферата на битовата химия.
                    </p>
                    <h2 style={{ color: 'var(--color-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Нашата мисия</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Целта на Bitova-Himia.com е да наложи продуктите на Grupa INCO на българския пазар, като предостави на родните потребители и бизнеси достъп до европейско качество на конкурентни цени.
                        Ние скъсяваме веригата на доставки – от завода в Полша, директно до Вашия търговски обект.
                    </p>
                    <p>
                        Като единствен официален партньор на марката, ние търсим да изградим стабилна и дългосрочна мрежа от <strong>регионални дистрибутори и търговски партньори</strong> в цялата страна.
                    </p>
                </div>
            </div>
        </>
    );
}