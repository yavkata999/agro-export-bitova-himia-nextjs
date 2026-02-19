import styles from "../styles/ContactCard.module.css";

export function ContactCard({ company, phone, email }) {
  return (
    <section className={styles.card}>
      <h2>Свържете се с нас</h2>
      <p className={styles.company}>{company}</p>
      <p>
        Телефон: <a href={`tel:${phone}`}>{phone}</a>
      </p>
      <p>
        Имейл: <a href={`mailto:${email}`}>{email}</a>
      </p>
    </section>
  );
}
