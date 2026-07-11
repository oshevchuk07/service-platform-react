import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './LoginPage';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('LoginPage', () => {
  it('shows validation errors for empty submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.click(screen.getByRole('button', { name: /Login/i }));

    expect(await screen.findByText(/email required/i)).toBeInTheDocument();
  });

  it('logs in successfully with valid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), 'test@test.com');
    await user.type(screen.getByLabelText(/Password/i), '123456');
    await user.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Wrong password or login/i)).not.toBeInTheDocument();
    });
  });

  it('shows error message on invalid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), 'wrong@test.com');
    await user.type(screen.getByLabelText(/Password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /Login/i }));

    expect(await screen.findByText(/Wrong password or login/i)).toBeInTheDocument();
  });
});
