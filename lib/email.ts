import emailjs from '@emailjs/browser';

export const initEmailJS = () => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
        emailjs.init({ publicKey });
    }
};

export const sendEmailForm = async (form: HTMLFormElement) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
        throw new Error('EmailJS configuration missing');
    }

    return emailjs.sendForm(serviceId, templateId, form);
};