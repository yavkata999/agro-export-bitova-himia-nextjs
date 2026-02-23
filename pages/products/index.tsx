import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllProducts } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import styles from '@/styles/Products.module.css';

export default function Products({ products }: { products: Product[] }) {
    return (
        <>
            <Head>
                <title>Каталог продукти Grupa INCO | Bitova-Himia</title>
                <meta name="description" content="Пълен каталог с професионални препарати и битова химия от Grupa INCO. Цени на едро директно от официалния вносител за България." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://bitova-himia.com'}/products`} />
            </Head>

            <div className={styles.container}>
                <h1 className={styles.title}>Оригинални продукти на Grupa INCO</h1>
                <p className={styles.subtitle} style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--color-text-muted)' }}>
                    Разгледайте пълната ни гама от европейска битова химия. Гарантиран произход и качество от производителя.
                </p>

                <div className={styles.grid}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const products = getAllProducts();
    return { props: { products } };
};