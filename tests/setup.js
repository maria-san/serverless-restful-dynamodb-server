'use strict'

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const scan = require('scan-dir-recursive/sync')

module.exports.start = async () => {

	// Purge data
	await exec('npm run ddb:purge')

	// Include all files for full covertage
	scan(`${__dirname}/../src`).filter(file => file.endsWith('.js')).forEach(file => require(file))

}
