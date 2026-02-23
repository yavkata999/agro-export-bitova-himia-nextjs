import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { getFeaturedProducts } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function Home({ featuredProducts }: { featuredProducts: Product[] }) {
  return (
    <>
      <Head>
        <title>Битова Химия | Агро Експорт-Импорт</title>
        <meta name="description" content="Екологични решения за почистване за блестящ дом. Търговия на едро и дребно с био препарати." />
      </Head>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Професионални решения за чистота</h1>
          <p className={styles.heroSubtitle}>Висококачествена битова химия и екологични препарати за дома и бизнеса.</p>
          <div className={styles.heroActions}>
            <Link href="/distributors" className={styles.primaryBtn}>Станете дистрибутор</Link>
            <Link href="/products" className={styles.secondaryBtn}>Разгледай каталога</Link>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Популярни продукти</h2>
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link href="/products" className={styles.outlineBtn}>Всички продукти</Link>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      featuredProducts: getFeaturedProducts(),
    },
  };
}