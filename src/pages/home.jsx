import React from "react";
import axios from "axios";
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
	const [cartData, setCartData] = React.useState([]);

	const jwt = localStorage.getItem('accessToken');

	React.useEffect(() => {
		fetchCart();
	}, [jwt])

	const fetchCart = () => {
		if(jwt) {
			axios.get("https://monosortcoffee.ru/api/cart/all", {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})
			.then(res => {
				setCartData(res.data);
			})
		}
	}

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
				<span className="cart__button-quality">{cartData.length || 0}</span>
				<img src={cartIcon} alt="Корзина" />
			</button>
			<Cart isShowCart={isShowCart} cartData={cartData} setIsShowCart={setIsShowCart} />
    </>
  );
};

export default Home;
