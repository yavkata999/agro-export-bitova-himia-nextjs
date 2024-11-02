import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import { BackgroundImage, Box, Image, rem } from "@mantine/core";

const Overlay = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Overlay)
);
const Container = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Container)
);
const Title = dynamic(() => import("@mantine/core").then((mod) => mod.Title));
const Text = dynamic(() => import("@mantine/core").then((mod) => mod.Text));
const SimpleGrid = dynamic(() =>
  import("@mantine/core").then((mod) => mod.SimpleGrid)
);
const ProductCard = dynamic(() =>
  import("../components/ProductCard").then((mod) => mod.ProductCard)
);
const ContactCard = dynamic(() =>
  import("../components/ContactCard").then((mod) => mod.ContactCard)
);
const Link = dynamic(() => import("next/link"));
const NextSeo = dynamic(() => import("next-seo").then((mod) => mod.NextSeo));

const HomePage = ({ product, catalog, seo }) => {
  const transformedData = product.product.map((item) => ({
    image: item.images[0].url,
    title: item.name,
    category: item.subcategory,
    description: item.description,
  }));

  const catalogData = catalog.map((item) => ({
    image: item.image.url,
    title: item.name || "Catalog Item",
    description: item.description || "No description available",
    fileUrl: item.file.url,
  }));

  const transformedSEO = {
    title: seo.metaTitle,
    description: seo.metaDescription,
    canonicalURL: seo.canonicalURL,
    keywords: seo.keywords,
    metaSocialTitle: seo.metaSocial[0].title,
    metaSocialDescription: seo.metaSocial[0].description,
    metaImageUrl: seo.metaImage.url,
    metaImageAlternativeText: seo.metaImage.alternativeText,
    metaImageWidth: seo.metaImage.width,
    metaImageHeight: seo.metaImage.height,
  };

  console.log(seo);

  const renderGrid = (id, title, category) => (
    <Container size="md" id={id}>
      <Title mb="md" mt="md" align="center">
        {title}
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" verticalSpacing="xl">
        {transformedData
          .filter((item) => item.category === category)
          .map((item) => (
            <ProductCard key={item.title} {...item} />
          ))}
      </SimpleGrid>
    </Container>
  );

  const renderCatalog = (catalogData) => (
    <Container size="md" id="catalog">
      <Title mb="md" mt="md" align="center">
        Разгледайте каталогът ни
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" verticalSpacing="xl">
        {catalogData.map((item, index) => (
          <Link
            key={index}
            href={item.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={item.image} alt="katalogova_snimka" />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );

  return (
    <Container fluid mb="100px">
      <NextSeo
        title={transformedSEO.title}
        description={transformedSEO.description}
        canonical={transformedSEO.canonicalURL}
        additionalMetaTags={[
          {
            name: "keywords",
            content: transformedSEO.keywords,
          },
        ]}
        openGraph={{
          type: "website",
          url: transformedSEO.canonicalURL,
          title: transformedSEO.metaSocialTitle,
          description: transformedSEO.metaSocialDescription,
          images: [
            {
              url: transformedSEO.metaImageUrl,
              alt: transformedSEO.metaImageAlternativeText,
              width: transformedSEO.metaImageWidth,
              height: transformedSEO.metaImageHeight,
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
      {renderGrid(
        "biofos",
        "Разгледайте нашите решения за почистване на пречиствателни станции и септични ями",
        "Биофос"
      )}
      {renderGrid(
        "biostar",
        "Безопасни биологични решения за почистване на всичко в дома",
        "БИОстар"
      )}
      {renderGrid(
        "ludwik",
        "Ефективни решения за кристално чист и бляскъв дом",
        "Ludwik"
      )}
      {renderGrid(
        "vast",
        "Екологично почистване на различни повърхности с помощта на естествени минерали за безупречен блясък",
        "VAST"
      )}
      {renderGrid(
        "abe",
        "Течни сапуни за нежно измиване с натурални екстракти",
        "ABE"
      )}
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
      {renderCatalog(catalogData)}
    </Container>
  );
};

export default HomePage;

export async function getStaticProps() {
  const res = await fetch(
    `https://agro-export-backend-strapi-v2-production.up.railway.app/api/products?populate[seo][populate]=*&populate[product][populate]=*&filters[slug][$eq]=bio-bitova-himiya&populate[catalog][populate]=*`
  );
  const { data } = await res.json();

  if (!data || data.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      product: data[0],
      catalog: data[0]?.catalog,
      seo: data[0]?.seo,
    },
    revalidate: 60,
  };
}
