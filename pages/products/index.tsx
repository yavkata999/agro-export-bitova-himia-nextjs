import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllProducts } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import styles from '@/styles/Products.module.css';

// 1. Define the descriptions for each brand/category
const categoryDescriptions: Record<string, string> = {
    "Ludwik": "Легендарно полско качество. Пълна гама препарати за съдове, съдомиялни машини и специализирано почистване.",
    "БИОстар": "Премиум екологична линия със сертификат EU Ecolabel. Натурални съставки и пробиотици за безопасно почистване.",
    "Биофос": "Професионални биологични препарати и активни бактерии за септични ями, пречиствателни станции и канализации.",
    "Flesz": "Универсални почистващи препарати за подове и големи повърхности. Идеални за дома и ХоРеКа сектора.",
    "VAST": "Фини микропрахове за безкомпромисно премахване на ръжда, варовик и упорити замърсявания без надраскване.",
    "ABE": "Дерматологично тествани течни сапуни и хигиенни продукти, обогатени с витамини и подхранващи екстракти.",
    "Lucek": "Бюджетната линия на Grupa INCO. Отлично качество и измиваща способност на изключително достъпна цена."
};

export default function Products({ products }: { products: Product[] }) {
    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    const categoryOrder = ["Ludwik", "БИОстар", "Биофос", "Flesz", "VAST", "ABE", "Lucek"];

    const sortedCategories = Object.keys(groupedProducts).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
    });

    return (
        <>
            <Head>
                <title>Каталог продукти Grupa INCO | Bitova-Himia</title>
                <meta name="description" content="Пълен каталог с професионални препарати и битова химия от Grupa INCO. Цени на едро директно от официалния вносител за България." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://bitova-himia.com'}/products`} />
            </Head>

            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.title}>B2B Каталог на Grupa INCO</h1>
                    <p className={styles.subtitle}>
                        Като ексклузивен дистрибутор, ние предоставяме директен достъп до пълната гама почистващи препарати на водещия полски производител.
                    </p>
                </div>

                {/* STICKY QUICK NAVIGATION */}
                <nav className={styles.categoryNavWrapper}>
                    <div className={styles.categoryNav}>
                        {sortedCategories.map((category) => (
                            <a key={`nav-${category}`} href={`#${category}`} className={styles.navPill}>
                                {category}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* CATEGORY SECTIONS */}
                {sortedCategories.map((category) => (
                    <section id={category} key={category} className={styles.categorySection}>
                        <div className={styles.sectionInfo}>
                            <div className={styles.categoryHeader}>
                                <h2 className={styles.categoryTitle}>{category}</h2>
                                <div className={styles.categoryDivider}></div>
                            </div>
                            {categoryDescriptions[category] && (
                                <p className={styles.categoryDesc}>
                                    {categoryDescriptions[category]}
                                </p>
                            )}
                        </div>

                        <div className={styles.grid}>
                            {groupedProducts[category].map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const allProducts = getAllProducts();

    const products = allProducts.map((product) => ({
        id: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        imageUrl: product.imageUrl,
        shortDescription: product.shortDescription || null,
        seoDescription: product.seoDescription || null,
        description: product.description ? product.description.substring(0, 120) : "",
        seoTitle: product.seoTitle || null,
    }));

    return { props: { products } };
};