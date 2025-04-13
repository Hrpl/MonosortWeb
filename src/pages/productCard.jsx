import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { Typography, IconButton, Dialog, DialogContent, Slide } from '@mui/material';
import { forwardRef } from 'react';
import { globalStore } from '../store/globalStore';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SizeSelector from './volumeSelector';
import "../styles/card.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CoffeeCustomizer = ({ open, setDialogOpen, product, dialogOpen }) => {
  if (product == null) return null;
  
  // Состояния компонента
  const [selectedSize, setSelectedSize] = useState({price: 0});
  const [selectedAditivesCategories, setSelectedAdditivesCategories] = useState(1);
  const [additivesCategories, setAdditivesCategories] = useState([]);
  const [additives, setAdditives] = useState([]);
	const [priceAdditive, setPriceAdditive] = useState(0);
  const [selectedAdditives, setSelectedAdditives] = useState({
    "drinkId": product.id,
    "volumeId": selectedSize.volumeId,
    "price": (selectedSize.price + priceAdditive),
    "additives": {
      "milkId": 0,
      "sugarCount": 0,
      "siropId": 0,
      "extraShot": 0,
      "sprinkling": 0,
    }
  });
  const [intermediate, setIntermediate] = useState({
    "milkId": 0,
    "sugarCount": 0,
    "siropId": 0,
    "extraShot": 0,
    "sprinkling": 0,
  });

	React.useEffect(() => {
		setSelectedAdditives(prevState => ({
			...prevState,
			price: (selectedSize.price + priceAdditive),
		}));
	}, [selectedSize.price, priceAdditive])

  // Определение текущего ключа добавки на основе выбранной категории
  const getCurrentAdditiveKey = () => {
    const additiveKeys = Object.keys(selectedAdditives.additives);
    if (selectedAditivesCategories >= 1 && selectedAditivesCategories <= additiveKeys.length) {
      return additiveKeys[selectedAditivesCategories - 1];
    }
    return additiveKeys[0]; // Возвращаем первый ключ по умолчанию
  };

	React.useEffect(() => {
		if(dialogOpen === false) {
			setSelectedAdditives({
				"drinkId": product.id,
				"volumeId": selectedSize.volumeId,
				"price": (selectedSize.price + priceAdditive),
				"additives": {
					"milkId": 0,
					"sugarCount": 0,
					"siropId": 0,
					"extraShot": 0,
					"sprinkling": 0,
				}
			})
		}
		setPriceAdditive(0);
	}, [dialogOpen]);

  // Обработчик выбора добавки
  const handleAdditiveSelect = (additive) => {
    const currentKey = getCurrentAdditiveKey();
    const currentValue = selectedAdditives.additives[currentKey];
    const isAlreadySelected = currentKey === "extraShot" 
      ? currentValue === 1 
      : currentValue === additive.id;

    // Обновление selectedAdditives
    setSelectedAdditives(prev => {
      const newValue = isAlreadySelected 
        ? (currentKey === "extraShot" ? 0 : 0)
        : (currentKey === "extraShot" ? 1 : additive.id);
      
      return {
        ...prev,
        additives: {
          ...prev.additives,
          [currentKey]: newValue
        }
      };
    });

    // Обновление intermediate
    setIntermediate(prev => ({
      ...prev,
      [currentKey]: isAlreadySelected ? 0 : additive.price
    }));
  };

  // Проверка, выбрана ли добавка
  const isAdditiveSelected = (additive) => {
    const currentKey = getCurrentAdditiveKey();
    const currentValue = selectedAdditives.additives[currentKey];
    
    if (currentKey === "extraShot") {
      return currentValue === 1;
    }
    return currentValue === additive.id;
  };

  // Эффект при изменении selectedSize
  useEffect(() => {
    if (selectedSize) {
      setSelectedAdditives(prevState => ({
        ...prevState,
        volumeId: selectedSize.volumeId,
      })); 
    }
  }, [selectedSize]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Refs для реализации перетаскивания
  const categoriesListRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const animationIdRef = useRef(null);
  const timestampRef = useRef(0);

  const gridListRef = useRef(null);
  const isGridDraggingRef = useRef(false);
  const startXGridRef = useRef(0);
  const scrollLeftGridRef = useRef(0);
  const lastColumnRef = useRef(0);
  const lastXGridRef = useRef(0);
  const columnWidthRef = useRef(140 + 16);

  const jwt = localStorage.getItem('accessToken');

  const postToCart = () => {
    axios.post("https://monosortcoffee.ru/api/cart/create", 
      selectedAdditives,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    )
    .then(res => {
      console.log(res);
			globalStore.getData();
			Swal.fire({
        position: "center",
        icon: "success",
        title: "Товар добавлен в корзину",
        showConfirmButton: false,
				timer: 1500,
      });	
    })
    .catch(err => {
      console.log(err);
    });
  };

  // Загрузка категорий добавок
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

  // Логирование состояний
  useEffect(() => {
    setPriceAdditive(Object.values(intermediate).reduce((sum, price) => sum + price, 0));
  }, [intermediate]);

  // Загрузка данных при монтировании
  useEffect(() => {
    getAdditives();
  }, [product.id]);

  // Загрузка добавок при изменении категории
  useEffect(() => {
    axios.get(`https://monosortcoffee.ru/api/additive/many/${selectedAditivesCategories}`)
      .then((res) => {
        setAdditives(res.data);
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
  }, [selectedAditivesCategories]);

  // Обработчики событий для перетаскивания категорий
  const handleCategoryClick = (categoryId, event) => {
    setSelectedAdditivesCategories(categoryId);
    
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

  // Обработчики событий для перетаскивания grid
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
    const threshold = 30;
    const columnWidth = columnWidthRef.current;
    const currentScroll = container.scrollLeft;
    const currentColumn = Math.round(currentScroll / columnWidth);
    
    let targetColumn = currentColumn;
    if (Math.abs(deltaX) > threshold) {
      targetColumn = deltaX > 0 ? currentColumn + 1 : currentColumn - 1;
    }
    
    targetColumn = Math.max(0, Math.min(targetColumn, Math.ceil(additives.length / 2) - 1));
    
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
    
    const resistance = 0.5;
    container.scrollLeft = scrollLeftGridRef.current + (deltaX * resistance);
    
    e.preventDefault();
  };

  // Эффекты для добавления/удаления обработчиков событий
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
          onClick={() => {
						setDialogOpen(false);
						setIntermediate({
							"milkId": 0,
							"sugarCount": 0,
							"siropId": 0,
							"extraShot": 0,
							"sprinkling": 0,
						});
					}}
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
              alt={product.name}
            />
            <Typography fontWeight={600} color='#2c5c4f' fontSize={28} sx={{ mt: 1 }}>
              {product.name}
            </Typography>
          </div>
          <div className='card__wave'>
          	<svg preserveAspectRatio="none" viewBox="0 0 434 42" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0H434V7.5C434 7.5 418.948 57.3208 358.5 36C233.5 -8.08915 85.5 88 0 7.5V0Z" fill="white"/>
						</svg>
          </div>
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
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
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
                cursor: 'pointer',
              }}
            >
              {additives.map((additive) => (
                <button 
                  key={additive.id} 
                  className={`modal__grid-item ${isAdditiveSelected(additive) ? 'active' : ''}`}
                  onClick={() => handleAdditiveSelect(additive)}
                >
                  <img className="img" src={additive.photo} alt="Картинка" />
                  <p className="title">{additive.name}</p>
                  <span className="price">+{additive.price} ₽</span>
                </button>
              ))}
            </div>
          </div>
          <div className='modal__panel'>
            <SizeSelector 
              postToCart={postToCart}
              setSelectedSize={setSelectedSize} 
              selectedSize={selectedSize} 
							priceAdditive={priceAdditive}
              id={product.id}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoffeeCustomizer;