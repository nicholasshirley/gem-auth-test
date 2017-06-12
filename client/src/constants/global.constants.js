import { AppStorage } from '../helpers/AppStorage'
import Perf from 'react-addons-perf'

window.STORAGE = new AppStorage()
window.debug = console.debug
window.Perf = Perf