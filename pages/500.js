import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/ServerError.module.css";

const Link = dynamic(() => import("next/link"));
const Title = dynamic(() => import("@mantine/core").then((mod) => mod.Title));
const Text = dynamic(() => import("@mantine/core").then((mod) => mod.Text));
const Button = dynamic(() => import("@mantine/core").then((mod) => mod.Button));
const Container = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Container)
);
const Group = dynamic(() => import("@mantine/core").then((mod) => mod.Group));

export default function ServerError() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <Container className={styles["root"]}>
      <div className={styles["label"]}>500</div>
      <Title className={styles["title"]}>Нещо лошо се случи...</Title>
      <Text
        c="dimmed"
        size="lg"
        align="center"
        className={styles["description"]}
      >
        Нашите сървъри не можаха да обработят заявката ви. Не се притеснявайте,
        нашият екип от разработчици вече е уведомен. Ще бъдете препратени към
        началната страница след 3 секунди.
      </Text>
      <Group position="center">
        <Button component={Link} variant="subtle" size="md" href="/">
          Върни ме към началната страница
        </Button>
      </Group>
    </Container>
  );
}
