const 
	APP_NAME            = 'DSB',
	USER_DATA_KEY       = 'user',
	USER_REMEMBER_KEY   = 'dsbRemember'
	
let DSB_STORAGE

class AppStorage {
	constructor(){
		if(DSB_STORAGE) {
			return DSB_STORAGE
		} else {
			let dataObject = this.getWebStorage().getItem(APP_NAME)
			this.data = dataObject ? dataObject : {}
			DSB_STORAGE = this
		}
	}
	
	getWebStorage() {
		if (typeof(Storage) !== "undefined") {
			return localStorage
		} else {
			alert('Please upgrade your browser to use this site! Thanks.')
			return
		}
	}

	updateStorage() {
		this.getWebStorage().setItem(APP_NAME, JSON.stringify(this.data))
	}

	set(key, value) {
		this.data[key] = value
		this.updateStorage()
	}

	get(key) {
		return this.data[key]
	}

	remove(key) {
		delete this.data.key
		this.updateStorage()
	}

	check(key) {
		if(this.data[key]) return true
		return false
	}

	clear() {
		this.data = {}
		this.updateStorage()
	}
}

export {
	AppStorage,
	USER_DATA_KEY,
	USER_REMEMBER_KEY
}