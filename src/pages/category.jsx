import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import {getCategory} from '../service/request';
import DrinkGrid from './drinks';

function allyProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Categories = () => {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchedCategories = async () =>{
        var categories = await getCategory();
        setCategories(categories);
    }

    fetchedCategories();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedCategoryId = categories[newValue].id;
    console.log("Выбранная категория ID:", selectedCategoryId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "#fff"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categories.map((category, index) => (
            <Tab label={category.name} {...allyProps(index)} key={category.id} />
          ))}
        </Tabs>
      </AppBar>
      {categories.map((category, index) => (
        <TabPanel value={value} index={index} key={category.id}>
            <DrinkGrid id={category.id}/>
        </TabPanel>
      ))}
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Categories;