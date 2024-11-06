import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import TransactionModal from './TransactionModal';
import { Product } from '../types/product';
import { User } from '../types/user';

describe('TransactionModal', () => {
  const mockProducts: Product[] = [{
    id: '1',
    name: 'Product 1',
    unitPrice: 100,
  }];

  const mockUser: User = {
    name: 'John Doe',
    balance: 1000,
    products: [],
    history: [],
  };

  const closeTransactionModal = vi.fn();
  const setUnits = vi.fn();
  const updateUser = { mutate: vi.fn() };
  const setRunningTotal = vi.fn();

  const renderTransactionModal = () => {
    return render(
      <TransactionModal
        selectedProducts={mockProducts}
        units={{ '1': 1 }}
        user={mockUser}
        closeTransactionModal={closeTransactionModal}
        setUnits={setUnits}
        modalOpen={true}
        updateUser={updateUser}
        runningTotal={0}
        setRunningTotal={setRunningTotal}
      />
    );
  };

  it('renders the modal with product details', () => {
    renderTransactionModal();

    expect(screen.getByText('Selected Products')).toBeInTheDocument();
    expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
    expect(screen.getByLabelText('Units')).toBeInTheDocument();
    expect(screen.getByText('Balance after purchase: 1000')).toBeInTheDocument();
  });

  it('calls setUnits, setRunningTotal when units are changed', () => {
    renderTransactionModal();

    const input = screen.getByLabelText('Units');
    fireEvent.change(input, { target: { value: '2' } });

    expect(setUnits).toHaveBeenCalled();
    expect(setRunningTotal).toHaveBeenCalled();
    //expect(screen.getByText('Balance after purchase: 800')).toBeInTheDocument();
  });

  it('calls updateUser when the Transaction Action Button is clicked', () => {
    renderTransactionModal();

    const button = screen.getByTestId('transaction-action-btn');
    fireEvent.click(button);

    expect(updateUser.mutate).toHaveBeenCalled();
  });

  it('calls closeTransactionModal when the modal is closed', () => {
    renderTransactionModal();

    const closeButton = screen.getByTestId('transaction-modal-close-btn');
    fireEvent.click(closeButton);

    expect(closeTransactionModal).toHaveBeenCalled();
  });
});