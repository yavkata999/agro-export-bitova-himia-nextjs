import styles from "../styles/ProductCard.module.css";

export function ProductCard({ title, summary }) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      <p>{summary}</p>
    </article>
  );
}
