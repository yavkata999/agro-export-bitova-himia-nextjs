import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import styles from '@/styles/ProductCard.module.css';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Link href={`/products/${product.slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title}>{product.name}</h3>
            </div>
        </Link>
    );
}