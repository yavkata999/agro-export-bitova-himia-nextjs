import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllProducts, getProductBySlug } from '@/lib/api';
import { Product } from '@/types';
import styles from '@/styles/Products.module.css';

export default function ProductDetail({ product }: { product: Product }) {
    if (!product) return <div>Продуктът не е намерен</div>;

    return (
        <>
            <Head>
                <title>{`${product.name} | Агро Експорт-Импорт`}</title>
                <meta name="description" content={product.description.substring(0, 160)} />
            </Head>

            <div className={styles.detailContainer}>
                <div className={styles.imageColumn}>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={600}
                        height={600}
                        className={styles.detailImage}
                        priority
                    />
                </div>
                <div className={styles.infoColumn}>
                    <span className={styles.detailCategory}>{product.category}</span>
                    <h1 className={styles.detailTitle}>{product.name}</h1>
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }} />
                    <div className={styles.actionArea}>
                        <Link href="/contact" className={styles.inquireBtn}>Направете запитване</Link>
                        <Link href="/distributors" className={styles.distributorLink}>Интересувате се от цени на едро?</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllProducts().map((product) => ({
        params: { slug: product.slug },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const product = getProductBySlug(params?.slug as string);
    return { props: { product } };
};