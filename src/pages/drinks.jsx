import React, { useEffect, useState } from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getDrinks } from '../service/request';
import { styled } from '@mui/material/styles'; // Импортируем styled

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%', // Устанавливаем ширину карточки
  height: '300px', // Устанавливаем фиксированную высоту карточки
  display: 'flex',
  flexDirection: 'column',
}));

const DrinkGrid = ({ id }) => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchedCategories = async () => {
      const drinks = await getDrinks(id);
      setDrinks(drinks);
    };

    fetchedCategories();
  }, [id]);

  return (
    <Grid container spacing={2}>
      {drinks.map((drink) => (
        <Grid item size={{xs: 6, sm: 3}} key={drink.id}>
          <StyledCard>
            <CardMedia
              component="img"
              height="140"
              image={drink.photo}
              alt={drink.name}
            />
            <CardContent style={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                style={{
                    overflow: 'hidden',
                    textWrap: 'balance',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitLineClamp: 2, // Указывает на количество строк
                    WebkitBoxOrient: 'vertical'
                  }}
              >
                {drink.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" disabled={!drink.isExistence}>
                Купить
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default DrinkGrid;