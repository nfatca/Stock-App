import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { btnHoverStyle } from "../styles/globalStyle";
import { CardHeader } from "@mui/material";
import useStockCalls from "../hooks/useStockCalls";

export default function BrandCard({ brand, setOpen, setInfo }) {
  const { deleteBrand } = useStockCalls();
  return (
    <Card
      elevation={10}
      sx={{
        p: 3,
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title={brand?.name} subheader={brand?.address} />
      <CardMedia
        image={brand?.image}
        sx={{ objectFit: "contain", height: "250px" }}
        component="img"
        alt="brand-img"
      />
      <CardContent>
        {/* <Typography variant="body2" color="text.secondary">
          Phone: {brand?.phone}
        </Typography> */}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <EditIcon
          sx={btnHoverStyle}
          onClick={() => {
            setInfo(brand);
            setOpen(true);
          }}
        />
        <DeleteOutlineIcon
          sx={btnHoverStyle}
          onClick={() => deleteBrand(brand?.id)}
        />
      </CardActions>
    </Card>
  );
}
