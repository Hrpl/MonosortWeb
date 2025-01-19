import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { getCategory } from "../service/request";
import ProductGrid from "./products";
import "../styles/category.css";

const Categories = () => {
  const [value, setValue] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchedCategories = async () => {
      var categories = await getCategory();
      setCategories(categories);
    };

    fetchedCategories();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="tabs">
        {categories?.map((category) => (
          <button
            onClick={() => setValue(category.id)}
            className={
              value === category.id ? "tabs__item active" : "tabs__item"
            }
            key={category.id}
          >
            {category.name}
          </button>
        ))}
      </div>
      {categories?.map((category, index) => (
        <div
					key={category.id}
          role="tabpanel"
          hidden={value !== index}
          id={`scrollable-auto-tabpanel-${index}`}
          aria-labelledby={`scrollable-auto-tab-${index}`}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>
                <ProductGrid id={category.id} />
              </Typography>
            </Box>
          )}
        </div>
      ))}
    </Box>
  );
};

export default Categories;
