import Layout from '@/components/Layout';
import styles from '@/styles/Page.module.css';

export default function AboutPage() {
  return (
    <Layout title="За нас | Битова Химия ООД" description="Надежден български партньор за битова химия.">
      <section className={styles.section}>
        <h1>За Битова Химия ООД</h1>
        <p>Ние сме българска компания, фокусирана върху висококачествени решения за почистване и поддръжка. Работим с търговски партньори в цялата страна и изграждаме устойчиви канали за дистрибуция.</p>
      </section>
    </Layout>
  );
}
