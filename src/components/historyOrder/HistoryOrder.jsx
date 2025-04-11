import React from "react";
import axios from "axios";
import { globalStore } from "../../store/globalStore";
import deleteIcon from "../../assets/close.svg";

const HistoryOrder = ({ item }) => {
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
    <li className="order">
      <div className="order__header-wrapper	">
				<div className="order__header-row">
					<h3 className="status">Заказ готовится</h3>
					<span className="number">#53</span>
				</div>
				<div className="order__header-row">
					<h5 className="quality">2 товара</h5>
					<h5 className="date">Примерно в <span>12:24</span></h5>
				</div>
			</div>
			<ul className="order__list">
				<li className="order__list-item">
					<div className="order__list-item__info">
						<img className="order__list-item__info-img" src={"photo"} alt="coffee" />
						<div className="order__list-item__info-col">
							<h4 className="order__list-item__info-title">{"Капучино"}</h4>
							<h5 className="order__list-item__info-volume">{"200 мл"}</h5>
						</div>
					</div>
					<div className="order__list-item__additives">
						<div className="order__list-item__additive">- Шот эспрессо</div>
						<div className="order__list-item__additive">- Шот эспрессо</div>
					</div>
				</li>
				<li className="order__list-item">
					<div className="order__list-item__info">
						<img className="order__list-item__info-img" src={"photo"} alt="coffee" />
						<div className="order__list-item__info-col">
							<h4 className="order__list-item__info-title">{"Капучино"}</h4>
							<h5 className="order__list-item__info-volume">{"200 мл"}</h5>
						</div>
					</div>
					<div className="order__list-item__additives">
						<div className="order__list-item__additive">- Шот эспрессо</div>
						<div className="order__list-item__additive">- Шот эспрессо</div>
					</div>
				</li>
			</ul>
    </li>
  );
};

export default HistoryOrder;
