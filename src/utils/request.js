'use strict'

const { merge, isEmpty } = require('lodash')

const params = event => {

	let body = {}

	try {
		body = JSON.parse(event.body)
	} catch (err) {
		throw new Error('JSON_PARSER_ERROR')
	}

	if (body === null) {
		body = {}
	}

	if (event.pathParameters) {
		body = merge(body, event.pathParameters)
	}

	if (event.queryStringParameters) {
		body = merge(body, event.queryStringParameters)
	}

	if (isEmpty(body)) {
		body = event
	}

	return body

}

module.exports = {
	params
}