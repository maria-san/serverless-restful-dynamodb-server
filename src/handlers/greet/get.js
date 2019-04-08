'use strict'

const { withStatusCode } = require('./../../utils/response')
const { params } = require('./../../utils/request')
const { Repository } = require('./../../repositories/dynamodb/repository')
const { withProcessEnv } = require('./../../repositories/dynamodb')

const docClient = withProcessEnv(process.env)()
const repository = new Repository(docClient)

const ok = withStatusCode(200, JSON.stringify)
const notFound = withStatusCode(404)

module.exports.process = async event => {

	const parameters = params(event)

	try {
		var record = await repository.get(parameters.id)
	} catch (err) {
		throw new Error('REPOSITORY_ERROR')
	}
    
	if (!record) {
		return notFound()
	}

	return ok(record)

}