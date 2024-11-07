import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import HistoryScreen from './HistoryScreen';
import { TransactionHistory } from '../types/history';

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockUseNavigate,
  };
});

describe('HistoryScreen', () => {
  const mockHistory: TransactionHistory[] = [
    {
      productName: 'Product 1',
      transactionAmount: 100,
      date: '2023-01-01T00:00:00.000Z',
    },
    {
      productName: 'Product 2',
      transactionAmount: 200,
      date: '2023-01-02T00:00:00.000Z',
    },
  ];

  it('renders the history table', () => {
    render(<HistoryScreen history={mockHistory} />);

    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Transaction Amount')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders the correct number of rows', () => {
    render(<HistoryScreen history={mockHistory} />);

    const rows = screen.getAllByRole('row');
    // Including the header row, there should be mockHistory.length + 1 rows
    expect(rows).toHaveLength(mockHistory.length + 1);
  });

  it('renders the correct data in the table', () => {
    render(<HistoryScreen history={mockHistory} />);

    mockHistory.forEach((entry) => {
      expect(screen.getByText(entry.productName)).toBeInTheDocument();
      expect(screen.getByText(entry.transactionAmount.toString())).toBeInTheDocument();
      expect(screen.getByText(new Date(entry.date).toLocaleString())).toBeInTheDocument();
    });
  });

  it('navigates back when the Back button is clicked', () => {
    render(<HistoryScreen history={mockHistory} />);

    const backButton = screen.getByTestId('back-btn');
    fireEvent.click(backButton);

    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });
});