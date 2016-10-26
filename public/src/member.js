remote = require('electron').remote;
var value;

function addNewMember() {
     remote.getGlobal('memberObject').member_name = document.getElementById("member_name").value;
     remote.getGlobal('memberObject').member_age = document.getElementById("member_age").value;
     var ipcRenderer = require('electron').ipcRenderer;
     ipcRenderer.send('connect_db');
}
//
//function inputNumber(value) {
//    document.getElementById("login_number").value += value;
//}
