import { useState } from "react";
import dynamic from "next/dynamic";
import { rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "../styles/HeaderSimple.module.css";

const Container = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Container)
);
const Group = dynamic(() => import("@mantine/core").then((mod) => mod.Group));
const Burger = dynamic(() => import("@mantine/core").then((mod) => mod.Burger));
const Text = dynamic(() => import("@mantine/core").then((mod) => mod.Text));
const Drawer = dynamic(() => import("@mantine/core").then((mod) => mod.Drawer));
const Box = dynamic(() => import("@mantine/core").then((mod) => mod.Box));
const ScrollArea = dynamic(() =>
  import("@mantine/core").then((mod) => mod.ScrollArea)
);
const Divider = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Divider)
);
const Link = dynamic(() => import("next/link"));

const sections = [
  { id: "nachalo", label: "Начало" },
  { id: "biofos", label: "Биофос" },
  { id: "biostar", label: "Биостар" },
  { id: "ludwik", label: "Ludwik" },
  { id: "vast", label: "VAST" },
  { id: "abe", label: "ABE" },
  { id: "lucek", label: "Lucek" },
  { id: "flesz", label: "Flesz" },
  { id: "kontakti", label: "Контакти" },
];

export function HeaderSimple() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [active, setActive] = useState(sections[0].id);

  const handleLinkClick = (sectionId) => () => {
    setActive(sectionId);
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    closeDrawer();
  };

  const navLinks = sections.map((section) => (
    <Link
      key={section.id}
      href={`/#${section.id}`}
      className={`${styles.link} ${active === section.id ? styles.active : ""}`}
      data-active={active === section.id ? true : undefined}
      onClick={handleLinkClick(section.id)}
    >
      {section.label}
    </Link>
  ));

  return (
    <Box pb={120}>
      <header className={styles.header}>
        <Container size="md" className={styles.inner}>
          <Text component={Link} href="">
            Био Битова химия
          </Text>
          <Group gap={5} visibleFrom="xs">
            {drawerOpened ? null : navLinks}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Container>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Битова химия"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={styles.link}
              data-active={active === section.id ? true : undefined}
              onClick={handleLinkClick(section.id)}
            >
              {section.label}
            </Link>
          ))}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
