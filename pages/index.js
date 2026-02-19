import Head from "next/head";
import { ContactCard } from "../components/ContactCard";
import { ProductCard } from "../components/ProductCard";
import siteContent from "../data/site-content.json";
import styles from "../styles/Home.module.css";

export default function HomePage({ content }) {
  const { hero, distributor, categories, contact, seo } = content;

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
      </Head>
      <section className={styles.hero} id="nachalo">
        <div className={styles.heroContent}>
          <span className={styles.badge}>{hero.badge}</span>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <a href="#distributor" className={styles.primaryButton}>
            {hero.distributorCta}
          </a>
        </div>
      </section>

      <section className={styles.categories} id="kategorii">
        <div className={styles.sectionHeader}>
          <h2>Продуктови линии</h2>
          <p>Подбрани марки и формули за дома и професионални обекти.</p>
        </div>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryBlock}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <div className={styles.grid}>
              {category.products.map((product) => (
                <ProductCard key={product.id} title={product.title} summary={product.summary} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.distributor} id="distributor">
        <div>
          <h2>{distributor.title}</h2>
          <p>{distributor.description}</p>
        </div>
        <div className={styles.distributorGrid}>
          <article>
            <h3>Минимални изисквания</h3>
            <ul>
              {distributor.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Какво получавате</h3>
            <ul>
              {distributor.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.contactSection} id="kontakti">
        <ContactCard company={contact.company} phone={contact.phone} email={contact.email} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      content: siteContent,
    },
  };
}
