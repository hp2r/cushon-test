import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { TransactionHistory } from '../types/history';
import { useNavigate } from 'react-router-dom';

interface HistoryScreenProps {
  history: TransactionHistory[];
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history }) => {

  const navigate = useNavigate();

  return (
    <>
    <div style={{display:'flex'}} className='button-container'>
      <Button aria-label="Go Back" data-testid={'back-btn'} onClick={() => navigate(-1)} variant="contained">Back</Button>
    </div>
    <h2>Transaction History</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Transaction Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.productName}</TableCell>
              <TableCell>{entry.transactionAmount}</TableCell>
              <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default HistoryScreen;