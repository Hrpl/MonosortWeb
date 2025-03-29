import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { getVolumes } from "../service/request";

const SizeSelector = ({ id }) => {
  const [selectedSize, setSelectedSize] = useState(null); // Выбранный размер
  const [volumes, setVolumes] = useState([]); // Массив данных размеров
  const [sliderPosition, setSliderPosition] = useState(0); // Позиция скользящей подсветки

  const handleSizeChange = (size, index) => {
    setSelectedSize(size); // Устанавливаем выбранный размер
    setSliderPosition(index); // Обновляем позицию "ползунка" (индекс кнопки)
  };

  // Эффект для загрузки данных с сервера
  useEffect(() => {
    const fetchCategories = async () => {
      const volumes = await getVolumes(id);
      const sorted = volumes.sort((a, b) => a.price - b.price); // Сортируем по цене
      setVolumes(sorted);
      setSelectedSize(sorted[0]); // Устанавливаем размер по умолчанию
    };

    fetchCategories();
  }, [id]);

  return (
    <div className="card__selector"
    >
      {/* Блок с кнопками */}
      <Box
				className="card__size"
        sx={{
          bgcolor: "#161616",
          borderRadius: 8,
          position: "relative", // Нужен для абсолютного позиционирования скользящего элемента
          display: "flex",
          flexGrow: 1,
					height: 70
        }}
      >
        {/* Активный элемент */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: `${sliderPosition * (100 / volumes.length)}%`, 
            width: `${100 / volumes.length}%`,
            height: "100%",
            bgcolor: "#fff",
            borderRadius: 9,
            transition: "all 0.3s ease", 
            zIndex: 1, 
          }}
        ></Box>

        {/* Кнопки размеров */}
        {volumes.map((option, index) => (
          <Button
            disableRipple={true}
            key={option.name}
            onClick={() => handleSizeChange(option, index)}
            sx={{
              "&:focus": {
                border: "none",
              },
              "&:active": {
                border: "none",
              },
              zIndex: 2,
              position: "relative",
              bgcolor:
                selectedSize?.name === option.name
                  ? "transparent"
                  : "transparent",
              color: selectedSize?.name === option.name ? "#2c5c4f" : "#ccc",
              width: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6">{option.name}</Typography>
              {selectedSize?.name === option.name && (
                <Typography variant="caption" sx={{ fontSize: "10px" }}>
                  {option.size}
                </Typography>
              )}
            </Box>
          </Button>
        ))}
      </Box>

      {/* Цена кнопки */}
      <Button
				style={{
					marginRight: 6
				}}
        disableRipple={true}
				className="card__button"
        sx={{
          flexGrow: 1,
          bgcolor: "#2c5c4f",
          borderRadius: 8,
          color: "#fff",
          minWidth: "80px",
					height: 70,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            py: 1,
            px: 2,
          }}
        >
          + {selectedSize != null ? selectedSize.price : ""} ₽
        </Typography>
      </Button>
    </div>
  );
};

export default SizeSelector;
