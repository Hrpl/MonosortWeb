import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, IconButton, Dialog, DialogContent, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
	const [selectedAditives, setSelectedAdditives] = useState(1);
  const [additivesCategories, setAdditivesCategories] = useState([]);
	const [additives, setAdditives] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
    setPrice(newValue === 'S' ? 200 : newValue === 'M' ? 250 : 300);
  };

	const getAdditives = () => {
		if(product.id) {
			axios.get(`https://monosortcoffee.ru/api/additive/type?drinkId=${product.id}`)
			.then((res) => {
				setAdditivesCategories(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
		}
	}
	
	useEffect(() => {
		getAdditives();
	}, [product.id]);

	useEffect(() => {
		axios.get(`https://monosortcoffee.ru/api/additive/many/${selectedAditives}`)
		.then((res) => {
			setAdditives(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}, [selectedAditives])
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
          overflowY: 'auto',
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
            color: '#2c5c4f',
            backgroundColor: '#fff',
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
					<div className="modal__additives">
						<div className="modal__categories-list">
							{additivesCategories.map((category) => (
								<button 
									key={category.id} 
									className="modal__categories-list__item"
									onClick={() => setSelectedAdditives(category.id)}
								>
									<img className="img" src={category.photo} alt="Иконка" />
									<p className="title">{category.name}</p>
								</button>
								)
							)}
						</div>
						<div className="modal__grid" style={{display: "grid", gridTemplateColumns: `repeat(${Math.ceil(additives.length / 2) > 3 ? Math.ceil(additives.length / 2) : 4}, 100px)`, gap: "1rem"}}>
							{additives.map((additive) => (
								<button 
									key={additive.id} 
									className="modal__grid-item"
								>
									<img className="img" src={additive.photo} alt="Картинка" />
									<p className="title">{additive.name}</p>
									<span className="price">+{additive.price} ₽</span>
								</button>
							))}
						</div>
					</div>
					<div className='modal__panel'>
						<SizeSelector id={product.id}/>
					</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoffeeCustomizer;