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
import "../styles/card.css";

// Transition (анимация снизу вверх)
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CoffeeCustomizer = ({ open, setDialogOpen, product }) => {
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
    <Dialog 
			open={open} 
			onClose={() => setDialogOpen(false)}
      fullScreen={fullScreen} 
			style={{borderRadius: 0}}
      TransitionComponent={Transition} 
      transitionDuration={{ enter: 400, exit: 300 }}
		>
      <DialogContent
			className='fasfasfas'
        sx={{
          p: 0,
          bgcolor: '#222',
          color: '#fff',
          overflow: 'hidden',
          borderRadius: 0,
        }}
      >
        <IconButton
          onClick={() => setDialogOpen(false)}
					disableRipple={true}
					className='card__close'
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

        <div 
					className='card-wrapper'
				>
          <img
            src={product.photo}
						className='card__img'
          />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="body2">настрой как любишь</Typography>
						<div
							className='modal__panel'
						>
							<SizeSelector id={product.id}/>
						</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoffeeCustomizer;