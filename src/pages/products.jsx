import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getProducts } from "../service/request";
import { styled } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CoffeeCustomizer from "./productCard";
import arrowRightIcon from "../assets/arrow-right.svg";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: 290,
  display: "flex",
  flexDirection: "column",
}));

const ProductGrid = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const fetchedCategories = async () => {
      const products = await getProducts(id);
      setProducts(products);
    };

    fetchedCategories();
  }, [id]);

  return (
    <>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ xs: 6, sm: 3 }} key={product.id}>
            <StyledCard
              className="card"
              onClick={() => {
                handleOpen(product);
              }}
              sx={{ borderRadius: "0.8rem" }}
            >
              <CardMedia
                component="img"
                height="180"
                image={product?.photo}
                alt={product?.name}
              />
              <CardContent
                style={{ flexGrow: 1 }}
                sx={{
                  py: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    overflow: "hidden",
                    textWrap: "balance",
                    color: "#000",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
										fontWeight: 500
                  }}
                >
                  {product?.name}
                </Typography>
              </CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#fff",
                  marginBottom: 3,
                  paddingLeft: 8, 
                  paddingRight: 8,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={400}
                  fontSize={20}
                  sx={{
                    px: 1,
                  }}
                >
                  {product?.price} ₽
                </Typography>

                <img
                  src={arrowRightIcon}
                  className="card__arrow"
                  variant="contained"
                  sx={{ pt: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(product);
                  }}
                />
              </div>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      
      <CoffeeCustomizer
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductGrid;