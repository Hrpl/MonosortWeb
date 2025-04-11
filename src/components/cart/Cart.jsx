import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { globalStore } from "../../store/globalStore";
import { IconButton } from "@mui/material";
import trashIcon from "../../assets/trash.svg";
import CloseIcon from '@mui/icons-material/Close';
import CartItem from "../cartItem/CartItem";

const Cart = ({ isShowCart, cartData, setIsShowCart, deleteCart }) => {
	const [totalSum, setTotalSum] = React.useState(0);
	const [commentary, setCommentary] = React.useState("");

	React.useEffect(() => {
		setTotalSum(cartData.reduce((sum, item) => sum + Number(item.price), 0));
	}, [cartData]);

	const jwt = localStorage.getItem('accessToken');

	const confirmOrder = () => {
    if(cartData.length > 0) {
			axios.post("https://monosortcoffee.ru/api/order", 
				{
					"summaryPrice": totalSum,
					"comment": commentary,
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`
					}
				}
			)
			.then(res => {
				console.log(res);
				globalStore.getData();
				setCommentary("");
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Заказ создан",
					showConfirmButton: false,
					timer: 1500,
				});	
			})
			.catch(err => {
				console.log(err);
			});
		}
  };
  return (
    <div className={isShowCart ? "cart show" : "cart"}>
      <div className="cart__header">
        <button 
					className="cart__header-button"
					onClick={() => {
						deleteCart();
						setCommentary("");
					}}
				>
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
					<CartItem key={item.id} item={item} />
				))}
			</ul>
      <div className="cart__panel-wrapper">
        <div className="cart__panel">
					<label 
						className="cart__panel-label" 
						htmlFor="comment"
					>
						Комментарий к заказу
					</label>
					<textarea 
						value={commentary}
						onChange={(e) => setCommentary(e.target.value)}
						className="cart__panel-textarea" 
						name="comment" 
						id="comment" 
						placeholder="Хочу кофе погорячее :)"
					/>
          <button 
						onClick={confirmOrder}
						className="cart__panel-button"
					>Создать заказ&nbsp;<span>|</span>&nbsp;{totalSum} ₽</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;