import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <section className={styles.root}>
      <div className={styles.label}>404</div>
      <h1 className={styles.title}>Открихте тайно място.</h1>
      <p className={styles.description}>
        Това е страница 404. Ще бъдете пренасочени към началната страница след 3 секунди.
      </p>
      <Link className={styles.button} href="/">
        Върни ме към началната страница
      </Link>
    </section>
  );
}
