import { useState } from 'react';
import { sendEmailForm } from '@/lib/email';

const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour in milliseconds
const STORAGE_KEY = 'agro_export_last_email_sent';

export function useEmailForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. Check if the user is in the cooldown period
        const lastSentStr = localStorage.getItem(STORAGE_KEY);
        if (lastSentStr) {
            const lastSentTime = parseInt(lastSentStr, 10);
            const currentTime = Date.now();

            if (currentTime - lastSentTime < COOLDOWN_MS) {
                setError('Моля, изчакайте един час преди да изпратите ново запитване.');
                setIsSuccess(false);
                return; // Stop the submission
            }
        }

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        const form = e.currentTarget;

        try {
            await sendEmailForm(form);
            setIsSuccess(true);
            form.reset();

            // 2. Record the successful submission time in localStorage
            localStorage.setItem(STORAGE_KEY, Date.now().toString());

        } catch (err) {
            setError('Възникна грешка при изпращането. Моля, проверете връзката си и опитайте отново.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleSubmit, isLoading, isSuccess, error };
}