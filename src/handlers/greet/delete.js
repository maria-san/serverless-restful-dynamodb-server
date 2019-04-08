'use strict'

const { withStatusCode } = require('./../../utils/response')
const { params } = require('./../../utils/request')
const { Repository } = require('./../../repositories/dynamodb/repository')
const { withProcessEnv } = require('./../../repositories/dynamodb')

const docClient = withProcessEnv(process.env)()
const repository = new Repository(docClient)

const noContent = withStatusCode(204, JSON.stringify)

module.exports.process = async event => {

	const parameters = params(event)

	try {
		await repository.delete(parameters.id)
	} catch (err) {
		throw new Error('REPOSITORY_ERROR')
	}
    
	return noContent({})

}