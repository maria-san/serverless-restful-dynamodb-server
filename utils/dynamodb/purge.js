'use strict'

const { DynamoDB, config } = require('./setup')

const ddb_delete = TableName => (
	new Promise((resolve, reject) => {
		DynamoDB.deleteTable({ TableName },
			(err, data) => {
				if (err) {
					reject(err.toString())
				} else {
					resolve(data)
				}
			})
	})
)

const purge = async () => {
	try {
		await(ddb_delete(`${config.TABLE_PREFIX}`))
		require('./create_table')
	} catch (err) {
		throw new Error(`Error purging tables: ${err.message}`)
	}
}

purge()
