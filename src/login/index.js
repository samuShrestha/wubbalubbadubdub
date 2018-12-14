const fs = require('fs')
const remote = require('electron').remote
const { session, BrowserWindow } = remote

export let loginWindow

export function initGoogleLogin() {
    loginWindow = new BrowserWindow({
        width: 512,
        height: 768,
        show: false
    })

    if (fs.existsSync('cookies.json')) {
        // Do something
    }

    loginWindow.webContents.session.clearStorageData()

    loginWindow.loadURL('https://accounts.google.com')

    loginWindow.once('ready-to-show', () => loginWindow.show())

    loginWindow.webContents.session.webRequest.onBeforeRequest({urls: ['https://myaccount.google.com/*']}, (details, callback) => {
        let cookies = session.defaultSession.cookies.get({}, (error, cookies) => {
            console.log(error, cookies)
            fs.writeFile(remote.app.getPath('userData') + '/cookies.json', JSON.stringify(cookies), 'utf8', (err) => {
                if (err) throw err;
            });
        })
        loginWindow.close()
    })
}