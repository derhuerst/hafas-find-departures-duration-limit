'use strict'

const createHafasClient = require('hafas-client')
const bvgProfile = require('hafas-client/p/bvg')
const findDepsDurationLimit = require('.')

const mehringdamm = '900000017101'

const hafas = createHafasClient(
	bvgProfile,
	'hafas-find-departures-duration-limit example',
)

;(async () => {
	console.log(await findDepsDurationLimit(hafas, mehringdamm))
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
