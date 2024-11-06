import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import UserHeader from './UserHeader';
import { User } from '../types/user';

describe('UserHeader', () => {
  const mockUser: User = {
    name: 'John Doe',
    balance: 1000,
    products: [],
    history: [],
  };

  it('renders the user name and balance', () => {
    render(<UserHeader user={mockUser} link={vi.fn()} />);

    expect(screen.getByText(`Welcome, ${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Your balance: ${mockUser.balance}`)).toBeInTheDocument();
  });

  /*
  it('renders a loading message when user is not provided', () => {
    render(<UserHeader user={null} />);

    expect(screen.getByText('User loading...')).toBeInTheDocument();
  });
  */
});