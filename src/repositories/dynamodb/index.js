'use strict'

const { DocumentClient } = require('aws-sdk/clients/dynamodb')

const withProcessEnv = (env) => () => {

	const IS_OFFLINE = env.IS_OFFLINE

	if (IS_OFFLINE) {

		const { DYNAMODB_ENDPOINT } = env

		const options = {
			endpoint: DYNAMODB_ENDPOINT,
			region: 'none',
		}

		return new DocumentClient(options)

	} else {
		return new DocumentClient()
	}
}

module.exports = {
	withProcessEnv
}
