const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.export = {
    configureWebpack: {
        name: defaultSettings.title || 'vue Admin Template',
        resolve: {
            alias: {
                '@': resolve("src")
            }
        }
    }
}
