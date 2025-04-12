import { makeAutoObservable } from "mobx"

class GlobalStore {
	getData = null;
	getOrders = null;
	orderStatus = 0;
	
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
}

export const globalStore = new GlobalStore();