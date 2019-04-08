'use strict'

const testName = 'Create'

const setup = require('./../setup')
const invoke = require('./../invoke')

require('tape')(testName, async t => {

	await setup.start()

	const greet = {
		name: 'maria'
	}

	const response = await invoke('greet_create', {...greet })

	t.equal('id' in response, true, 'Should have ID')

	t.end()

})
