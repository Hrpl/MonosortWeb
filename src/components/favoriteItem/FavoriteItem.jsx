import React from "react";
import axios from "axios";
import deleteIcon from "../../assets/close.svg";
import { Boxes, Milk, PillBottle, Plus, ShoppingCart } from "lucide-react"
import { globalStore } from "../../store/globalStore";
import Swal from "sweetalert2";

const FavoriteItem = ({ item }) => {
	const { id, photo, drinkName, volumeName, price, sugarCount, milkName, siropName, extraShot, sprinkling } = item;

	console.log(item);
	const jwt = localStorage.getItem('accessToken');

	const deleteFavorite = () => {
		if(id) {
			axios.delete(`https://monosortcoffee.ru/api/favourite/${id}`, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})
			.then(res => {
				globalStore.getFavorites();
			})
			.catch(err => {
				console.log(err);
			});
		}
	}

	const addToCart = () => {
		if(id) {
			axios.post(`https://monosortcoffee.ru/api/favourite/add/order?id=${id}`, {}, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})
			.then(res => {
				globalStore.getFavorites();
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Успешно добавлено в корзину",
					showConfirmButton: false,
					timer: 1500
				});
			})
			.catch(err => {
				console.log(err);
			});
		}
	}
  return (
    <li className="favorite__list-item">
      <div className="favorite__wrapper">
      	<img
	        className="cart__list-item__img"
	        src={photo}
	        alt={drinkName}
	      />
	      <div className="row">
	        <div className="info">
	          <h3 className="cart__list-item__title">{drinkName}</h3>
	          <h3 className="cart__list-item__description">{volumeName}</h3>
	        </div>
	        <div className="col">
						<button onClick={deleteFavorite} className="cart__list-item__delete">
							<img src={deleteIcon} alt="Удалить" />
						</button>
	          <p className="cart__list-item__price">{price} ₽</p>
	        </div>
	      </div>
      </div>
			<div className="favorite__additives">
				{sugarCount > 0 && (
					<div className="favorite__additive">
						<Boxes color="#2c5c4f" size={22} />
						<span>{sugarCount} кубика сахара</span>
					</div>
				)}
				{milkName && (
					<div className="favorite__additive">
						<Milk color="#2c5c4f" size={22} />
						<span>{milkName}</span>
					</div>
				)}
				{siropName && (
					<div className="favorite__additive">
						<PillBottle color="#2c5c4f" size={22} />
						<span>{siropName}</span>
					</div>
				)}
				{extraShot && (
					<div className="favorite__additive">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
							<path d="M12 4C7.59 4 4 7.59 4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4Z" fill="white"/>
							<text x="8" y="16" fill="currentColor" fontSize="12" fontWeight="bold">E</text>
						</svg>
						<span>{extraShot} Экстрашот</span>
					</div>
				)}
				{sprinkling && (
					<div className="favorite__additive">
						<Plus color="#2c5c4f" size={22} />
						<span>{sprinkling}</span>
					</div>
				)}
			</div>
			<div className="favorite__button-wrapper">
				<button 
					onClick={addToCart} 
					className="favorite__button"
				>
					<ShoppingCart color="#2c5c4f" size={22} />
					В корзину
				</button>
			</div>
    </li>
  );
};

export default FavoriteItem;
