import Link from 'next/link';
import styles from '@/styles/CookieBanner.module.css';

interface CookieBannerProps {
    onAccept: () => void;
    onDecline: () => void;
}

export default function CookieBanner({ onAccept, onDecline }: CookieBannerProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.banner}>
                <div className={styles.content}>
                    <h3 className={styles.title}>Ние ценим вашата поверителност</h3>
                    <p className={styles.text}>
                        Използваме бисквитки (cookies), за да анализираме трафика и да подобрим вашето преживяване на нашия B2B портал.
                        С натискането на "Приемам", вие се съгласявате с нашата{' '}
                        <Link href="/politika-za-zashtita-na-lichnite-danni" className={styles.link}>
                            Политика за поверителност
                        </Link>.
                    </p>
                </div>
                <div className={styles.actions}>
                    <button onClick={onDecline} className={styles.declineBtn}>
                        Отказвам
                    </button>
                    <button onClick={onAccept} className={styles.acceptBtn}>
                        Приемам всички
                    </button>
                </div>
            </div>
        </div>
    );
}