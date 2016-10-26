var remote = require('electron').remote;
var value;
function ss2() {
	remote.getGlobal('sharedObject').member_name = document.getElementById("login_number").value;
	     var ipcRenderer = require('electron').ipcRenderer;
	     ipcRenderer.send('show-prop1');
}

function inputNumber(value) {
    document.getElementById("login_number").value += value;
}
