import { render, screen } from '@testing-library/react';
import ProductDetail from '../pages/products/[slug]';
import { Product } from '../types';

const mockProduct: Product = {
    id: "1",
    slug: "test-product",
    name: "Test B2B Product",
    category: "Industrial",
    description: "Highly effective cleaner for B2B sector.",
    imageUrl: "https://res.cloudinary.com/test.png"
};

describe('Product Details Page', () => {
    it('renders product information correctly', () => {
        render(<ProductDetail product={mockProduct} />);

        expect(screen.getByRole('heading', { name: 'Test B2B Product' })).toBeInTheDocument();
        expect(screen.getByText('Industrial')).toBeInTheDocument();
        expect(screen.getByText(/Highly effective cleaner/i)).toBeInTheDocument();
    });
});