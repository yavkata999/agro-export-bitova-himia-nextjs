import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import styles from '@/styles/Page.module.css';

export default function ProductsPage() {
  return (
    <Layout title="Продукти | Битова Химия ООД" description="Каталог с продукти за битова и професионална употреба.">
      <section className={styles.section}>
        <h1>Каталог продукти</h1>
        <p>Всички артикули са налични за търговски обекти, регионални вериги и дистрибутори на едро.</p>
        <div className={styles.grid}>
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </Layout>
  );
}
