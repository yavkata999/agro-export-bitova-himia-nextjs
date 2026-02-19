import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/ServerError.module.css";

export default function ServerError() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <section className={styles.root}>
      <div className={styles.label}>500</div>
      <h1 className={styles.title}>Нещо се обърка.</h1>
      <p className={styles.description}>
        Възникна проблем при обработка на заявката. Ще бъдете пренасочени към началната страница.
      </p>
      <Link className={styles.button} href="/">
        Върни ме към началната страница
      </Link>
    </section>
  );
}
