import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Product } from "../types/product";

interface ProductTableProps {
    products: Product[];
    handleProductClick: (product: Product) => void;
}
  
const ProductTable = ({ products, handleProductClick }: ProductTableProps) => {

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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> : <div>Products loading...</div>}
        </>
    );
};

export default ProductTable;