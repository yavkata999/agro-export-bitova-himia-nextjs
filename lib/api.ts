import rawData from '@/data/strapi-data.json';
import { Product, DataStore } from '@/types';

const data = rawData as DataStore;

export function getAllProducts(): Product[] {
    return data.products;
}

export function getProductBySlug(slug: string): Product | undefined {
    return data.products.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
    return data.categories;
}

export function getProductsByCategory(category: string): Product[] {
    return data.products.filter((p) => p.category === category);
}