'use strict'

const withStatusCode = (statusCode, formatter = null) => {

	if (100 > statusCode || statusCode > 599) {
		throw new Error('STATUS_CODE_OUT_OF_RANGE')
	}

	const hasFormatter = typeof formatter === 'function'
	const format = hasFormatter ? formatter : _ => _

	return (data = null) => {

		const response = {
			statusCode: statusCode
		}

		if (data) {
			response.body = format(data)
		}

		return response
	}
}

module.exports = {
	withStatusCode
}
