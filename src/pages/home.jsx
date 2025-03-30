import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartIcon from "../assets/cart.svg";
import Categories from "./category";
import Cart from "../components/cart/Cart";
import Orders from "../components/orders/Orders";

const Home = () => {
  const navigate = useNavigate();
	const [quality, setQuality] = React.useState(0);
	const [isShowCart, setIsShowCart] = React.useState(false);

  useEffect(() => {
    const currentDate = new Date();
    if(new Date(localStorage.getItem("expires")) < currentDate ){
      navigate('/sign');
    }
    if(localStorage.key("expires") == null){
      navigate('/sign');
    }
  }, [navigate]);

  return (
    <>
			<Orders />
      <Categories></Categories>
			<button 
				className="cart__button"
				onClick={() => setIsShowCart(true)}
			>
				<span className="cart__button-quality">{quality}</span>
				<img src={cartIcon} alt="Корзина" />
			</button>
			<Cart isShowCart={isShowCart} setIsShowCart={setIsShowCart} />
    </>
  );
};

export default Home;
