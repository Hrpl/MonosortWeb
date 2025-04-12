import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { getCategory } from "../service/request";
import ProductGrid from "./products";
import "../styles/category.css";
import { observer } from "mobx-react-lite";
import { globalStore } from "../store/globalStore";

const Categories = observer(() => {
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

    // Очистка обработчиков при размонтировании
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
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
    startXRef.current = e.pageX - tabsContainerRef.current.offsetLeft;
    scrollLeftRef.current = tabsContainerRef.current.scrollLeft;
    
    const container = tabsContainerRef.current;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
    
    // Добавляем обработчики на document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (tabsContainerRef.current) {
      tabsContainerRef.current.style.cursor = 'grab';
    }
    
    // Удаляем обработчики с document
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !tabsContainerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - tabsContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    tabsContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTabClick = (categoryId, e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }
    setValue(categoryId);
    centerActiveTab(e.currentTarget);
  };

	console.log(globalStore.orderStatus)
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <div
        className="tabs-container"
        ref={tabsContainerRef}
        onMouseDown={handleMouseDown}
				style={{
					top: (globalStore.orderStatus !== 2) && "0px",
				}}
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
            <Box sx={{ px: 2, py: 4 }}>
              <ProductGrid id={category.id} />
            </Box>
          )}
        </div>
      ))}
    </Box>
  );
});

export default Categories;