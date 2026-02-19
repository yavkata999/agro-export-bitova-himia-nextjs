import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/CookieBanner.module.css";

const COOKIE_KEY = "bitova-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <p>
        Този сайт използва бисквитки. Прочетете нашата{" "}
        <Link href="/politika-za-zashtita-na-lichnite-danni">политика</Link>.
      </p>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem(COOKIE_KEY, "accepted");
          setVisible(false);
        }}
      >
        Разбирам
      </button>
    </div>
  );
}
