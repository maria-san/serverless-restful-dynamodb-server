'use strict'

const { withStatusCode } = require('./../../utils/response')
const { Repository } = require('./../../repositories/dynamodb/repository')
const { withProcessEnv } = require('./../../repositories/dynamodb')

const docClient = withProcessEnv(process.env)()
const repository = new Repository(docClient)

const ok = withStatusCode(200, JSON.stringify)
const notFound = withStatusCode(404)

module.exports.process = async () => {

	try {
		var records = await repository.list()
	} catch (err) {
		throw new Error('REPOSITORY_ERROR')
	}
    
	if (!records) {
		return notFound()
	}

	return ok(records)

}