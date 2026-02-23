import { render, screen } from '@testing-library/react';
import Contact from '../pages/contact';

jest.mock('../hooks/useEmailForm', () => ({
    useEmailForm: () => ({
        handleSubmit: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        isSuccess: false,
        error: null
    })
}));

describe('Contact Page', () => {
    it('renders contact information and form', () => {
        render(<Contact />);
        expect(screen.getByText('Офис и Данни за фактура')).toBeInTheDocument();
        expect(screen.getByLabelText(/Съобщение/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Изпрати запитване/i })).toBeInTheDocument();
    });
});