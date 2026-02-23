import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import styles from '@/styles/ProductCard.module.css';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const displayDescription = product.shortDescription || product.seoDescription || product.description || '';

    return (
        <Link href={`/products/${product.slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.imageUrl}
                    alt={product.seoTitle || product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                />
                {/* Modern subtle overlay on hover */}
                <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.content}>
                <div className={styles.tagWrapper}>
                    <span className={styles.category}>{product.category}</span>
                </div>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.description}>{displayDescription}</p>

                <div className={styles.buttonWrapper}>
                    <span className={styles.button}>Виж детайли</span>
                </div>
            </div>
        </Link>
    );
}