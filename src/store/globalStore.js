import { makeAutoObservable } from "mobx"

class GlobalStore {
	getData = null;
	getOrders = null;
	orderStatus = "Нет";
	activeOrders = [];
	
	constructor() {
		makeAutoObservable(this);
	}

	getFunc = (func) => {
		this.getData = func;
	}
	
	getOrdersFunc = (func) => {
		this.getOrders = func;
	}

	getOrderStatus = (status) => {
		this.orderStatus = status;
	}

	setActiveOrders = (orders) => {
		this.activeOrders = orders;
	}
}

export const globalStore = new GlobalStore();