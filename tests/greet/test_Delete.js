'use strict'

const testName = 'Delete'

const setup = require('./../setup')
const invoke = require('./../invoke')

require('tape')(testName, async t => {

	await setup.start()

	const greet = {
		name: 'maria'
	}
    
	const noContent = {}

	const response = await invoke('greet_create', {...greet })
	const response2 = await invoke('greet_delete', { id:response.id })

	t.deepEqual(response2, noContent, 'Should have no content')

	t.end()

})  
