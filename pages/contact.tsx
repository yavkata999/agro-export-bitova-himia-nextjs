import Layout from '@/components/Layout';
import styles from '@/styles/Page.module.css';

export default function ContactPage() {
  return (
    <Layout title="Контакти | Битова Химия ООД" description="Свържете се с търговския екип на Битова Химия ООД.">
      <section className={styles.section}>
        <h1>Контакти</h1>
        <p>За търговски запитвания и дистрибуторство: <a href="mailto:office@bitova-himia.com">office@bitova-himia.com</a></p>
        <p>Телефон: <a href="tel:+359000000000">+359 000 000 000</a></p>
      </section>
    </Layout>
  );
}
