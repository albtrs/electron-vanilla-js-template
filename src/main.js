import {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog
} from 'electron';
import path from 'node:path';

// WSLデバッグ用
app.commandLine.appendSwitch('no-sandbox');

// カスタムメニュー
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'Control+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('dist/index.html')
  win.webContents.openDevTools()
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
}

// ウインドウがない場合にウインドウを開く(macOS)
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 全ウインドウが閉じた時にアプリを終了する(Windows, Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// alert()は不具合があるので代用
ipcMain.handle('open-simple-dialog', async (event, arg) => {
  const result = await dialog.showMessageBox({
    title: "Message",
    message: arg
  })
  return result
})

