import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getAdditives } from '../service/request';
import { styled } from '@mui/material/styles'; // Импортируем styled

function allyProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }


const Additives = () => {
  const [additives, setAdditives] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchedAdditives = async () => {
      const additives = await getAdditives();
      setAdditives(additives);
    };

    fetchedAdditives();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedCategoryId = additives[newValue].id;
    console.log("Выбранная категория ID:", selectedCategoryId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{backgroundColor: "#222"}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor='#eb8f20'
        textColor="inherit"
        aria-label="scrollable auto tabs example"
      >
        {additives.map((additive, index) => (
          <Tab sx={{fontSize: "1rem", textTransform: 'lowercase'}} label={additive.name} {...allyProps(index)} key={additive.id} />
        ))}
      </Tabs>
    </AppBar>
  </Box>
  );
};

export default Additives;