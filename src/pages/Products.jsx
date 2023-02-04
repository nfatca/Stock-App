import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { arrowStyle, btnHoverStyle, selectCenter } from "../styles/globalStyle";
import useSortColumn from "../hooks/useSortColumn";
import ProductModal from "../components/modals/ProductModal";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import MultiSelect from "../components/MultiSelect";

const Products = () => {
  const {
    getBrands,
    getCategories,
    getProducts,
    getProCatBrands,
    deleteProduct,
  } = useStockCalls();
  const { products, brands } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setselectedProducts] = useState([]);
  // console.log(products);
  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
    // getProCatBrands();
  }, []);

  // Siralama da kullanilacak toggle state'i
  const columnObj = {
    name: 1,
    brand: 1,
    stock: 1,
  };
  const { sortedData, handleSort, column } = useSortColumn(products, columnObj);

  const isBrandSelected = (item) =>
    selectedBrands.includes(item.brand) || selectedBrands.length === 0;

  const isProductSelected = (item) =>
    selectedProducts.includes(item.name) || selectedProducts.length === 0;

  const filterProducts = products
    ?.filter((item) => selectedBrands?.includes(item.brand))
    .map((item) => item.name);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        NEW PRODUCT
      </Button>
      <Box sx={selectCenter}>
        {/* <MultiSelectBox
          handleSelect={(item) => setSelectedBrands(item)}
          placeholder="Select Brand"
        >
          {brands?.map((item) => (
            <MultiSelectBoxItem
              key={item.name}
              value={item.name}
              text={item.name}
            />
          ))}
        </MultiSelectBox>

        <MultiSelectBox
          handleSelect={(item) => setselectedProducts(item)}
          placeholder="Select Product"
        >
          {filterProducts?.map((item) => (
            <MultiSelectBoxItem key={item} value={item} text={item} />
          ))}
        </MultiSelectBox> */}
      </Box>
      <ProductModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      {sortedData?.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>

                <TableCell align="center">Category</TableCell>

                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("brand", "text")}
                  >
                    <span>Brand</span>
                    {column.brand === 1 && <UpgradeIcon />}
                    {column.brand !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("name", "text")}
                  >
                    <span>Name</span>
                    {column.name === 1 && <UpgradeIcon />}
                    {column.name !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <span>Stock</span>
                    {column.stock === 1 && <UpgradeIcon />}
                    {column.stock !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>

                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                ?.filter((item) => isBrandSelected(item))
                .filter((item) => isProductSelected(item))
                .map((product, index) => (
                  <TableRow
                    key={product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="product">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.brand}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell align="center" sx={btnHoverStyle}>
                      <DeleteOutlineIcon
                        onClick={() => deleteProduct(product.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
