import React from "react";
import { numWord } from './../../utils/numWord';

const HistoryOrder = ({ item }) => {
	const { status, summaryPrice, createdTime, orderItems, readyTime } = item;

	const dateObj = new Date(createdTime);
	const day = String(dateObj.getDate()).padStart(2, '0');
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const year = dateObj.getFullYear();
	const hours = String(dateObj.getHours()).padStart(2, '0');
	const minutes = String(dateObj.getMinutes()).padStart(2, '0');
	const formattedDate = `${day}.${month}.${year}`;
	const formattedTime = `${hours}:${minutes}`; 
	if(orderItems.length > 0) {
		return (
			<>
				<li className="order">
					<div className="order__header-wrapper	">
						<div className="order__header-row">
							<h3 className="status">{status}</h3>
							<span className="number">#{item.orderId}</span>
						</div>
						<div className="order__header-row">
							<h5 className="quality">{orderItems.length || 1} {numWord((orderItems.length || 1), ['товар', 'товара', 'товаров'])}</h5>
							<h5 className="date">
								{(status !== "Готовится") ? (
									<>{formattedDate}</>
								) : (
									<>Примерно в <span>{readyTime}</span></>
								)}
							</h5>
						</div>
					</div>
					<ul className="order__list">
						{orderItems?.map((item, index) => (
							<li className="order__list-item" key={index}>
								<div className="order__list-item__info">
									<img className="order__list-item__info-img" src={item.photo} alt={item.drinkName} />
									<div className="order__list-item__info-col">
										<h4 className="order__list-item__info-title">{item.drinkName}</h4>
										<h5 className="order__list-item__info-volume">{item.volumeName}</h5>
									</div>
								</div>
								<div className="order__list-item__row">
									<div className="order__list-item__additives">
										{item.extraShot && (<div className="order__list-item__additive">{item.extraShot ? "Шот эспрессо" : ""}</div>)}
										{item.siropName && (<div className="order__list-item__additive">{item.siropName}</div>)}
										{item.milkName && (<div className="order__list-item__additive">{item.milkName}</div>)}
										{item.sprinkling && (<div className="order__list-item__additive">{item.sprinkling}</div>)}
									</div>
									{orderItems.length > 1 && (<div className="order__list-item__price">{item.price || 0} ₽</div>)}
								</div>
							</li>
						))}
					</ul>
					<div className="order__price">Всего: <span>{summaryPrice} ₽</span></div>
				</li>
			</>
		);
	}
};

export default HistoryOrder;
