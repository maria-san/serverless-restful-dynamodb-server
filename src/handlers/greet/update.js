'use strict'

const { isEmpty } = require('lodash')

const { withStatusCode } = require('./../../utils/response')
const { params } = require('./../../utils/request')
const { Repository } = require('./../../repositories/dynamodb/repository')
const { withProcessEnv } = require('./../../repositories/dynamodb')

const docClient = withProcessEnv(process.env)()
const repository = new Repository(docClient)

const ok = withStatusCode(200, JSON.stringify)
const badRequest = withStatusCode(400, JSON.stringify)

module.exports.process = async event => {

	const parameters = params(event)

	if (!isEmpty(parameters)) {

		const { id, name } = parameters

		const greet = { 
			id: id,
			message: `hi ${name}`
		}
        
		try {
			var record = await repository.get(id)
		} catch (err) {
			throw new Error('REPOSITORY_ERROR')
		}

		if (!record) {
			return badRequest()
		}

		try {
			await repository.put(greet)
		} catch(err) {
			throw new Error('REPOSITORY_ERROR')
		}

		try {
			record = await repository.get(id)
		} catch (err) {
			throw new Error('REPOSITORY_ERROR')
		}

		return ok(record)
	} else {
		return badRequest()
	}

}