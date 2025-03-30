import React from "react";
import trashIcon from "../../assets/trash.svg";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import axios from "axios";

const Cart = ({ isShowCart, setIsShowCart }) => {
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
        <li className="cart__list-item">
          <img
            className="cart__list-item__img"
            src="https://cdn6.aptoide.com/imgs/c/4/c/c4c9e248ec72492f08cf950c2b7b0df8_icon.png"
            alt="картинка"
          />
          <div className="row">
            <div className="info">
              <h3 className="cart__list-item__title">
                Латте малина с сырной пенкой
              </h3>
              <h3 className="cart__list-item__description">350 мл</h3>
            </div>
            <div className="col">
              <p className="cart__list-item__price">330 $</p>
            </div>
          </div>
        </li>
        <li className="cart__list-item">
          <img
            className="cart__list-item__img"
            src="https://cdn6.aptoide.com/imgs/c/4/c/c4c9e248ec72492f08cf950c2b7b0df8_icon.png"
            alt="картинка"
          />
          <div className="row">
            <div className="info">
              <h3 className="cart__list-item__title">
                Латте малина с сырной пенкой
              </h3>
              <h3 className="cart__list-item__description">350 мл</h3>
            </div>
            <div className="col">
              <p className="cart__list-item__price">330 $</p>
            </div>
          </div>
        </li>
        <li className="cart__list-item">
          <img
            className="cart__list-item__img"
            src="https://cdn6.aptoide.com/imgs/c/4/c/c4c9e248ec72492f08cf950c2b7b0df8_icon.png"
            alt="картинка"
          />
          <div className="row">
            <div className="info">
              <h3 className="cart__list-item__title">
                Латте малина с сырной пенкой
              </h3>
              <h3 className="cart__list-item__description">350 мл</h3>
            </div>
            <div className="col">
              <p className="cart__list-item__price">330 $</p>
            </div>
          </div>
        </li>
      </ul>
      <div className="cart__panel-wrapper">
        <div className="cart__panel">
          <button className="cart__panel-button">Оплатить 990 $</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
