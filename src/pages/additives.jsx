import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getAdditives } from '../service/request';
import { styled } from '@mui/material/styles'; // Импортируем styled
import AdditiveMenu from './additiveMenu/additiveMenu';

function allyProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }


const Additives = () => {
  const [additivesType, setAdditivesType] = useState([]);
  const [value, setValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState();
  
  const handleOpen = (type) => {
      setSelectedType(type)
      setDialogOpen(true);
    };
  
    const handleClose = () => {
      setDialogOpen(false);
    };
  

  useEffect(() => {
    const fetchedAdditives = async () => {
      const additivesType = await getAdditives();
      setAdditivesType(additivesType);
    };

    fetchedAdditives();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedCategoryId = additivesType[newValue].id;
    console.log("Выбранная категория ID:", selectedCategoryId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AdditiveMenu open={dialogOpen} 
                  onClose={handleClose} 
                  type={selectedType} />
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
          {additivesType.map((additive, index) => (
            <Tab sx={{fontSize: "1rem", textTransform: 'lowercase'}} label={additive.name} {...allyProps(index)} key={additive.id} 
              onClick={() => {handleOpen(additive)}}/>
          ))}
        </Tabs>
      </AppBar>
    </Box>
  );
};

export default Additives;