import Head from 'next/head';
import { getAllProducts, getAllCategories } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import styles from '@/styles/Products.module.css';

export default function Products({ products, categories }: { products: Product[], categories: string[] }) {
    return (
        <>
            <Head>
                <title>Каталог Продукти | Агро Експорт-Импорт</title>
                <meta name="description" content="Пълен каталог с предлаганата от нас битова химия и биологични препарати." />
            </Head>

            <div className={styles.container}>
                <h1 className={styles.title}>Продуктов каталог</h1>

                {categories.map((category) => {
                    const catProducts = products.filter(p => p.category === category);
                    if (catProducts.length === 0) return null;

                    return (
                        <section key={category} className={styles.categorySection}>
                            <h2 className={styles.categoryTitle}>{category}</h2>
                            <div className={styles.grid}>
                                {catProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )
                })}
            </div>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            products: getAllProducts(),
            categories: getAllCategories(),
        },
    };
}