import dynamic from "next/dynamic";
import { AppShell } from "@mantine/core";

const FooterCentered = dynamic(() =>
  import("./FooterCentered").then((mod) => mod.FooterCentered)
);
const HeaderSimple = dynamic(() =>
  import("./HeaderSimple").then((mod) => mod.HeaderSimple)
);

export default function AppShellResponsive({ children }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderSimple />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <FooterCentered />
      </AppShell.Footer>
    </AppShell>
  );
}
