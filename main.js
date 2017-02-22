
const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 500, height: 500});
    mainWindow.loadURL('file://' + __dirname + '/index.html');

});