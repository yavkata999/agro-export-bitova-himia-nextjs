import rawData from '@/data/strapi-data.json';
import { Product, DataStore } from '@/types';

const data = rawData as DataStore;
const products: Product[] = data.products || [];
const categories: string[] = data.categories || [];

export const getAllProducts = (): Product[] => products;

export const getProductBySlug = (slug: string): Product | undefined =>
    products.find((p) => p.slug === slug);

export const getAllCategories = (): string[] => categories;

export const getProductsByCategory = (category: string): Product[] =>
    products.filter((p) => p.category === category);

export const getFeaturedProducts = (): Product[] => {
    return categories.map(category => {
        const catProducts = getProductsByCategory(category);
        if (catProducts.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * catProducts.length);
        return catProducts[randomIndex];
    }).filter(Boolean) as Product[];
};