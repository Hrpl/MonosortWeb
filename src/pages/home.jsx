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
				console.log(res.data);
			})
			.catch(err => {
				console.log(err)
			})
		}
	}

	const deleteCart = () => {
		if(jwt) {
			axios.delete("https://monosortcoffee.ru/api/cart/all", {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})
			.then(res => {
				fetchCart();
			})
			.catch(err => {
				console.log(err)
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
			<Cart 
				deleteCart={deleteCart} 
				cartData={cartData} 
				setIsShowCart={setIsShowCart} 
				isShowCart={isShowCart} 
			/>
    </>
  );
};

export default Home;
