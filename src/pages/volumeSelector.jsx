import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import { getVolumes } from '../service/request';

const SizeSelector = ({ id }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [volumes, setVolumes] = useState([]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const fetchedCategories = async () => {
      const volumes = await getVolumes(id);
      const sorted = volumes.sort((a, b) => a.price - b.price)
      setVolumes(sorted);
      setSelectedSize(sorted[0])
    };

    fetchedCategories();
  }, [id]);


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#444',
        borderRadius: 10,
        p: 1,
        mx: 1
      }}
    >
      {/* Кнопки размеров */}
      <Box variant="contained" sx={{ bgcolor: '#333', borderRadius: 8, display: 'flex'}}>
        {volumes.map(option => (
          <Button
            key={option.name}
            onClick={() => handleSizeChange(option)}
            sx={{
              bgcolor: selectedSize.name === option.name ? '#000' : 'transparent',
              color: selectedSize.name === option.name ? '#fff' : '#ccc',
              borderRadius: selectedSize.name === option.name ? '90%' : '0',
              minWidth: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: "3vw",
              py: 1
            }}
          >
            <Box 
              sx={{
                display: 'flex', 
                flexDirection: 'column'
              }}>
              <Typography variant="subtitle1">
                {option.name}
              </Typography>
              {selectedSize.name == option.name && (
                <Typography variant="caption" sx={{ fontSize: '0.5rem' }}>
                  {option.size}
                </Typography>
              )}
            </Box>
          </Button>
        ))}
      </Box>

      {/* Цена */}
      <Button
        sx={{
          bgcolor: '#024e07',
          borderRadius: 8,
          color: '#fff',
          minWidth: '80px'
        }}
      >
        <Typography variant="subtitle1"
        sx={{
          py: 1,
          px: 2
        }}>
           + {selectedSize != null ? selectedSize.price : ""} ₽
        </Typography>
      </Button>
    </Box>
  );
};

export default SizeSelector;