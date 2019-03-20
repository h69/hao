const shelljs = require('shelljs')

shelljs.rm('-rf', '../api/public/static')
shelljs.rm('-rf', '../api/views/index.html')

shelljs.cp('-R', 'dist/static', '../api/public/')
shelljs.cp('-R', 'dist/index.html', '../api/views/')