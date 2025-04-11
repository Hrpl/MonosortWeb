import React from "react";
import logo from "../../assets/logo.svg";
import "./orders.css";
import History from "../../pages/history";

const Orders = () => {
  const [isShowOrders, setIsShowOrders] = React.useState(false);
  return (
    <>
      <div className="order__active">
        <div className="order__header">
          <div className="order__header-logo">
            <svg preserveAspectRatio="none" viewBox="0 0 214 214" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M3 158V3H211.5V211.5H3V189" stroke="#2c5c4f" strokeWidth="15" />
              <path stroke="#2c5c4f" strokeWidth="2" d="M66 163C63.35 163 62.025 161.675 62.025 159.025V70.3C62.025 67.65 63.35 66.325 66 66.325C67.9 66.325 69.4 67.2 70.5 68.95L107.85 126.025L106.05 126.25L143.4 68.95C144.45 67.2 146.025 66.325 148.125 66.325C150.475 66.325 151.65 67.65 151.65 70.3V159.025C151.65 161.675 150.35 163 147.75 163C145.1 163 143.775 161.675 143.775 159.025V78.175L146.1 78.925L111.45 131.725C110.35 133.425 108.775 134.275 106.725 134.275C104.925 134.275 103.475 133.425 102.375 131.725L67.725 78.925L69.9 79.75V159.025C69.9 161.675 68.6 163 66 163Z" fill="#2c5c4f" />
            </svg>
            <span className="order__header-logo__text">Monosort</span>
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
        <div className="order__active-info">
          <div className="col">
            {/* <h3 className="status">Ещё 5 минуток</h3>
            <p className="description">Готовим с любовью...</p> */}
            <h3 className="status">Заказ готовится</h3>
            <p className="description">Достаём стаканчики...</p>
          </div>
          <div className="col">
            <span className="code">#425</span>
          </div>
        </div>
      </div>
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
			<History 
				isShowOrders={isShowOrders}
				setIsShowOrders={setIsShowOrders}
			/>
    </>
  );
};

export default Orders;
