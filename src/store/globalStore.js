import { makeAutoObservable } from "mobx"

class GlobalStore {
	getData = null;
	getFavorites = null;
	getOrders = null;
	orderStatus = "Нет";
	activeOrders = [];
	profileData = {
		name: "",
	};
	
	constructor() {
		makeAutoObservable(this);
	}

	getFunc = (func) => {
		this.getData = func;
	}

	getFavoritesFunc = (func) => {
		this.getFavorites = func;
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

	setProfileData = (data) => {
		this.profileData = data;
	}
}

export const globalStore = new GlobalStore();