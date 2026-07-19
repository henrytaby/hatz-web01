import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
    it('renders the form with all fields', () => {
        render(<ContactForm />);
        expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email oficial/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/tu idea o mensaje/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
        render(<ContactForm />);
        const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
        fireEvent.click(submitButton);

        expect(await screen.findByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/correo electrónico inválido/i)).toBeInTheDocument();
        expect(await screen.findByText(/el mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument();
    });
});
