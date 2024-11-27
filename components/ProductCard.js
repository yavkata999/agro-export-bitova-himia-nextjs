import parse from "html-react-parser";
import { Card, AspectRatio, Text, Spoiler } from "@mantine/core";
import Image from "next/image";
import styles from "../styles/ProductCard.module.css";

export function ProductCard({ image, title, description }) {
  return (
    <Card p="md" radius="md" shadow="xl" withBorder>
      <AspectRatio ratio={8 / 9}>
        <Image
          src={image}
          alt="Produktova snimka"
          width={300} // Define a reasonable width
          height={337} // Match the aspect ratio (8:9)
          style={{
            objectFit: "contain",
          }}
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
