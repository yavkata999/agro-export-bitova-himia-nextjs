import { HeaderSimple } from "./HeaderSimple";
import { FooterCentered } from "./FooterCentered";

export default function AppShellResponsive({ children }) {
  return (
    <>
      <HeaderSimple />
      <main>{children}</main>
      <FooterCentered />
    </>
  );
}
