var ora = require('ora')
var chalk = require('chalk')
var ghpages = require('gh-pages')
var config = require('../config')

var currentDateTime = (function currentDateTime() {
    var date = new Date()

    var hour = date.getHours()
    hour = (hour < 10 ? '0' : '') + hour

    var min  = date.getMinutes()
    min = (min < 10 ? '0' : '') + min

    var sec  = date.getSeconds()
    sec = (sec < 10 ? '0' : '') + sec

    var year = date.getFullYear()

    var month = date.getMonth() + 1
    month = (month < 10 ? '0' : '') + month

    var day  = date.getDate()
    day = (day < 10 ? '0' : '') + day

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
})()

var spinner = ora('deploying to GitHub Pages...')
spinner.start()

var message = 'Automatic build ' + currentDateTime

ghpages.publish(config.build.assetsRoot, {message}, err => {
    spinner.stop()
    if (err) throw err

    console.log(chalk.cyan('\n  Deployment complete.\n'))
});
