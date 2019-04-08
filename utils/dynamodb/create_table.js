'use strict'

const { DynamoDB, config } = require('./setup')

const graph = {
	TableName: `${config.TABLE_PREFIX}`,
	AttributeDefinitions: [{
		AttributeName: 'id',
		AttributeType: 'S',
	}],
	KeySchema: [{
		AttributeName: 'id',
		KeyType: 'HASH',
	}],
	ProvisionedThroughput: {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 1
	}
}

const ddb_create = params => (
	new Promise((resolve, reject) => {
		DynamoDB.createTable(params, (err, data) => {
			if (err) {
				reject(err.toString())
			} else {
				resolve(data)
			}
		})
	})
)

const create = async () => {
	try {
		await (ddb_create(graph))
	} catch (err) {
		throw new Error(`Error creating tables: ${err.message}`)
	}
}

create()
