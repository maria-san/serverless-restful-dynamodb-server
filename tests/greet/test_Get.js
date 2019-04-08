'use strict'

const testName = 'Get'

const setup = require('./../setup')
const invoke = require('./../invoke')

require('tape')(testName, async t => {

	await setup.start()

	const greet = {
		name: 'maria'
	}

	const response = await invoke('greet_create', {...greet })
	const response2 = await invoke('greet', { id:response.id } )

	t.equal(response.id, response2.id, 'Created should be equal to Fetched')

	t.end()

})
