import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { getCategory } from "../service/request";
import ProductGrid from "./products";
import "../styles/category.css";

const Categories = () => {
  const [value, setValue] = useState(1);
  const [categories, setCategories] = useState([]);
  const tabsContainerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const fetchedCategories = async () => {
      const categories = await getCategory();
      setCategories(categories);
    };
    fetchedCategories();
  }, []);

  const centerActiveTab = (clickedTab) => {
    if (!tabsContainerRef.current || !clickedTab) return;
    
    const container = tabsContainerRef.current;
    const containerWidth = container.offsetWidth;
    const tabLeft = clickedTab.offsetLeft;
    const tabWidth = clickedTab.offsetWidth;
    
    const scrollTo = tabLeft - (containerWidth / 2) + (tabWidth / 2);
    
    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e) => {
    if (!tabsContainerRef.current) return;
    
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    scrollLeftRef.current = tabsContainerRef.current.scrollLeft;
    
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !tabsContainerRef.current) return;
    
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startXRef.current);
    tabsContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    
    startXRef.current = x;
    scrollLeftRef.current = tabsContainerRef.current.scrollLeft;
  };

  const handleTabClick = (categoryId, e) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      return;
    }
    setValue(categoryId);
    centerActiveTab(e.currentTarget);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <div
        className="tabs-container"
        ref={tabsContainerRef}
        onMouseDown={handleMouseDown}
      >
        <div className="tabs">
          {categories?.map((category) => (
            <button
              onClick={(e) => handleTabClick(category.id, e)}
              className={value === category.id ? "tabs__item active" : "tabs__item"}
              key={category.id}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {categories?.map((category) => (
        <div
          key={category.id}
          className="tabpanel"
          hidden={value !== category.id}
        >
          {value === category.id && (
            <Box sx={{ p: 3 }}>
              <ProductGrid id={category.id} />
            </Box>
          )}
        </div>
      ))}
    </Box>
  );
};

export default Categories;