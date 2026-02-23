import { render, screen, fireEvent } from '@testing-library/react';
import Distributors from '../pages/distributors';

// Mock the email hook
jest.mock('../hooks/useEmailForm', () => ({
    useEmailForm: () => ({
        handleSubmit: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        isSuccess: false,
        error: null
    })
}));

describe('Distributors Page', () => {
    it('renders B2B messaging correctly', () => {
        render(<Distributors />);
        expect(screen.getByText('Разширете бизнеса си с нас')).toBeInTheDocument();
    });

    it('contains the EmailJS compatible form', () => {
        render(<Distributors />);
        expect(screen.getByLabelText(/Име на фирмата/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Изпрати запитване/i })).toBeInTheDocument();
    });
});