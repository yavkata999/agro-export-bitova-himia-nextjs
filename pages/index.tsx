import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { getFeaturedProducts } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function Home({ featuredProducts }: { featuredProducts: Product[] }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Агро Експорт-Импорт ООД - Bitova-Himia",
    "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://bitova-himia.com',
    "description": "Изключителен представител на Grupa INCO за България. Директен внос и търговия на едро с професионална битова химия.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+359895646164",
      "contactType": "sales",
      "areaServed": "BG",
      "availableLanguage": "Bulgarian"
    }
  };

  return (
    <>
      <Head>
        <title>Официален вносител на битова химия | Grupa INCO България</title>
        <meta name="description" content="Ексклузивен дистрибутор на Grupa INCO за България. Висококачествена битова химия директно от производителя. Търсим дистрибутори и партньори." />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://bitova-himia.com'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </Head>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Европейско качество директно от производителя</h1>
          <p className={styles.heroSubtitle}>
            <strong>Агро Експорт-Импорт ООД</strong> е изключителен представител на полския гигант <strong>Grupa INCO</strong> за България.
            Гарантиран произход, топ цени на едро и B2B партньорство.
          </p>
          <div className={styles.heroActions}>
            <Link href="/distributors" className={styles.primaryBtn}>Станете регионален дистрибутор</Link>
            <Link href="/products" className={styles.secondaryBtn}>Разгледайте каталога</Link>
          </div>
        </div>
      </section>

      <section className={styles.seoIntro} style={{ maxWidth: 'var(--container-width)', margin: '4rem auto', padding: '0 20px', textAlign: 'center' }}>
        <h2>Вашият директен достъп до продуктите на Grupa INCO</h2>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', marginTop: '1rem' }}>
          Чрез платформата <strong>bitova-himia.com</strong>, ние предоставяме директен достъп до пълната гама
          препарати на Grupa INCO (производители на утвърдени европейски марки).
          Като единствен официален вносител за страната, ние гарантираме на нашите B2B партньори
          най-добрите търговски условия, защита на пазара и постоянни наличности.
        </p>
      </section>

      <section className={styles.featured}>
        <h2>Популярни продукти</h2>
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link href="/products" className={styles.outlineBtn}>Пълен B2B каталог</Link>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return { props: { featuredProducts: getFeaturedProducts() } };
}