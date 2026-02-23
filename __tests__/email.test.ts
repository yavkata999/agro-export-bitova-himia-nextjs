import { sendEmailForm } from '../lib/email';
import emailjs from '@emailjs/browser';

jest.mock('@emailjs/browser', () => ({
    sendForm: jest.fn(),
}));

describe('EmailJS Integration', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_test';
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_test';
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'public_key_test';
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('calls emailjs.sendForm with correct parameters', async () => {
        const mockForm = document.createElement('form');
        (emailjs.sendForm as jest.Mock).mockResolvedValueOnce({ status: 200, text: 'OK' });

        await sendEmailForm(mockForm);

        expect(emailjs.sendForm).toHaveBeenCalledWith(
            'service_test',
            'template_test',
            mockForm
        );
    });

    it('throws an error if environment variables are missing', async () => {
        delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const mockForm = document.createElement('form');

        await expect(sendEmailForm(mockForm)).rejects.toThrow('EmailJS configuration missing');
    });
});