import React from "react";
import dynamic from "next/dynamic";
import styles from "../styles/ContactCard.module.css";

const Paper = dynamic(() => import("@mantine/core").then((mod) => mod.Paper));
const Text = dynamic(() => import("@mantine/core").then((mod) => mod.Text));
const Title = dynamic(() => import("@mantine/core").then((mod) => mod.Title));
const Divider = dynamic(() =>
  import("@mantine/core").then((mod) => mod.Divider)
);
const SimpleGrid = dynamic(() =>
  import("@mantine/core").then((mod) => mod.SimpleGrid)
);
const IconPhone = dynamic(() =>
  import("@tabler/icons-react").then((mod) => mod.IconPhone)
);
const IconAt = dynamic(() =>
  import("@tabler/icons-react").then((mod) => mod.IconAt)
);
const IconMapPin = dynamic(() =>
  import("@tabler/icons-react").then((mod) => mod.IconMapPin)
);

const Link = dynamic(() => import("next/link"));

export function ContactCard({
  name,
  phone1,
  phone2,
  address,
  email,
  description,
}) {
  const openGoogleMaps = () => {
    if (address) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  const renderContactInfo = (icon, content, link) => {
    if (content) {
      return (
        <>
          {icon && icon}
          {link ? (
            <Link href={link}>{content}</Link>
          ) : (
            <Text
              className={styles["link-style"]} // Apply the CSS class
              onClick={openGoogleMaps}
            >
              {content}
            </Text>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <Paper shadow="xl" p="md" withBorder className={styles["paper"]}>
      <Title order={4} mb="xs">
        {name}
      </Title>
      {description && <Divider margins="md" />}
      <Text size="sm" dangerouslySetInnerHTML={{ __html: description }} />
      <Divider margins="md" />
      <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs" mt="xs">
        {renderContactInfo(<IconPhone />, phone1, `tel:${phone1}`)}
        {phone2 && renderContactInfo(<IconPhone />, phone2, `tel:${phone2}`)}
        {address && renderContactInfo(<IconMapPin />, address, null)}
        {email && renderContactInfo(<IconAt />, email, `mailto:${email}`)}
      </SimpleGrid>
    </Paper>
  );
}
