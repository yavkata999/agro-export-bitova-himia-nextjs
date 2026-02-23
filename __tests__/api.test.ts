import { getAllProducts, getProductBySlug, getAllCategories, getFeaturedProducts } from '../lib/api';

describe('API Logic Audit', () => {
    it('should return a list of products', () => {
        const products = getAllProducts();
        expect(products.length).toBeGreaterThan(0);
        expect(products[0]).toHaveProperty('id');
    });

    it('should resolve a specific product by slug', () => {
        const products = getAllProducts();
        const product = getProductBySlug(products[0].slug);
        expect(product).toBeDefined();
        expect(product?.slug).toBe(products[0].slug);
    });

    it('should return all categories', () => {
        expect(getAllCategories().length).toBeGreaterThan(0);
    });

    it('should extract one featured product per category safely', () => {
        const featured = getFeaturedProducts();
        const categories = getAllCategories();
        expect(featured.length).toBeLessThanOrEqual(categories.length);
    });
});