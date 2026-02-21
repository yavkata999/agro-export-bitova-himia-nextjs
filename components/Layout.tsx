import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '@/styles/Layout.module.css';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

const nav = [
  { href: '/', label: 'Начало' },
  { href: '/products', label: 'Продукти' },
  { href: '/distributors', label: 'Дистрибутори' },
  { href: '/about', label: 'За нас' },
  { href: '/contact', label: 'Контакти' }
];

export default function Layout({ title, description, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.container}>
            <Link href="/" className={styles.logo}>Битова Химия ООД</Link>
            <nav className={styles.nav}>
              {nav.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </nav>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.container}>© {new Date().getFullYear()} Битова Химия ООД. Надежден партньор за търговци и дистрибутори в България.</div>
        </footer>
      </div>
    </>
  );
}
