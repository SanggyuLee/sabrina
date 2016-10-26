function loginFunc() {
	//ipc.send('load-page', 'file://' + __dirname + '/login.html');
	location.href = "/login";
	var ipcRenderer = require('electron').ipcRenderer;
	ipcRenderer.send('show-prefs');
}

function showMember() {
	location.href = "/member";
}
function addMember() {
	location.href = "/add_member";
}
