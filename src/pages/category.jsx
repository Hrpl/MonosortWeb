import React, { useEffect, useState } from 'react';
import { Drawer, Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Иконка бургер-меню
import CloseIcon from '@mui/icons-material/Close'; // Иконка закрытия
import {getCategory} from '../service/request';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false); // Состояние для управления видимостью меню
    const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect (()  => {
    const fetchCategories = async () => {
        let data = await getCategory();
        setCategories(data);
    }
    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    console.log(selectedCategory.id);
    setMenuOpen(false); // Закрываем меню после выбора категории
  };

  return (
    <div>
      {/* Кнопка открытия бургер-меню */}
      <IconButton 
        color="primary" 
        onClick={toggleMenu} 
        aria-label="menu"
        sx={{ top: 1, left: 20 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Выдвижное меню с категориями */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box
          sx={{
            width: 250, // Ширина бокового меню
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
          }}
          role="presentation"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Категории</Typography>

            {/* Кнопка закрытия меню */}
            <IconButton aria-label="close" onClick={toggleMenu}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {categories.map((category) => (
              <ListItem 
                key={category.id} 
                button 
                onClick={() => selectCategory(category)}
                selected={selectedCategory?.id === category.id} // Выделение выбранной категории
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Categories;