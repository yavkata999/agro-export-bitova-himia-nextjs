import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { getProductBySlug, products } from '@/lib/data';
import type { Product } from '@/lib/types';
import styles from '@/styles/Page.module.css';

type Props = { product: Product };

export default function ProductPage({ product }: Props) {
  return (
    <Layout title={`${product.name} | Битова Химия ООД`} description={product.description.slice(0, 150)}>
      <article className={styles.productLayout}>
        <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
        <div>
          <p className={styles.category}>{product.category}</p>
          <h1>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: products.map((product) => ({ params: { slug: product.slug } })),
  fallback: false
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const product = getProductBySlug(String(params?.slug));

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
};
