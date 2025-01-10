import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, createTheme } from '@mui/material/styles';
import { forwardRef } from 'react';
import SizeSelector from './volumeSelector';

// Transition (анимация снизу вверх)
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CoffeeCustomizer = ({ open, onClose, product }) => {
  if(product == null) return null;
  const [volume, setVolume] = useState('M');
  const [price, setPrice] = useState(250);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
    setPrice(newValue === 'S' ? 200 : newValue === 'M' ? 250 : 300); // Update price
  };

  return (
    <Dialog open={open} onClose={onClose} 
      fullScreen={fullScreen} 
      TransitionComponent={Transition} 
      transitionDuration={{ enter: 400, exit: 300 }}>

      <DialogContent
        sx={{
          p: 0,
          bgcolor: '#222',
          color: '#fff',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {/* Кнопка закрытия окна */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#fff',
            backgroundColor: '#888',
            borderRadius: '90%'
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Изображение и заголовок */}
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={product.photo}
            style={{ width: '100%', height: '60vh' }}
          />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="body2">настрой как любишь</Typography>
        </Box>

        

        <Box>
          <div
            style={{
              position: 'fixed', // Фиксируем элемент
              bottom: '1rem', // Прижимаем к низу экрана
              width: '100%', // Растягиваем на всю ширину экрана
              zIndex: 1000, // Помещаем выше основного контента
            }}
          >
            <SizeSelector id={product.id}/>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CoffeeCustomizer;