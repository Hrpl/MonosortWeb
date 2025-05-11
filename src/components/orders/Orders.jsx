import React from "react";
import * as signalR from '@microsoft/signalr';
import "./orders.css";
import History from "../../pages/history";
import { observer } from "mobx-react-lite";
import { globalStore } from "../../store/globalStore";
import axios from "axios";
import logo from "../../assets/logotype.svg";
import heart from "../../assets/heart.svg";
import Favorite from "../favorite/Favorite";

const Orders = observer(() => {
	const [isShowOrders, setIsShowOrders] = React.useState(false);
	const [isShowFavorite, setIsShowFavorite] = React.useState(false);
  const [connection, setConnection] = React.useState(null);
	const [activeOrder, setActiveOrder] = React.useState({});

	const jwt = localStorage.getItem('accessToken');

  React.useEffect(() => {
		if(jwt) {
			const newConnection = new signalR.HubConnectionBuilder()
			.withUrl(`https://monosortcoffee.ru/hub/status`, {
				skipNegotiation: true,
				transport: signalR.HttpTransportType.WebSockets,
				credentials: 'omit',
				accessTokenFactory: () => jwt,
			})
			.withAutomaticReconnect()
			.build();

			setConnection(newConnection);
			getActiveOrder();
		}
	}, [jwt]);

	React.useEffect(() => {
    if (connection) {
      const startConnection = async () => {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          try {
            await connection.start();

            // Подписка на сообщения от сервера
            connection.on('Status', (message) => {
              console.log("Получено сообщение:", message);
							setActiveOrder(message)
							globalStore.getOrderStatus(message.status);
            });

						connection.on('Active', (message) => {
							try {
								console.log("Получено сообщение:", message);
								globalStore.setActiveOrders(message); 
							} catch (err) {
								console.log(err)
							}
            });
          } catch (err) {
            console.error('SignalR Connection Error: ', err);
          }
        }
      };

      startConnection();

      // Очистка при размонтировании
      // return () => {
      //   if (connection.state === signalR.HubConnectionState.Connected) {
      //     connection.stop();
      //   }
      // };
    }
  }, [connection]);

	const getActiveOrder = () => {
		if(jwt) {
			axios.get("https://monosortcoffee.ru/api/order/active", {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})
			.then(res => {
				setActiveOrder(res.data);
				console.log(res.data);
				globalStore.getOrderStatus(res.data.status);
			})
			.catch(err => {
				console.log(err);
				if(err.status === 404) {
					globalStore.getOrderStatus("Нет");
				}
			})
		}
	}
  return (
    <>
      <div className="order__active">
        <div className="order__header">
					<button 
						className="order__header-selected"
						onClick={() => setIsShowFavorite(true)}
					>
						<img src={heart} alt="heart" />
					</button>
          <div className="order__header-logo">
            <img src={logo} alt="logo" />
          </div>
          <button
            className="order__header-row__profile"
            onClick={() => setIsShowOrders(true)}
          >
            <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M256 0C114.6 0 0 114.6 0 256C0 397.4 114.6 512 256 512C397.4 512 512 397.4 512 256C512 114.6 397.4 0 256 0ZM256 128C295.77 128 328 160.24 328 200C328 239.76 295.8 272 256 272C216.24 272 184 239.76 184 200C184 160.24 216.2 128 256 128ZM256 448C203.07 448 155.1 426.47 120.3 391.71C136.5 349.9 176.5 320 224 320H288C335.54 320 375.54 349.88 391.7 391.71C356.9 426.5 308.9 448 256 448Z" fill="#2C5C4F" />
            </svg>
          </button>
        </div>
        <div 
					className="order__active-info"
					style={{
						paddingBottom: 
							(activeOrder.status === "Готовится") ? 0 : "1rem",
						alignItems: 
							(activeOrder.status === "Готовится") ? "flex-start" : "center",
					}}
				>
          <div>	
						{(activeOrder.status === "Принят") ? (
							<>
								<h3 className="status">Принимаем заказ</h3>
								<p className="description">Достаём стаканчики...</p>
							</>
						) : (activeOrder.status === "Готовится") ? (
							<>
								<h3 className="status">Заказ готовится</h3>
								<p className="description">Готовим с любовью...</p>
							</>
						) : (activeOrder.status === "Готов к выдаче") ? (
							<>
								<h3 className="status">Заказ готов</h3>
								<p className="description">Готово! Бегите, пока не остыло!</p>
							</>
						) : (
							<>
								<h3 className="status">Нет активного заказа</h3>
	            	<p className="description">Бариста скучает без дела</p>
							</>
						)}
            
          </div>
          <div className="col">
            <span className="code">
							{(
								activeOrder.status === "Принят" ||
								activeOrder.status === "Готовится" ||
								activeOrder.status === "Готов к выдаче"
							) ? `#${activeOrder.number}` : ""}
						</span>
						{activeOrder.status === "Готовится" && (
							<span className="date">Примерно в {activeOrder.readyTime}</span>
						)}
          </div>
        </div>	
      </div>
      {(activeOrder.status === "Готовится") && (
				<div className="order__active-broadcast">
					<div className="line">
						<div
							className="line-active"
							style={{
								width: "30%",
							}}
						>
							<div className="line-cup"></div>
						</div>
					</div>
					<div className="line-finish"></div>
				</div>
			)}
			<History 
				isShowOrders={isShowOrders}
				setIsShowOrders={setIsShowOrders}
			/>
			<Favorite 
				isShowFavorite={isShowFavorite}
				setIsShowFavorite={setIsShowFavorite}
			/>
    </>
  );
});

export default Orders;
