import { getAllProducts, getProductBySlug, getAllCategories } from '../lib/api';

describe('API Library', () => {
    it('should return a list of products', () => {
        const products = getAllProducts();
        expect(products.length).toBeGreaterThan(0);
        expect(products[0]).toHaveProperty('id');
        expect(products[0]).toHaveProperty('name');
    });

    it('should return a product by slug', () => {
        const products = getAllProducts();
        const slug = products[0].slug;
        const product = getProductBySlug(slug);
        expect(product).toBeDefined();
        expect(product?.slug).toBe(slug);
    });

    it('should return all categories', () => {
        const categories = getAllCategories();
        expect(categories.length).toBeGreaterThan(0);
    });
});