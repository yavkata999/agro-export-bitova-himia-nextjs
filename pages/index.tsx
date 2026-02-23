import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { getAllProducts, getAllCategories } from '@/lib/api';
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
            <Link href="/products" className={styles.primaryBtn}>Разгледай продуктите</Link>
            <Link href="/distributors" className={styles.secondaryBtn}>Стани дистрибутор</Link>
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
  const products = getAllProducts();
  const categories = getAllCategories();

  // Get 1 random product from each category
  const featuredProducts = categories.map(category => {
    // 1. Filter products belonging to the current category
    const catProducts = products.filter(p => p.category === category);

    // Safety check: if a category has no products, skip it
    if (catProducts.length === 0) return null;

    // 2. Pick a random index based on the number of products in this category
    const randomIndex = Math.floor(Math.random() * catProducts.length);

    // 3. Return that random product
    return catProducts[randomIndex];
  }).filter(Boolean) as Product[]; // Remove any nulls if a category was empty

  return {
    props: {
      featuredProducts,
    },
  };
}