'use strict'

const testName = 'Update'

const setup = require('./../setup')
const invoke = require('./../invoke')

require('tape')(testName, async t => {

	await setup.start()

	const greet = {
		name: 'maria'
	}
    
	const response = await invoke('greet_create', {...greet })
    
	const greet2 = {
		id: response.id,
		name: 'airam'
	}

	const response2 = await invoke('greet_update', greet2)

	t.equal(response2.message, `hi ${greet2.name}`, 'Data should be updated')

	t.end()

})
