var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var config = require('../config')
function exec (cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

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

var currentBranch = exec('git rev-parse --abbrev-ref HEAD')

var spinner = ora('deploying to GitHub Pages...\n')
spinner.start()

exec('git checkout -b ' + config.build.deploymentBranch)
exec('git add --force ' + path.join(config.build.assetsRoot, '/*'))
exec('git commit -m "Build ' + currentDateTime + '"')
exec('git push --force origin ' + config.build.deploymentBranch)
exec('git checkout ' + currentBranch)

spinner.stop()

console.log(chalk.cyan('\n  Deployment complete.\n'))
