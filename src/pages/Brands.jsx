import { Grid, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";
import useStockCalls from "../hooks/useStockCalls";

const Brands = () => {
  const { getBrands } = useStockCalls();
  const { brands } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Brands
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        NEW BRAND
      </Button>

      <BrandModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />

      {brands?.length > 0 && (
        <Grid container justifyContent="center" gap={3} mt={3}>
          {brands?.map((brand) => (
            <Grid item key={brand.id}>
              <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Brands;
