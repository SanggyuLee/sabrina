const electron = require('electron')
const electron_app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const dialog = electron.dialog

const mongo = require('mongorito')
const Model = mongo.Model;

var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');

//var Sever = require('mongodb').Server
//var mongoclient;
var db;
var url = 'mongodb://localhost:27017/sabrina_member';
ipcMain.on('connect_db', function(event) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("connect db");
		insertDocuments(db, function() {
			db.close();
		});
		findDocuments(db, function() {
			db.close();
		});
		db.close();
	});
	var insertDocuments = function(db, callback) {
	
	  // Get the documents collection
	  var collection = db.collection('sabrina_member');
	  // Insert some documents
	  collection.insertMany([
	    {a : 1}, {a : 2}, {a : 3}
	  ], function(err, result) {
	    assert.equal(err, null);
	    assert.equal(3, result.result.n);
	    assert.equal(3, result.ops.length);
	    console.log("Inserted 3 documents into the document collection");
	    callback(result);
	  });
	}	


var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('sabrina_member');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    console.log("Found the following records" + docs);
    console.dir(docs);
    callback(docs);
  });
console.log("haha");
}
	//mongoclient = new MongoClient(new Server('localhost',27017,{'native_parser':true}));
	//db = mongoclient.db('sabrina_member');

//	mongorito.connect('localhost/sabrina_member');
//	let post = new Post({
//	    name: global.memberObject.member_name,
//	    age: global.memberObject.member_age 
//	});
//	post.save();
	console.log(global.memberObject.member_name);
});

ipcMain.on('insert_db', function(event) {

});

global.sharedObject = {
  member_name: 'default value'
}

global.memberObject = {
  member_name: 'default value',
  member_age: 'default value'
}


ipcMain.on('show-prop1', function(event) {
  console.log(global.sharedObject.member_name);
});

ipcMain.on('load-page', function(event) {
  mainWindow.loadURL(`file://${__dirname}/src/start.html`)
});

const express = require('express');
const router = express.Router();
const fs = require('fs');
const ex_app = express();
const bodyParser =require("body-parser");

ex_app.get('/', function(req, res) {
        fs.readFile('public/views/start.html', function(error, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
        });
});

ex_app.get('/loginnew', function(req, res) {
        fs.readFile('public/views/login.html', function(error, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
        });
});
ex_app.get('/login', function(req, res) {
        fs.readFile('public/views/main.html', function(error, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
        });
});

ex_app.get('/member', function(req, res) {
        fs.readFile('public/views/main.html', function(error, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
        });
});

ex_app.get('/add_member', function(req, res) {
        fs.readFile('public/views/add_member.html', function(error, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
        });
});

ex_app.post('/submit',function(req,res){
	console.log("User name = " + global.sharedObject.member_name);
	res.send(global.sharedObject.member_name);
});

ex_app.use(bodyParser.urlencoded({ extended: false }));
ex_app.use(bodyParser.json());

ex_app.use(express.static(process.cwd() + '/public'));
ex_app.listen(3303, function () {
        console.log('Server Start.');
});

let mainWindow
let prefsWindow
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 750})
  prefsWindow = new BrowserWindow({width: 800, height: 600, show:false})

  // and load the index.html of the app.
 // mainWindow.loadURL(`file://${__dirname}/src/start.html`)
  mainWindow.loadURL("http://localhost:3303/");
  prefsWindow.loadURL("http://localhost:3303/loginnew");

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
 // presfsWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

ipcMain.on('show-prefs', function() {
	prefsWindow.show()
})



}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_app.on('ready', createWindow)

// Quit when all windows are closed.
electron_app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    electron_app.quit()
  }
})

electron_app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
