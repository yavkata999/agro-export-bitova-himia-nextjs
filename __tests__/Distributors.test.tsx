import { render, screen } from '@testing-library/react';
import Distributors from '../pages/distributors';

describe('Distributors Page', () => {
    it('renders the B2B messaging correctly', () => {
        render(<Distributors />);

        expect(screen.getByText('Разширете бизнеса си с нас')).toBeInTheDocument();
        expect(screen.getByText(/Търсим надеждни дистрибутори/i)).toBeInTheDocument();
    });

    it('contains the static contact form', () => {
        render(<Distributors />);

        expect(screen.getByLabelText(/Име на фирмата/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Изпрати запитване/i })).toBeInTheDocument();
    });
});