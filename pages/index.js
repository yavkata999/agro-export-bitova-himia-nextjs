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

const HomePage = ({ product, catalog }) => {
  const transformedData = product.product.map((item) => ({
    image: `https://${process.env.NEXT_PUBLIC_BACKEND}${item.images[0].url}`,
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
            href={`https://${process.env.NEXT_PUBLIC_BACKEND}${item.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`https://${process.env.NEXT_PUBLIC_BACKEND}${item.image}`}
              alt="katalogova_snimka"
            />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );

  return (
    <Container fluid mb="100px">
      <NextSeo
        description="Екопрепарати за септични ями, перилни и почистващи средства: течни, прахообразни, таблетки, капсули, гелове, веро, сапуни – всичко за чист дом!"
        canonical="https://bitova-himia.com/"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "септични ями, биопрепарати, перилни и почистващи препарати, течни, прахообразни, таблетки и капсули за съдомиялна и пералня, гел, веро, сапуни",
          },
        ]}
        openGraph={{
          type: "website",
          url: "https://bitova-himia.com/",
          title: "Битова химия - Биологични препарати за почистване на дома",
          description:
            "Екопрепарати за септични ями, перилни и почистващи средства: течни, прахообразни, таблетки, капсули, гелове, веро, сапуни – всичко за чист дом!",
          images: [
            {
              url: "https://strapi.agro-export.com/uploads/produkti_2a9dd12eb7.png",
              width: 526,
              height: 595,
              alt: "Bio Bitova Himia",
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
    `https://strapi.agro-export.com/api/products?populate[product][populate][images][fields]=*&filters[slug][$eq]=bio-bitova-himiya&populate[catalog][populate][image][fields]=url,alternativeText,width,height&populate[catalog][populate][file][fields]=url,alternativeText`
  );
  const { data } = await res.json();

  if (!data || data.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      product: data[0],
      catalog: data[0]?.catalog,
    },
    revalidate: 60,
  };
}
