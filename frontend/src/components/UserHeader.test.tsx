import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import UserHeader from './UserHeader';
import { User } from '../types/user';

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockUseNavigate,
  };
});

describe('UserHeader', () => {
  const mockUser: User = {
    name: 'John Doe',
    balance: 1000,
    products: [],
    history: [],
  };

  const renderUserHeader = () => {
    return render(<UserHeader user={mockUser} />);
  }

  it('renders the user name and balance', () => {
    renderUserHeader();

    expect(screen.getByTestId('welcome-text')).toHaveTextContent(`Welcome, ${mockUser.name}`);
    expect(screen.getByTestId('balance-text')).toHaveTextContent(`Your balance: ${mockUser.balance}`);
  });

  it('navigates to /history when the "View History" button is clicked', () => {
    renderUserHeader();

    const historyButton = screen.getByTestId('view-history-btn');
    fireEvent.click(historyButton);

    expect(mockUseNavigate).toHaveBeenCalledWith('/history');
  });

});