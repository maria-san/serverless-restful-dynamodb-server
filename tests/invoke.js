'use strict'

const YAML = require('yamljs')
const scan = require('scan-dir-recursive/sync')

const config = (YAML.load(`${__dirname}/../serverless.env.yml`))[process.env.STAGE]
for (let index in config) {
	process.env[index] = config[index]
}

const functions = {}

scan(`${__dirname}/../functions`)
	.filter(file => file.endsWith('.yml'))
	.forEach(file => {
		const fxns = YAML.load(file)
		for (let fxnName in fxns) {
			functions[fxnName] = {
				handler: `${fxns[fxnName].handler.split('.').slice(0, -1).join('.')}.js`,
				process: fxns[fxnName].handler.split('.').pop()
			}
		}
	})

module.exports = async (name, params) => {

	const handler = require(`./../${functions[name].handler}`)
	const response = await handler[functions[name].process]({
		body: JSON.stringify(params)
	})

	return JSON.parse(response.body)

}
