import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { Overlay, Container, Title, Text, SimpleGrid } from "@mantine/core";
import { ProductCard } from "../components/ProductCard";
import { ContactCard } from "../components/ContactCard";
import { NextSeo } from "next-seo";

const Link = dynamic(() => import("next/link"));

const HomePage = ({ product, catalog, seo }) => {

  const categories = [
    { id: "biofos", title: "Разгледайте нашите решения за почистване на пречиствателни станции и септични ями", category: "Биофос" },
    { id: "biostar", title: "Безопасни биологични решения за почистване на всичко в дома", category: "БИОстар" },
    { id: "ludwik", title: "Ефективни решения за кристално чист и бляскъв дом", category: "Ludwik" },
    { id: "vast", title: "Екологично почистване на различни повърхности с помощта на естествени минерали за безупречен блясък", category: "VAST" },
    { id: "abe", title: "Течни сапуни за нежно измиване с натурални екстракти", category: "ABE" },
    { id: "lucek", title: "Ефективни решения за нежно измиване с натурални екстракти", category: "Lucek" },
    { id: "flesz", title: "Ефективни решения за нежно измиване с натурални екстракти", category: "Flesz" },
  ];

  const renderAllGrids = () =>
    categories.map(({ id, title, category }) => (
      <Container size="md" id={id} key={id}>
        <Title mb="md" mt="md" align="center">
          {title}
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" verticalSpacing="xl">
          {product
            .filter((item) => item.category === category)
            .map((item) => (
              <ProductCard key={item.title} {...item} />
            ))}
        </SimpleGrid>
      </Container>
    ));

  const renderCatalog = (catalog) => (
    <Container size="md" id="catalog">
      <Title mb="md" mt="md" align="center">
        Разгледайте каталогът ни
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" verticalSpacing="xl">
        {catalog.map((item) => (
          <Link
            key={item.id}
            href={item.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={item.image} alt="katalogova_snimka" width={300} height={300} sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "contain",
          }}
        />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );

  return (
    <Container fluid mb="100px">
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.canonicalURL}
        additionalMetaTags={[
          {
            name: "keywords",
            content: seo.keywords,
          },
        ]}
        openGraph={{
          type: "website",
          url: seo.canonicalURL,
          title: seo.metaSocialTitle,
          description: seo.metaSocialDescription,
          images: [
            {
              url: seo.metaImageUrl,
              alt: seo.metaImageAlternativeText,
              width: seo.metaImageWidth,
              height: seo.metaImageHeight,
            },
          ],
        }}
      />
      <div className={styles.hero} id="nachalo">
        <Suspense fallback={<div>Зареждане...</div>}>
          <Overlay
            gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
            opacity={1}
            zIndex={0}
          />
        </Suspense>
        <Container className={styles.container} size="md">
          <Title className={styles.title}>
            Екологични решения за почистване за блестящ дом
          </Title>
          <Text className={styles.description} size="xl" mt="xl">
            Безопасни, ефективни, екологични: кажете сбогом на вредните
            химикали, кажете &quot;Здравей&quot; на екологично чист дом.
          </Text>
        </Container>
      </div>
      {renderAllGrids()}
      <Container size="sm" mt="xl" mb="xl" id="kontakti">
        <ContactCard
          name="Свържете се с нас"
          phone1="+359895646164"
          email="info@bitova-himia.com"
          description={`
            <p style="text-align:justify;">
              <strong>Търсим дистрибутори за цялата страна.</strong>
              <br />
              Минимални изисквания - склад и собствен транспорт.
              <br />
              За поръчки на едро, както и за повече информация, обърнете се към
              посоченият имейл.
            </p>
          `}
        />
      </Container>
      {renderCatalog(catalog)}
    </Container>
  );
};

export default HomePage;

// Utility functions for transformations
const transformProduct = (product) => {
  return product.map((item) => ({
    id: item.id,
    image: item.images?.[0]?.url || null,
    title: item.name,
    category: item.subcategory,
    description: item.description,
  }));
};

const transformCatalog = (catalog) => {
  return catalog.map((item) => ({
    id: item.id,
    image: item.image?.url || "",
    fileUrl: item.file?.url || "",
  }));
};

const transformSEO = (seo) => ({
  title: seo.metaTitle || "",
  description: seo.metaDescription || "",
  canonicalURL: seo.canonicalURL || "",
  keywords: seo.keywords || "",
  metaSocialTitle: seo.metaSocial?.[0]?.title || "",
  metaSocialDescription: seo.metaSocial?.[0]?.description || "",
  metaImageUrl: seo.metaImage?.url || "",
  metaImageAlternativeText: seo.metaImage?.alternativeText || "",
  metaImageWidth: seo.metaImage?.width || 0,
  metaImageHeight: seo.metaImage?.height || 0,
});

// Main function
export async function getStaticProps() {
  const API_URL = `https://agro-export-backend-strapi-v2-production.up.railway.app/api/products?fields[0]=title&fields[1]=slug&fields[2]=description&populate[seo][populate][metaImage][fields][0]=url&populate[seo][populate][metaImage][fields][1]=alternativeText&populate[seo][populate][metaImage][fields][2]=width&populate[seo][populate][metaImage][fields][3]=height&populate[seo][populate][metaSocial]=*&populate[product][populate]=*&populate[catalog][populate][file][fields][0]=url&populate[catalog][populate][image][fields][0]=url&filters[slug][$eq]=bio-bitova-himiya`;

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Failed to fetch API. Status: ${res.status}`);
    }

    const { data } = await res.json();

    if (!data || data.length === 0) {
      return { notFound: true };
    }

    const product = data[0];
    const transformedProducts = transformProduct(product.product || []);
    const transformedCatalog = transformCatalog(product.catalog || []);
    const transformedSEO = transformSEO(product.seo || {});

    return {
      props: {
        product: transformedProducts,
        catalog: transformedCatalog,
        seo: transformedSEO,
      },
      revalidate: 3600, // Revalidate data every hour
    };
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    return { notFound: true };
  }
}
