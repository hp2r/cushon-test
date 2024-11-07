import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Product } from "../types/product";
import { User, UserProduct } from "../types/user";

interface ProductTableProps {
    user: User;
    products: Product[];
    handleProductClick: (product: Product) => void;
}
  
const ProductTable = ({ user, products, handleProductClick }: ProductTableProps) => {

    return (
        <>
            {products && products.length > 0 ?
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Units Held</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product: Product) => (
                    <TableRow sx={{
                        cursor: 'pointer',
                        '&:hover': {
                        backgroundColor: '#f5f5f5',
                    },}} data-cy={`${product.id}-row`} data-testid={`${product.id}-row`} key={product.id} onClick={() => handleProductClick(product)}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.unitPrice}</TableCell>
                      <TableCell>{user.products.find((p:UserProduct) => p.id === product.id)?.unitsHeld || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> : <div>Products loading...</div>}
        </>
    );
};

export default ProductTable;