import { makeAutoObservable } from "mobx"

class GlobalStore {
	getData = null;
	
	constructor() {
		makeAutoObservable(this);
	}

	getFunc = (func) => {
		this.getData = func;
	}
}

export const globalStore = new GlobalStore();