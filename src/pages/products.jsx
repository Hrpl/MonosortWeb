import React, { useEffect, useState } from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getProducts } from '../service/request';
import { styled } from '@mui/material/styles'; // Импортируем styled
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CoffeeCustomizer from "./productCard"

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%', // Устанавливаем ширину карточки
  height: '300px', // Устанавливаем фиксированную высоту карточки
  display: 'flex',
  flexDirection: 'column',
}));

const ProductGrid = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product)
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
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item size={{xs: 6, sm: 3}} key={product.id}>
          <StyledCard sx={{backgroundColor:"#111", borderRadius: "0.8rem"}}>
            <CardMedia
              component="img"
              height="180"
              image={product.photo}
              alt={product.name}
            />
            <CardContent style={{ flexGrow: 1}}>
              <Typography
                variant="body"
                component="div"
                style={{
                    overflow: 'hidden',
                    textWrap: 'balance',
                    color: '#fff',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitLineClamp: 2, // Указывает на количество строк
                    WebkitBoxOrient: 'vertical'
                  }}
              >
                {product.name}
              </Typography>
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'end', color: '#fff'}}>
              <Typography size="middle" disabled={!product.isExistence}>
                <KeyboardArrowRightIcon onClick={() => {
                  handleOpen(product);
                }}
                  variant="contained"
                  sx={{ color: '#fff', py: 1 }}/>
        
                <CoffeeCustomizer 
                open={dialogOpen} 
                onClose={handleClose} 
                product={selectedProduct} />

              </Typography>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;