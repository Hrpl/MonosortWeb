import React from "react";
import axios from "axios";
import { globalStore } from "../../store/globalStore";
import HistoryOrder from "../components/historyOrder/HistoryOrder";
import deleteIcon from "../../assets/close.svg";

const History = () => {
	const [orders, setOrders] = React.useState([]);
  return (
    <div className={isShowCart ? "cart show" : "cart"}>
      <div className="cart__header">
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
        {orders?.map((item) => (
          <HistoryOrder key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default History;
