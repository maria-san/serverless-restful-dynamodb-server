'use strict'

const testName = 'List'

const setup = require('./../setup')
const invoke = require('./../invoke')

require('tape')(testName, async t => {

	await setup.start()

	const greet = {
		name: 'maria'
	}
    
	const greet2 = {
		name: 'airam'
	}

	await invoke('greet_create', {...greet })
	await invoke('greet_create', {...greet2 })

	const response3 = await invoke('greet_all')
    
	t.equal(response3.length, 2, 'List should have correct number of entries')

	t.end()

})
