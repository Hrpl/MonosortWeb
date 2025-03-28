import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartIcon from "../assets/cart.svg";
import trashIcon from "../assets/trash.svg";
import closeIcon from "../assets/close.svg";
import Categories from "./category";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
	const [quality, setQuality] = React.useState(0);
	const [isShowCart, setIsShowCart] = React.useState(false);

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
      <Categories></Categories>
			<button 
				className="cart__button"
				onClick={() => setIsShowCart(true)}
			>
				<span className="cart__button-quality">{quality}</span>
				<img src={cartIcon} alt="Корзина" />
			</button>
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
							onClick={() => setDialogOpen(false)}
							disableRipple={true}
							className='card__close'
							sx={{
								color: '#2c5c4f',
								backgroundColor: '#fff',
								borderRadius: '90%',
								boxShadow: "0 0 2px 0 #b7b7b7",
							}}
						>
							<CloseIcon />
						</IconButton>
					</button>
				</div>
				<ul className="cart__list">
					<li className="cart__list-item">
						<img className="cart__list-item__img" src="https://cdn6.aptoide.com/imgs/c/4/c/c4c9e248ec72492f08cf950c2b7b0df8_icon.png" alt="картинка" />
						<div className="row">
							<div className="info">
								<h3 className="cart__list-item__title">Латте малина с сырной пенкой</h3>
								<h3 className="cart__list-item__description">350 мл</h3>
							</div>
							<div className="col">
								<p className="cart__list-item__price">330 $</p>
							</div>
						</div>
					</li>
					<li className="cart__list-item">
						<img className="cart__list-item__img" src="https://cdn6.aptoide.com/imgs/c/4/c/c4c9e248ec72492f08cf950c2b7b0df8_icon.png" alt="картинка" />
						<div className="row">
							<div className="info">
								<h3 className="cart__list-item__title">Латте малина с сырной пенкой</h3>
								<h3 className="cart__list-item__description">350 мл</h3>
							</div>
							<div className="col">
								<p className="cart__list-item__price">330 $</p>
							</div>
						</div>
					</li>
					<li className="cart__list-item">
						<img className="cart__list-item__img" src="https://cdn6.aptoide.com/imgs/c/4/c/c4c9e248ec72492f08cf950c2b7b0df8_icon.png" alt="картинка" />
						<div className="row">
							<div className="info">
								<h3 className="cart__list-item__title">Латте малина с сырной пенкой</h3>
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
    </>
  );
};

export default Home;
