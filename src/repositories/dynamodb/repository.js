'use strict'

const { TABLE_PREFIX } = process.env

class Repository {

	constructor(documentClient) {
		this._documentClient = documentClient
	}
    
	get _baseParams() {
		return {
			TableName: TABLE_PREFIX
		}
	}
    
	async list() {

		const params = this._createParamObject()
		const response = await this._documentClient.scan(params).promise()

		return response.Items || []
	}

	async get(id) {

		const params = this._createParamObject({
			Key: {
				id
			}
		})

		const response = await this._documentClient.get(params).promise()

		return response.Item
	}

	async put(item) {

		const params = this._createParamObject({
			Item: item
		})

		await this._documentClient.put(params).promise()

		return item
	}

	async delete(id) {

		const params = this._createParamObject({
			Key: {
				id
			}
		})

		await this._documentClient.delete(params).promise()

		return id
	}

	_createParamObject(additionalArgs = {}) {
		return Object.assign({}, this._baseParams, additionalArgs)
	}

}

exports.Repository = Repository