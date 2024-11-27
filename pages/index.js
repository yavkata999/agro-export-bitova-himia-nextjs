import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import {Image} from "@mantine/core";

const Overlay = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Overlay), {
    ssr: false,
  });
const Container = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Container), {
    ssr: false,
  });
const Title = dynamic(() => import("@mantine/core").then((mod) => mod.Title), {
  ssr: false,
});
const Text = dynamic(() => import("@mantine/core").then((mod) => mod.Text), {
  ssr: false,
});
const SimpleGrid = dynamic(() =>
  import("@mantine/core").then((mod) => mod.SimpleGrid)
, {
  ssr: false,
});
const ProductCard = dynamic(() =>
  import("../components/ProductCard").then((mod) => mod.ProductCard)
, {
  ssr: false,
});
const ContactCard = dynamic(() =>
  import("../components/ContactCard").then((mod) => mod.ContactCard)
, {
  ssr: false,
});
const Link = dynamic(() => import("next/link"));
const NextSeo = dynamic(() => import("next-seo").then((mod) => mod.NextSeo));

const HomePage = ({ product, catalog, seo }) => {

  const renderGrid = (id, title, category) => (
    <Container size="md" id={id}>
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
  );

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
            <Image src={item.image} alt="katalogova_snimka" />
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
      {renderGrid(
        "lucek",
        "Ефективни решения за нежно измиване с натурални екстракти",
        "Lucek"
      )}
      {renderGrid(
        "flesz",
        "Ефективни решения за нежно измиване с натурални екстракти",
        "Flesz"
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
      {renderCatalog(catalog)}
    </Container>
  );
};

export default HomePage;

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
    const seo = product.seo || {};

    const transformedProducts = data[0].product.map((item) => ({
      id: item.id,
      image: item.images[0]?.url,
      title: item.name,
      category: item.subcategory,
      description: item.description,
    }));

    const transformedCatalog = product.catalog.map((item)=> ({
      id: item.id,
      image: item.image.url,
      fileUrl: item.file.url,
    }))

    // Transform SEO data
    const transformedSEO = {
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
    };

    return {
      props: {
        product: transformedProducts,
        catalog: transformedCatalog,
        seo: transformedSEO, // Pass the transformed SEO data
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return { notFound: true };
  }
}

