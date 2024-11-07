import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useUser } from './queries/useUser';
import { useProducts } from './queries/useProducts';
import { Product } from './types/product';
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
              <UserHeader user={user}/>
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
