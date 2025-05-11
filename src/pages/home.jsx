import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartIcon from "../assets/cart.svg";
import Categories from "./category";
import Cart from "../components/cart/Cart";
import Orders from "../components/orders/Orders";
import { globalStore } from "../store/globalStore";
import Favorite from "../components/favorite/Favorite";

const Home = () => {
  const navigate = useNavigate();
	const [isShowCart, setIsShowCart] = React.useState(false);
	const [cartData, setCartData] = React.useState([]);

	const jwt = localStorage.getItem('accessToken');

	React.useEffect(() => {
		if(jwt) {
			fetchCart();
		}
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
				globalStore.getFunc(fetchCart);
			})
			.catch(err => {
				console.log(err)
			})
		}
	}

	const deleteCart = () => {
		if(jwt && cartData.length > 0) {
			axios.delete("https://monosortcoffee.ru/api/cart/all", {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})
			.then(res => {
				fetchCart();
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Корзина очищена",
					showConfirmButton: false,
					timer: 1500,
				});
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