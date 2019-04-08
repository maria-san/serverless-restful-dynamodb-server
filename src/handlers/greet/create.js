'use strict'

const uuidv1 = require('uuid/v1')
const { isEmpty } = require('lodash')

const { withStatusCode } = require('./../../utils/response')
const { params } = require('./../../utils/request')
const { Repository } = require('./../../repositories/dynamodb/repository')
const { withProcessEnv } = require('./../../repositories/dynamodb')

const docClient = withProcessEnv(process.env)()
const repository = new Repository(docClient)

const created = withStatusCode(201, JSON.stringify)
const badRequest = withStatusCode(400, JSON.stringify)

module.exports.process = async event => {

	const parameters = params(event)

	if (!isEmpty(parameters)) {

		const { name } = parameters

		const greet = { 
			id: uuidv1(),
			message: `hi ${name}`
		}

		try {
			await repository.put(greet)
		} catch(err) {
			throw new Error('REPOSITORY_ERROR')
		}

		return created(greet)
	} else {
		return badRequest()
	}

}