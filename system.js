const { ipcMain, app, dialog, remote, BrowserWindow, session } = require('electron')
const path = require('path')
const url = require('url');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let startWindow1
let startWindow2
let startWindow3
let win1

var openedurl = "";
var surfow_protocol = 't-exchange';

const devMode = (process.argv || []).indexOf('--dev') !== -1

if (devMode) {
  const PATH_APP_NODE_MODULES = path.join(__dirname, '..', '..', 'app', 'node_modules')
  require('module').globalPaths.push(PATH_APP_NODE_MODULES)
}

ipcMain.removeAllListeners("ELECTRON_BROWSER_WINDOW_ALERT")
ipcMain.on("ELECTRON_BROWSER_WINDOW_ALERT", (event, message, title)=>{
  event.returnValue = 0
})
ipcMain.removeAllListeners("ELECTRON_BROWSER_WINDOW_CONFIRM")
ipcMain.on("ELECTRON_BROWSER_WINDOW_CONFIRM", (event, message, title)=>{
  event.returnValue = 1
})
ipcMain.removeAllListeners("ELECTRON_BROWSER_WINDOW_PROMPT")
ipcMain.on("ELECTRON_BROWSER_WINDOW_PROMPT", (event, message, title)=>{
  event.returnValue = 1
})

dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`);
};

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
});

app.on('ready', function () { win1 = new BrowserWindow({ height: 250, width: 350, autoHideMenuBar: true, webPreferences: { nodeIntegration: true, webviewTag: true } })
const options = { extraHeaders: 'pragma: no-cache\n'}
win1.webContents.loadFile('index.html', options)
//win1.webContents.openDevTools()
})

function createStart1() {
  // Create the browser window.
 startWindow1 = new BrowserWindow({
      width: 500,
      height: 260,
      titleBarStyle: 'hidden',
      acceptFirstMouse: true,
      transparent: true,
      frame: false,
      show: false,
	  webPreferences: {
		preload: path.join(__dirname, 'bin/data5.html')
	  }
  })

  startWindow1.loadFile('bin/data1.html');

  startWindow1.setResizable(false);
  startWindow1.setMaximizable(false);

  if (process.platform == 'win32') {
    openedurl = process.argv.slice(1)
  }


  startWindow1.once('ready-to-show', () => {
      send_opened_url(openedurl);
      startWindow1.show();
      startWindow1.focus();
      /* REMOVE THIS */
	  //startWindow.toggleDevTools();
  })

  // Emitted when the window is closed.
  startWindow1.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    startWindow1 = null
  })

}

function createStart2() {
  // Create the browser window.
 startWindow2 = new BrowserWindow({
      width: 500,
      height: 260,
      titleBarStyle: 'hidden',
      acceptFirstMouse: true,
      transparent: true,
      frame: false,
      show: false,
	  webPreferences: {
		preload: path.join(__dirname, 'bin/data5.html')
	  }
  })

  startWindow2.loadFile('bin/data1.html');

  startWindow2.setResizable(false);
  startWindow2.setMaximizable(false);

  if (process.platform == 'win32') {
    openedurl = process.argv.slice(1)
  }


  startWindow2.once('ready-to-show', () => {
      send_opened_url(openedurl);
      startWindow2.show();
      startWindow2.focus();
      /* REMOVE THIS */
	  //startWindow.toggleDevTools();
  })

  // Emitted when the window is closed.
  startWindow2.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    startWindow2 = null
  })

}

function createStart3() {
  // Create the browser window.
 startWindow3 = new BrowserWindow({
      width: 500,
      height: 260,
      titleBarStyle: 'hidden',
      acceptFirstMouse: true,
      transparent: true,
      frame: false,
      show: false,
	  webPreferences: {
		preload: path.join(__dirname, 'bin/data5.html')
	  }
  })

  startWindow3.loadFile('bin/data1.html');

  startWindow3.setResizable(false);
  startWindow3.setMaximizable(false);

  if (process.platform == 'win32') {
    openedurl = process.argv.slice(1)
  }


  startWindow3.once('ready-to-show', () => {
      send_opened_url(openedurl);
      startWindow3.show();
      startWindow3.focus();
      /* REMOVE THIS */
	  //startWindow.toggleDevTools();
  })

  // Emitted when the window is closed.
  startWindow3.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    startWindow3 = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
    createStart1();
    createStart2();
    createStart3();
    session.defaultSession.on('will-download', (event, item, webContents) => {
        event.preventDefault()
    });
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (startWindow2 === null) {
    createStart1();
    createStart2();
    createStart3();
  }
})

app.setAsDefaultProtocolClient(surfow_protocol)

// Protocol handler for osx
app.on('open-url', function (event, url) {
  event.preventDefault()
  send_opened_url(url);
})

function send_opened_url(openedurl)
{
    if(openedurl != "")
    {
        startWindow1.webContents.send('opened-url', openedurl.toString().replace(surfow_protocol+"://", "").replace("/", ""));
        startWindow2.webContents.send('opened-url', openedurl.toString().replace(surfow_protocol+"://", "").replace("/", ""));
        startWindow3.webContents.send('opened-url', openedurl.toString().replace(surfow_protocol+"://", "").replace("/", ""));
    }
}
