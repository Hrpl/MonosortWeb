import { makeAutoObservable } from "mobx"

class GlobalStore {
	getData = null;
	getOrders = null;
	
	constructor() {
		makeAutoObservable(this);
	}

	getFunc = (func) => {
		this.getData = func;
	}
	
	getOrdersFunc = (func) => {
		this.getOrders = func;
	}
}

export const globalStore = new GlobalStore();