import Link from 'next/link';
import type { Product } from '@/lib/types';
import styles from '@/styles/ProductCard.module.css';

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  return (
    <article className={styles.card}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <p className={styles.category}>{product.category}</p>
        <h3>{product.name}</h3>
        <Link href={`/products/${product.slug}`} className={styles.link}>Виж детайли</Link>
      </div>
    </article>
  );
}
