const APP_NAME            = 'DSB'

export class AppStorage {
	constructor(){
		if (typeof(Storage) !== "undefined") {
			this.dsbStorage = localStorage
		} else {
			alert('Please upgrade your browser to use this site! Thanks.')
			return
		}

		let dataObject = this.dsbStorage.getItem(APP_NAME)
		this.data = dataObject ? JSON.parse(dataObject) : {}
	}

	updateStorage() {
		this.dsbStorage.setItem(APP_NAME, JSON.stringify(this.data))
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

	// Only support for Object 2 dimension
	check(key, childKey = null) {
		if (childKey) {
			return (this.data[key]  && this.data[key][childKey]) ? true : false
		} else {
			return this.data[key] ? true : false
		}
	}

	clear() {
		this.data = {}
		this.updateStorage()
	}
}
