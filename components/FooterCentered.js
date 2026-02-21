import dynamic from "next/dynamic";
import styles from "../styles/FooterCentered.module.css";

const Container = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Container)
);
const Group = dynamic(() => import("@mantine/core").then((mod) => mod.Group));
const Anchor = dynamic(() => import("@mantine/core").then((mod) => mod.Anchor));
const Text = dynamic(() => import("@mantine/core").then((mod) => mod.Text));
const Link = dynamic(() => import("next/link"));

export function FooterCentered() {
  const links = [
    { id: 0, link: "/", label: "Начало" },
    {
      id: 1,
      link: "/politika-za-zashtita-na-lichnite-danni",
      label: "Политика за защита на личните данни",
    },
  ];

  const items = links.map((link) => (
    <Anchor
      component={Link}
      c="dimmed"
      key={link.id}
      href={link.link}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={styles["footer"]}>
      <Container className={styles["inner"]}>
        <Text className={styles["links"]}>
          {new Date().getFullYear()} © Битова Химия
        </Text>
        <Group className={styles["links"]}>{items}</Group>
      </Container>
    </div>
  );
}
