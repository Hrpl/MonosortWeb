import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, IconButton, Dialog, DialogContent, Slide } from '@mui/material';
import waveImage from "../assets/modal-wave1.svg";
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
        sx={{
          p: 0,
          bgcolor: '#1b1d1c',
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
            top: 16,
            right: 16,
            color: '#2c5c4f',
            backgroundColor: '#fff',
            borderRadius: '90%',
						zIndex: 3,
						boxShadow: "0 0 2px 0 #b7b7b7",
          }}
        >
          <CloseIcon />
        </IconButton>

        <div 
					className='card-wrapper'
				>
          <div className='card__background'>
          	<img
	            src={product.photo}
							className='card__img'
	          />
	          <Typography fontWeight={600} color='#2c5c4f' fontSize={28} sx={{ mt: 1 }}>
	            {product.name}
	          </Typography>
          </div>
					<img className='card__wave' src={waveImage} alt="Волна" />
					<Typography mt={4} fontWeight={400} color="#fff" fontSize={20}>настрой как любишь</Typography>
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
						<div className="modal__grid" style={{display: "grid", gridTemplateColumns: `repeat(${Math.ceil(additives.length / 2) > 3 ? Math.ceil(additives.length / 2) : 4}, 140px)`, gap: "1rem"}}>
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