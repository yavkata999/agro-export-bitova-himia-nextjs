import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllProducts, getProductBySlug } from '@/lib/api';
import { Product } from '@/types';
import styles from '@/styles/Products.module.css';

export default function ProductDetail({ product }: { product: Product }) {
    if (!product) return <div>Продуктът не е намерен</div>;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bitova-himia.com';
    const productUrl = `${siteUrl}/products/${product.slug}`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Професионални препарати",
                "item": `${siteUrl}/products`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": product.name,
                "item": productUrl
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": [`${siteUrl}${product.imageUrl}`],
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Grupa INCO"
        },
        "category": product.category,
        "offers": {
            "@type": "AggregateOffer",
            "offerCount": "1",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "BGN"
        }
    };

    return (
        <>
            <Head>
                <title>{`${product.name} | Продукти на Grupa INCO`}</title>
                <meta name="description" content={`Поръчайте ${product.name} директно от официалния вносител на Grupa INCO за България. Отлични цени на едро и B2B доставки.`} />
                <link rel="canonical" href={productUrl} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            </Head>

            <div className={styles.detailContainer}>
                <div className={styles.imageColumn}>
                    <Image
                        src={product.imageUrl}
                        alt={`Професионален почистващ препарат на едро: ${product.name}`}
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
                        <Link href="/contact" className={styles.inquireBtn}>Направете запитване за доставки</Link>
                        <Link href="/distributors" className={styles.distributorLink}>Търговец на едро? Станете наш дистрибутор</Link>
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