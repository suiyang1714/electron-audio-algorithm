'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
// import { algorithm } from '../renderer/utils/algorithm'
import ffi from 'ffi'
import fs from 'fs'
import ref from 'ref'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

ipcMain.on('onCompileFile', (e, arg) => {
    const libm = ffi.Library(
        './src/renderer/utils/libvideo.dylib',
        // './src/renderer/utils/libtest.dylib',
        {
            'sound_identify': [ref.types.void, [ref.types.uint32, 'string', 'string', 'string', ref.types.bool]]
            // 'hello': ['void', ['string']]
        }
    )
    //
    // fs.writeFile('./a.json', 'utf-8', (err) => {
    //     console.log(err)
    // })
    fs.readFile('/Users/aditya/Desktop/electron-audio-algorithm/oldvideo/小羊咩咩.mp3', (err, data) => {
        if (err) {
            console.log(err)
        }
        // libm.hello(data)
        console.log(Buffer.isBuffer(data))
        libm.sound_identify.async(Math.floor(+new Date() / 1000), data, '/Users/aditya/Desktop/electron-audio-algorithm/src/renderer/utils/configFile', '/Users/aditya/Desktop/electron-audio-algorithm/newVideo', false, (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        })
    })
    const buf2 = Buffer.from('test')
    console.log(buf2)
    // libm.sound_identify(+new Date() / 1000, '1', '2', '3', false)
    // libm.hello(buf2)
    // algorithm(arg)
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
