import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, IconButton, Dialog, DialogContent, Slide } from '@mui/material';
import waveImage from "../assets/modal-wave1.svg";
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { forwardRef } from 'react';
import SizeSelector from './volumeSelector';
import "../styles/card.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CoffeeCustomizer = ({ open, setDialogOpen, product }) => {
  if (product == null) return null;
  const [volume, setVolume] = useState('M');
  const [price, setPrice] = useState(250);
  const [selectedAditives, setSelectedAdditives] = useState(1);
  const [additivesCategories, setAdditivesCategories] = useState([]);
  const [additives, setAdditives] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Refs для категорий
  const categoriesListRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const animationIdRef = useRef(null);
  const timestampRef = useRef(0);

  // Refs для grid с добавками
  const gridListRef = useRef(null);
  const isGridDraggingRef = useRef(false);
  const startXGridRef = useRef(0);
  const scrollLeftGridRef = useRef(0);
  const lastColumnRef = useRef(0);
  const lastXGridRef = useRef(0);
  const columnWidthRef = useRef(140 + 16); // 140px + 1rem gap
  
  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
    setPrice(newValue === 'S' ? 200 : newValue === 'M' ? 250 : 300);
  };

  const getAdditives = () => {
    if (product.id) {
      axios.get(`https://monosortcoffee.ru/api/additive/type?drinkId=${product.id}`)
        .then((res) => {
          setAdditivesCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getAdditives();
  }, [product.id]);

  useEffect(() => {
    axios.get(`https://monosortcoffee.ru/api/additive/many/${selectedAditives}`)
      .then((res) => {
        setAdditives(res.data);
        // Сбрасываем скролл при смене категории
        if (gridListRef.current) {
          gridListRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
          lastColumnRef.current = 0;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedAditives]);

  // Функция для центрирования выбранной кнопки категорий
  const handleCategoryClick = (categoryId, event) => {
    setSelectedAdditives(categoryId);
    
    const button = event.currentTarget;
    const container = categoriesListRef.current;
    
    if (container && button) {
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      
      const scrollTo = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  // Обработчики для перетаскивания категорий
  const handleMouseDown = (e) => {
    const container = categoriesListRef.current;
    if (!container) return;
    
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    scrollLeftRef.current = container.scrollLeft;
    velocityRef.current = 0;
    lastXRef.current = e.clientX;
    timestampRef.current = performance.now();
    
    e.preventDefault();
    
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const container = categoriesListRef.current;
    if (!container) return;
    
    const x = e.clientX;
    const walk = x - startXRef.current;
    
    container.scrollLeft = scrollLeftRef.current - walk;
    
    const now = performance.now();
    const timeDiff = now - timestampRef.current;
    
    if (timeDiff > 0) {
      const distance = x - lastXRef.current;
      velocityRef.current = distance / timeDiff;
    }
    
    lastXRef.current = x;
    timestampRef.current = now;
    
    e.preventDefault();
  };

  // Анимация инерции для категорий
  const inertiaScroll = () => {
    const container = categoriesListRef.current;
    if (!container || isDraggingRef.current) return;
    
    if (Math.abs(velocityRef.current) > 0.01) {
      container.scrollLeft += velocityRef.current * 16;
      velocityRef.current *= 0.95;
      animationIdRef.current = requestAnimationFrame(inertiaScroll);
    } else {
      velocityRef.current = 0;
      animationIdRef.current = null;
    }
  };

  // Обработчики для перетаскивания grid с добавками (глобальные)
  const handleGridMouseDown = (e) => {
    const container = gridListRef.current;
    if (!container) return;
    
    isGridDraggingRef.current = true;
    startXGridRef.current = e.clientX;
    scrollLeftGridRef.current = container.scrollLeft;
    lastColumnRef.current = Math.round(container.scrollLeft / columnWidthRef.current);
    lastXGridRef.current = e.clientX;
    
    document.addEventListener('mousemove', handleGridMouseMove);
    document.addEventListener('mouseup', handleGridMouseUp);
    
    e.preventDefault();
  };

  const handleGridMouseUp = () => {
    if (!isGridDraggingRef.current) return;
    isGridDraggingRef.current = false;
    
    const container = gridListRef.current;
    if (!container) return;
    
    const deltaX = startXGridRef.current - lastXGridRef.current;
    const threshold = 30; // Порог срабатывания
    const columnWidth = columnWidthRef.current;
    const currentScroll = container.scrollLeft;
    const currentColumn = Math.round(currentScroll / columnWidth);
    
    // Определяем направление и целевую колонку
    let targetColumn = currentColumn;
    if (Math.abs(deltaX) > threshold) {
      targetColumn = deltaX > 0 ? currentColumn + 1 : currentColumn - 1;
    }
    
    // Ограничиваем целевую колонку
    targetColumn = Math.max(0, Math.min(targetColumn, Math.ceil(additives.length / 2) - 1));
    
    // Плавный скролл к целевой колонке
    container.scrollTo({
      left: targetColumn * columnWidth,
      behavior: 'smooth'
    });
    
    lastColumnRef.current = targetColumn;
    
    document.removeEventListener('mousemove', handleGridMouseMove);
    document.removeEventListener('mouseup', handleGridMouseUp);
  };

  const handleGridMouseMove = (e) => {
    if (!isGridDraggingRef.current) return;
    
    const container = gridListRef.current;
    if (!container) return;
    
    lastXGridRef.current = e.clientX;
    const deltaX = startXGridRef.current - e.clientX;
    
    // Плавное перемещение с эффектом резиновой ленты
    const resistance = 0.5;
    container.scrollLeft = scrollLeftGridRef.current + (deltaX * resistance);
    
    e.preventDefault();
  };

  // Эффекты для добавления/удаления обработчиков событий категорий
  useEffect(() => {
    const container = categoriesListRef.current;
    if (!container) return;
    
    const handleUp = () => {
      if (isDraggingRef.current && Math.abs(velocityRef.current) > 0.1) {
        animationIdRef.current = requestAnimationFrame(inertiaScroll);
      }
      isDraggingRef.current = false;
    };
    
    container.addEventListener('mouseup', handleUp);
    container.addEventListener('mouseleave', handleUp);
    
    return () => {
      container.removeEventListener('mouseup', handleUp);
      container.removeEventListener('mouseleave', handleUp);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Очистка глобальных обработчиков при размонтировании
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleGridMouseMove);
      document.removeEventListener('mouseup', handleGridMouseUp);
    };
  }, []);

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

        <div className='card-wrapper'>
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
            <div 
              className="modal__categories-list"
              ref={categoriesListRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              style={{
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
            >
              {additivesCategories.map((category) => (
                <button 
                  key={category.id} 
                  className="modal__categories-list__item"
                  onClick={(e) => handleCategoryClick(category.id, e)}
                >
                  <img className="img" src={category.photo} alt="Иконка" />
                  <p className="title">{category.name}</p>
                </button>
              ))}
            </div>
            <div 
              className="modal__grid"
              ref={gridListRef}
              onMouseDown={handleGridMouseDown}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.ceil(additives.length / 2) > 3 ? Math.ceil(additives.length / 2) : 4}, 140px)`,
                gap: "1rem",
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                cursor: 'grab',
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
            >
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