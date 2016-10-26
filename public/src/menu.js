var remote = require('remote')
var ipc = require('ipc')
var Menu = remote.require('menu')

var menu = Menu.buildFromTemplate([
	{
		label:'Electron',
		submenu: [
			{
				label : 'Prefs',
				click: functions() {
					ipc.send('show-prefs')
				}
			}
		]
	}
])
Menu.setApplicationMenu(menu)
