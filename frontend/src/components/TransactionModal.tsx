import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { User, UserProduct } from "../types/user";
import { TransactionHistory } from "../types/history";
import { Product } from "../types/product";
import { ModalClose, Modal, ModalDialog } from "@mui/joy";

interface TransactionModalProps {
    user: User;
    selectedProducts: Product[];
    units: { [key: string]: number };
    setUnits: (units: { [key: string]: number }) => void;
    modalOpen: boolean;
    closeTransactionModal: () => void;
    updateUser: any;
    runningTotal: number;
    setRunningTotal: (runningTotal: number) => void;
}
  
const TransactionModal = ({ user, selectedProducts, units, setUnits, modalOpen, closeTransactionModal, updateUser, runningTotal, setRunningTotal }: TransactionModalProps) => {

    //const { updateUser } = useUser();
    //const [runningTotal, setRunningTotal] = useState(0);

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

            updateUser.mutate({ ...user, products: newProducts, balance: newBalance, history: [...user.history, ...newHistory] } as User);
            closeTransactionModal();
        }
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

    return (
        <Modal open={modalOpen} onClose={() => closeTransactionModal()}>
            <ModalDialog>
                <ModalClose onClick={() => closeTransactionModal()} data-testid={'transaction-modal-close-btn'} />
                <div style={{ padding: 20, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
                <h2 style={{ color: 'black' }}>Selected Products</h2>
                {selectedProducts.map(product => (
                    <div key={product.id}>
                    <h3 style={{ color: 'black' }}>{product.name}</h3>
                    <TextField
                        data-cy={`units-${product.id}-input`}
                        label="Units"
                        type="number"
                        inputProps={{ min: 0 }}
                        value={units[product.id] || 0}
                        onChange={(e) => handleUnitsChange(product.id, Number(e.target.value))}
                    />
                    </div>
                ))}
                <p style={{ color: 'black' }}>Balance after purchase: {user.balance - runningTotal}</p>
                <Button data-cy={'transaction-action-btn'} data-testid={'transaction-action-btn'} disabled={Object.values(units).every(unit => unit === 0) || runningTotal > user.balance} onClick={handleTransaction} color="primary" variant="contained">Buy</Button>
                </div>
            </ModalDialog>
        </Modal>
    );
};

export default TransactionModal;
  