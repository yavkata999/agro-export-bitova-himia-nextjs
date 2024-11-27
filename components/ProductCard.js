import dynamic from "next/dynamic";
import parse from "html-react-parser";
import styles from "../styles/ProductCard.module.css";

const Card = dynamic(() => import("@mantine/core").then((mod) => mod.Card), {
  ssr: false,
});
const AspectRatio = dynamic(() =>
  import("@mantine/core").then((mod) => mod.AspectRatio)
, {
  ssr: false,
});
const Text = dynamic(() => import("@mantine/core").then((mod) => mod.Text), {
  ssr: false,
});
const Spoiler = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Spoiler)
, {
  ssr: false,
});
const Image = dynamic(() => import("next/image"));

export function ProductCard({ image, title, description }) {
  return (
    <Card key={title} p="md" radius="md" shadow="xl" withBorder>
      <AspectRatio ratio={8 / 9}>
        <Image
          src={image}
          alt="Produktova snimka"
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          priority
        />
      </AspectRatio>
      <Text className={styles["cardTitle"]} mt={5} align="center">
        {title}
      </Text>
      <Spoiler maxHeight={0} showLabel="Прочети за продукта" hideLabel="Скрий">
        {parse(description)}
      </Spoiler>
    </Card>
  );
}
