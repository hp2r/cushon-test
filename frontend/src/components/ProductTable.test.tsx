import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductTable from './ProductTable';
import { Product } from '../types/product';
import { User } from '../types/user';

describe('ProductTable', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      unitPrice: 100,
    },
    {
      id: '2',
      name: 'Product 2',
      unitPrice: 200,
    },
  ];

  const mockUser: User = {
    name: 'John Doe',
    balance: 1000,
    products: [
      {
        id: '1',
        name: 'Product 1',
        unitsHeld: 11
      },
      {
        id: '2',
        name:'Product 2',
        unitsHeld: 6
      }
    ],
    history: [],
  };

  const handleProductClick = vi.fn();

  const renderProductTable = () => {
    return render(<ProductTable user={mockUser} products={mockProducts} handleProductClick={handleProductClick} />);
  };

  it('renders the product table with headers', () => {
    renderProductTable();

    expect(screen.getByText('Product ID')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Unit Price')).toBeInTheDocument();
  });

  it('renders the correct number of rows', () => {
    renderProductTable();

    const rows = screen.getAllByRole('row');
    // Including the header row, there should be mockProducts.length + 1 rows
    expect(rows).toHaveLength(mockProducts.length + 1);
  });

  it('renders the correct data in the table', () => {
    renderProductTable();

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.id)).toBeInTheDocument();
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.unitPrice.toString())).toBeInTheDocument();
    });
    mockUser.products.forEach((product) => {
      expect(screen.getByText(product.unitsHeld.toString())).toBeInTheDocument();
    });
  });

  it('calls handleProductClick when a product row is clicked', () => {
    renderProductTable();

    const row = screen.getByText('Product 1').closest('tr');
    if (row) {
      fireEvent.click(row);
    }

    expect(handleProductClick).toHaveBeenCalledWith(mockProducts[0]);
  });
});