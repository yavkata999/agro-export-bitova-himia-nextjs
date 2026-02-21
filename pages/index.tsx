import Link from 'next/link';
import Layout from '@/components/Layout';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import styles from '@/styles/Page.module.css';

export default function HomePage() {
  return (
    <Layout title="Битова Химия ООД | Професионални решения за чистота" description="Български производител и доставчик на битова химия с фокус върху дистрибуторски партньорства.">
      <section className={styles.hero}>
        <h1>Професионална битова химия за стабилен търговски растеж</h1>
        <p>Работим активно с нови дистрибутори в България и предлагаме доказани продукти, постоянни наличности и коректно обслужване.</p>
        <Link href="/distributors" className={styles.cta}>Стани дистрибутор</Link>
      </section>
      <section className={styles.section}>
        <h2>Популярни продукти</h2>
        <div className={styles.grid}>
          {products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </Layout>
  );
}
