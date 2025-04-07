import React from "react";
import axios from "axios";
import { globalStore } from "../../store/globalStore";
import deleteIcon from "../../assets/close.svg";

const CartItem = ({ item }) => {
	const { id, photo, name, volume, price } = item;

	const jwt = localStorage.getItem('accessToken');

	const deleteItem = () => {
    if(id) {
			axios.delete(`https://monosortcoffee.ru/api/cart/${id}`, 
				{
					headers: {
						Authorization: `Bearer ${jwt}`
					}
				}
			)
			.then(res => {
				console.log(res);
				globalStore.getData();
			})
			.catch(err => {
				console.log(err);
			});
		}
  };
  return (
    <li className="cart__list-item">
      <img
        className="cart__list-item__img"
        src={photo}
        alt={name}
      />
      <div className="row">
        <div className="info">
          <h3 className="cart__list-item__title">{name}</h3>
          <h3 className="cart__list-item__description">{volume}</h3>
        </div>
        <div className="col">
					<button onClick={deleteItem} className="cart__list-item__delete">
						<img src={deleteIcon} alt="Удалить" />
					</button>
          <p className="cart__list-item__price">{price} ₽</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
