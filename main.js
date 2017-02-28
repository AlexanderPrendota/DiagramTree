
const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 1480, height: 900});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();

});