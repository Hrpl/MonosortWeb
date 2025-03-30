import React from "react";
import "./orders.css";

const Orders = () => {
  return (
    <>
      <div className="order__active">	
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
    </>
  )
};

export default Orders;