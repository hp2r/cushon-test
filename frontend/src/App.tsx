import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { useUser } from './queries/useUser';
import { useProducts } from './queries/useProducts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Button } from '@mui/material';
import { Product } from './types/product';
import { History } from './types/history';
import { User, UserProduct } from './types/user';
import HistoryScreen from './components/HistoryScreen';

const queryClient = new QueryClient();

function App() {
  const { user, updateUser, responseSuccess } = useUser();
  const { products } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [runningTotal, setRunningTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [units, setUnits] = useState<{ [key: string]: number }>({});

  const handleProductClick = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
    setModalOpen(true);
  };

  const handleUnitsChange = (productId: string, value: number) => {
    setRunningTotal(selectedProducts.reduce((acc, product) => {
      if (product.id === productId) {
        return acc + (product.unitPrice * value);
      }
      return acc + (product.unitPrice * (units[product.id] || 0));
    }, 0));
    setUnits({ ...units, [productId]: value });
  };

  const handleTransaction = () => {
    if (user && selectedProducts.length > 0) {
      let newBalance = user.balance;
      const newHistory: History[] = [];
      const newProducts: UserProduct[] = user.products.map((product: UserProduct) => {
        const selectedProduct = selectedProducts.find(p => p.id === product.id);
        if (selectedProduct) {
          const transactionAmount = selectedProduct.unitPrice * (units[selectedProduct.id] || 0);
          newBalance -= transactionAmount;
          newHistory.push({
            productName: selectedProduct.name,
            transactionAmount,
            date: new Date().toISOString()
          });
          return { ...product, unitsHeld: product.unitsHeld + (units[selectedProduct.id] || 0) };
        }
        return product;
    });

      updateUser.mutate({ ...user, products: newProducts, balance: newBalance, history: [...user.history, newHistory] } as User);
      closeTransactionModal();
    }
  };

  const closeTransactionModal = () => {
    setModalOpen(false);
    setSelectedProducts([]);
    setRunningTotal(0);
    setUnits({});
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/history" element={user ? <HistoryScreen history={user.history} /> : <div>Loading...</div>} />
          <Route path="/" element={
            user ?
              <div>
                <div>
                  <div>Welcome, {user.name}</div>
                  <div>Your balance: {user.balance}</div>
                </div>
                <Button component={Link} to="/history">View History</Button>
                {products && products.length > 0 ?
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product ID</TableCell>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Unit Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((product: Product) => (
                          <TableRow key={product.id} onClick={() => handleProductClick(product)}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.unitPrice}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer> : <div>Products loading...</div>}
                <Modal open={modalOpen} onClose={() => closeTransactionModal()}>
                  <div style={{ padding: 20, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
                    <h2 style={{ color: 'black' }}>Selected Products</h2>
                    {selectedProducts.map(product => (
                      <div key={product.id}>
                        <h3 style={{ color: 'black' }}>{product.name}</h3>
                        <TextField
                          label="Units"
                          type="number"
                          inputProps={{ min: 0 }}
                          value={units[product.id] || 0}
                          onChange={(e) => handleUnitsChange(product.id, Number(e.target.value))}
                        />
                      </div>
                    ))}
                    <p style={{ color: 'black' }}>Balance after purchase: {user.balance - runningTotal}</p>
                    <Button disabled={Object.values(units).every(unit => unit === 0) || runningTotal > user.balance} onClick={handleTransaction} color="primary" variant="contained">Buy</Button>
                  </div>
                </Modal>
              </div>
              : <div>User loading...</div>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
