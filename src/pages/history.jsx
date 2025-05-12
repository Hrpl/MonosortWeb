import React from "react";
import axios from "axios";
import { globalStore } from "../store/globalStore";
import HistoryOrder from "../components/historyOrder/HistoryOrder";
import deleteIcon from "../assets/close.svg";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ContentLoader from "react-content-loader";

const History = observer(({ isShowOrders, setIsShowOrders}) => {
	const [orders, setOrders] = React.useState([]);

	const jwt = localStorage.getItem('accessToken');

	React.useEffect(() => {
		getOrders();
	}, [jwt])

	const getOrders = () => {
		if(jwt) {
			axios.get("https://monosortcoffee.ru/api/order/all", {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})
			.then(res => {
				setOrders(res.data);
				globalStore.getOrdersFunc(getOrders);
				console.log(res.data);
			})
			.catch(err => {
				console.log(err)
			})
		}
	}

  return (
    <div className={isShowOrders ? "cart show" : "cart"}>
      <IconButton
        onClick={() => {
					setIsShowOrders(false);
				}}
        disableRipple={true}
        className='card__close'
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          color: '#2c5c4f',
          backgroundColor: '#fff',
          borderRadius: '90%',
          zIndex: 3,
          boxShadow: "0 0 2px 0 #6a6a6a",
        }}
      >
        <CloseIcon />
      </IconButton>
			<main className="order__main">
				<div className="order__user-name">
					<div className="order__profile-icon">
						<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M256 0C114.6 0 0 114.6 0 256C0 397.4 114.6 512 256 512C397.4 512 512 397.4 512 256C512 114.6 397.4 0 256 0ZM256 128C295.77 128 328 160.24 328 200C328 239.76 295.8 272 256 272C216.24 272 184 239.76 184 200C184 160.24 216.2 128 256 128ZM256 448C203.07 448 155.1 426.47 120.3 391.71C136.5 349.9 176.5 320 224 320H288C335.54 320 375.54 349.88 391.7 391.71C356.9 426.5 308.9 448 256 448Z" fill="#2C5C4F"/>
							<path d="M256 128C295.77 128 328 160.24 328 200C328 239.76 295.8 272 256 272C216.24 272 184 239.76 184 200C184 160.24 216.2 128 256 128Z" fill="white"/>
							<path d="M256 448C203.07 448 155.1 426.47 120.3 391.71C136.5 349.9 176.5 320 224 320H288C335.54 320 375.54 349.88 391.7 391.71C356.9 426.5 308.9 448 256 448Z" fill="white"/>
						</svg>
					</div>
					<h3 className="order__profile-name">{globalStore.profileData.name || ""}</h3>
				</div>
				<h2 className="history__list-title">Активные заказы</h2>
				<ul className="history__list">
					{globalStore.activeOrders.length > 0 ? (
						<>
							{globalStore.activeOrders?.map((item) => (
								<HistoryOrder key={item.orderId} item={item} />
							))}
						</>
					) : (
						<div className="history__list-item--empty">
							<h3 className="title">Здесь пока пусто</h3>
						</div>
					)}
	      </ul>
				<h2 className="history__list-title">История заказов</h2>
	      <ul className="history__list">
					{orders.length > 0 ? (
						<>
							{orders?.map((item) => (
								<HistoryOrder key={item.orderId} item={item} />
							))}
						</>
					) : (
						<div className="history__list-item--empty history">
							<h3 className="title">Здесь пока пусто</h3>
						</div>
					)}
	      </ul>
			</main>
    </div>
  );
});

export default History;
