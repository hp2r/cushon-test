import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { useUser } from './queries/useUser';
import { useProducts } from './queries/useProducts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Button } from '@mui/material';
import { Product } from './types/product';
import { TransactionHistory } from './types/history';
import { User, UserProduct } from './types/user';
import HistoryScreen from './components/HistoryScreen';
import UserHeader from './components/UserHeader';
import ProductTable from './components/ProductTable';
import TransactionModal from './components/TransactionModal';

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
  /*
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
      const newHistory: TransactionHistory[] = [];
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
  */
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
              <>
              <UserHeader user={user} link={Link} />
              <ProductTable products={products} handleProductClick={handleProductClick} />
              <TransactionModal user={user} selectedProducts={selectedProducts} units={units} setUnits={setUnits} modalOpen={modalOpen} closeTransactionModal={closeTransactionModal} updateUser={updateUser} runningTotal={runningTotal} setRunningTotal={setRunningTotal}/>  
              </>
              : <div>User loading...</div>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
