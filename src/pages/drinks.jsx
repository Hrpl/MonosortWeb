import React, { useEffect, useState } from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getDrinks } from '../service/request';
import { styled } from '@mui/material/styles'; // Импортируем styled
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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
          <StyledCard sx={{backgroundColor:"#111", borderRadius: "0.8rem"}}>
            <CardMedia
              component="img"
              height="180"
              image={drink.photo}
              alt={drink.name}
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
                {drink.name}
              </Typography>
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'end', color: '#fff'}}>
              <Typography size="middle" disabled={!drink.isExistence}>
                <KeyboardArrowRightIcon />
              </Typography>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default DrinkGrid;