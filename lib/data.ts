import rawData from '@/data/strapi-data.json';
import { slugify } from './slug';
import type { Category, Product } from './types';

type RawProduct = {
  id: string;
  slug?: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
};

type RawData = {
  products: RawProduct[];
  categories: string[];
};

const data = rawData as RawData;

export const categories: Category[] = data.categories.map((name, index) => ({
  id: `${index + 1}`,
  name,
  slug: slugify(name)
}));

export const products: Product[] = data.products.map((product) => {
  const categorySlug = slugify(product.category);
  return {
    id: product.id,
    name: product.name,
    slug: product.slug?.trim() ? product.slug : slugify(product.name),
    category: product.category,
    categorySlug,
    description: product.description,
    imageUrl: product.imageUrl
  };
});

export const getProductBySlug = (slug: string): Product | undefined => products.find((product) => product.slug === slug);
