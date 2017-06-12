const 
	WEB_APP_STORAGE_KEY = 'DSB',
	USER_DATA_KEY       = 'user',
	USER_REMEMBER_KEY   = 'dsbRemember'
	
let DSB_STORAGE

class AppStorage {
	constructor(){
		if(DSB_STORAGE) {
			return DSB_STORAGE
		} else {
			if (this.getWebStorage().getItem(WEB_APP_STORAGE_KEY)) {
				this.data = JSON.parse(this.getWebStorage().getItem(WEB_APP_STORAGE_KEY))
			} else {
				this.data = {}
			}
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

	updateDsbStorage() {
		this.getWebStorage().setItem(WEB_APP_STORAGE_KEY, JSON.stringify(this.data))
	}

	set(key, value) {
		this.data[key] = value
		this.updateDsbStorage()
	}

	get(key) {
		return this.data[key]
	}

	remove(key) {
		delete this.data.key
		this.updateDsbStorage()
	}

	check(key) {
		if(this.data[key]) return true
		return false
	}

	clear() {
		this.data = {}
		this.updateDsbStorage()
	}
}

export {
	AppStorage,
	USER_DATA_KEY,
	USER_REMEMBER_KEY
}