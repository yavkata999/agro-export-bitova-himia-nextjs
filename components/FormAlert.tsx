import React from 'react';
import styles from '@/styles/Form.module.css';

interface Props {
    isSuccess: boolean;
    error: string | null;
    successMessage?: string;
}

export default function FormAlert({ isSuccess, error, successMessage = 'Запитването е изпратено успешно!' }: Props) {
    if (isSuccess) {
        return <div className={styles.alertSuccess}>{successMessage}</div>;
    }

    if (error) {
        return <div className={styles.alertError}>{error}</div>;
    }

    return null;
}