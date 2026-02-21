import Layout from '@/components/Layout';
import styles from '@/styles/Page.module.css';

export default function DistributorsPage() {
  return (
    <Layout title="Дистрибутори | Битова Химия ООД" description="Търсим нови дистрибутори в България.">
      <section className={styles.section}>
        <h1>Активно търсим дистрибутори в България</h1>
        <p className={styles.lead}>Битова Химия ООД развива национална B2B мрежа и кани сериозни търговски партньори за дългосрочно сътрудничество.</p>
        <h2>Защо да работите с нас</h2>
        <ul>
          <li>Стабилен продуктов портфейл с разпознаваеми марки.</li>
          <li>Предвидими доставки и коректни търговски условия.</li>
          <li>Подкрепа при позициониране в локални пазари.</li>
        </ul>
        <h2>Подходящи партньори</h2>
        <ul>
          <li>Малки квартални и специализирани магазини.</li>
          <li>Регионални търговски вериги.</li>
          <li>Търговци и дистрибутори на едро.</li>
        </ul>
        <h2>Заявете интерес</h2>
        <form action="/thank-you" method="post" className={styles.form}>
          <input name="firm" placeholder="Име на фирма" required />
          <input name="contact" placeholder="Лице за контакт" required />
          <input type="email" name="email" placeholder="Имейл" required />
          <input name="phone" placeholder="Телефон" required />
          <textarea name="message" placeholder="Опишете вашата дистрибуторска мрежа" rows={5} required />
          <button type="submit" className={styles.cta}>Изпрати запитване</button>
        </form>
      </section>
    </Layout>
  );
}
