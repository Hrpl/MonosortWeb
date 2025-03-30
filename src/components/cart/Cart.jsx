import React from "react";
import trashIcon from "../../assets/trash.svg";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

const Cart = ({ isShowCart, cartData, setIsShowCart }) => {
	const [totalSum, setTotalSum] = React.useState(0);

	React.useEffect(() => {
		setTotalSum(cartData.reduce((sum, item) => sum + Number(item.price), 0));
	}, [cartData]);
  return (
    <div className={isShowCart ? "cart show" : "cart"}>
      <div className="cart__header">
        <button className="cart__header-button">
          <img src={trashIcon} alt="Очистить" />
        </button>
        <button
          className="cart__header-button close"
          onClick={() => setIsShowCart(false)}
        >
          <IconButton
            disableRipple={true}
            className="card__close"
            sx={{
              color: "#2c5c4f",
              backgroundColor: "#fff",
              borderRadius: "90%",
              boxShadow: "0 0 2px 0 #b7b7b7",
            }}
          >
            <CloseIcon />
          </IconButton>
        </button>
      </div>
      <ul className="cart__list">
        {cartData?.map((item) => (
					<li key={item.id} className="cart__list-item">
						<img
							className="cart__list-item__img"
							src={item?.photo}
							alt={item?.name}
						/>
						<div className="row">
							<div className="info">
								<h3 className="cart__list-item__title">
									{item?.name}
								</h3>
								<h3 className="cart__list-item__description">{item?.volume}</h3>
							</div>
							<div className="col">
								<p className="cart__list-item__price">{item?.price} ₽</p>
							</div>
						</div>
					</li>
				))}
			</ul>
      <div className="cart__panel-wrapper">
        <div className="cart__panel">
          <button className="cart__panel-button">Оплатить {totalSum} ₽</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
