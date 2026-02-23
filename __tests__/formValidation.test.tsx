import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../pages/contact';

// Mock the hook so we don't send real emails
jest.mock('../hooks/useEmailForm', () => ({
    useEmailForm: () => ({
        handleSubmit: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        isSuccess: false,
        error: null
    })
}));

describe('Form Security and Validation', () => {
    it('prevents submission if phone number contains letters or scripts', () => {
        render(<Contact />);
        const phoneInput = screen.getByLabelText(/Телефон/i) as HTMLInputElement;

        // Inject junk data
        fireEvent.change(phoneInput, { target: { value: '<script>alert("xss")</script>' } });

        // The pattern attribute should mark the field as invalid
        expect(phoneInput.validity.patternMismatch).toBe(true);
        expect(phoneInput.checkValidity()).toBe(false);
    });

    it('prevents submission if name contains malicious code', () => {
        render(<Contact />);
        const nameInput = screen.getByLabelText(/Име \*/i) as HTMLInputElement;

        // Inject SQL/Script junk data
        fireEvent.change(nameInput, { target: { value: 'DROP TABLE users;' } });

        // Pattern mismatch should catch standard injection characters like ; or <>
        expect(nameInput.validity.patternMismatch).toBe(true);
        expect(nameInput.checkValidity()).toBe(false);
    });

    it('enforces maximum length on message to prevent payload spam', () => {
        render(<Contact />);
        const messageInput = screen.getByLabelText(/Съобщение \*/i) as HTMLTextAreaElement;

        // Verify the HTML constraint is present
        expect(messageInput.maxLength).toBe(1000);
    });
});