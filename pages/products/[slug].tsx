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

    return (
        <>
            <Head>
                <title>{product.seoTitle || `${product.name} | Продукти на Grupa INCO`}</title>
                <meta name="description" content={product.seoDescription || `Поръчайте ${product.name} директно от официалния вносител.`} />
                <link rel="canonical" href={productUrl} />
            </Head>

            <div className={styles.detailContainer}>
                {/* Left Side: Sticky Image */}
                <div className={styles.imageColumn}>
                    <div className={styles.imageStickyWrapper}>
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className={styles.detailImage}
                            priority
                        />
                    </div>
                </div>

                {/* Right Side: Product Info */}
                <div className={styles.infoColumn}>
                    <div className={styles.tagsWrapper}>
                        <span className={styles.detailCategory}>{product.category}</span>
                        {product.brand && <span className={styles.brandTag}>{product.brand}</span>}
                    </div>

                    <h1 className={styles.detailTitle}>{product.name}</h1>

                    {/* Trust Badges - Crucial for B2B */}
                    <div className={styles.trustBadges}>
                        <span>✓ Директен внос</span>
                        <span>✓ Гарантиран произход</span>
                        <span>✓ Цени на едро</span>
                    </div>

                    {product.shortDescription && (
                        <p className={styles.shortDescription}>{product.shortDescription}</p>
                    )}

                    {product.keyBenefits && product.keyBenefits.length > 0 && (
                        <div className={styles.benefitsGrid}>
                            {product.keyBenefits.map((benefit, idx) => (
                                <div key={idx} className={styles.benefitItem}>
                                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.marketingDescription} dangerouslySetInnerHTML={{ __html: (product.marketingDescription || product.description).replace(/\n/g, '<br/>') }} />

                    {product.features && product.features.length > 0 && (
                        <div className={styles.featuresSection}>
                            <h3>Характеристики:</h3>
                            <ul className={styles.featuresList}>
                                {product.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {product.usageInstructions && (
                        <div className={styles.usageBox}>
                            <h3 className={styles.usageTitle}>Начин на употреба</h3>
                            <p>{product.usageInstructions}</p>
                        </div>
                    )}

                    {product.safetyDataSheetUrl && (
                        <a
                            href={product.safetyDataSheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.docBtn}
                        >
                            <svg className={styles.docIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Информационен лист за безопасност (ИЛБ)
                        </a>
                    )}

                    {/* B2B Action Buttons */}
                    <div className={styles.actionArea}>
                        <Link href="/contact" className={styles.primaryBtn}>
                            Запитване за оферта
                        </Link>
                        <Link href="/distributors" className={styles.secondaryBtn}>
                            Станете дистрибутор
                        </Link>
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