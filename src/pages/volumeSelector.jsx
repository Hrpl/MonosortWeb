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
        sx={{
          bgcolor: "#333",
          borderRadius: 8,
          position: "relative", // Нужен для абсолютного позиционирования скользящего элемента
          display: "flex",
          flexGrow: 1,
          mx: 1,
        }}
      >
        {/* Скользящий элемент */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: `${sliderPosition * (100 / volumes.length)}%`, // Расчёт позиции на основе индекса
            width: `${100 / volumes.length}%`, // Ширина подсветки равна ширине одной кнопки
            height: "100%",
            bgcolor: "#000",
            borderRadius: 9,
            transition: "all 0.3s ease", // Плавная анимация перемещения
            zIndex: 1, // Располагаем под кнопками
          }}
        ></Box>

        {/* Кнопки размеров */}
        {volumes.map((option, index) => (
          <Button
            disableRipple={true}
            key={option.name}
            onClick={() => handleSizeChange(option, index)} // Передаём индекс для расчёта позиции ползунка
            sx={{
              "&:focus": {
                border: "none", // Убираем стандартный outline
              },
              "&:active": {
                border: "none", // Убираем стандартный outline
              },
              zIndex: 2, // Располагаем поверх скользящего элемента
              position: "relative",
              bgcolor:
                selectedSize?.name === option.name
                  ? "transparent"
                  : "transparent",
              color: selectedSize?.name === option.name ? "#fff" : "#ccc",
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
                <Typography variant="caption" sx={{ fontSize: "0.5rem" }}>
                  {option.size}
                </Typography>
              )}
            </Box>
          </Button>
        ))}
      </Box>

      {/* Цена кнопки */}
      <Button
        disableRipple={true}
				className="card__button"
        sx={{
          flexGrow: 1,
          bgcolor: "#024e07",
          borderRadius: 8,
          color: "#fff",
          minWidth: "80px",
          mx: 1,
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
