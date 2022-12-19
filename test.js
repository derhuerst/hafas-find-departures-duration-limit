'use strict'

const {ok} = require('assert')
const createHafas = require('hafas-client')
const dbProfile = require('hafas-client/p/db')
const findDepsDurationLimit = require('.')

const pkg = require('./package.json')

const MAX_DURATION = 1440 // 1440min = 24h

const hamburgDammtor = '8002548'

const mockedDepartures = async (stop, opt = {}) => {
	const {duration, results: maxResults, when} = opt
	if (!('when' in opt)) throw new Error('missing opt.when')
	const results = Math.min(2 * Math.min(duration, MAX_DURATION), maxResults)
	return new Array(results).fill(null)
}
const mockedHafasClient = {
	departures: mockedDepartures,
}

;(async () => {
	const limit = await findDepsDurationLimit(mockedHafasClient, '123')
	ok(limit > (MAX_DURATION - 15), 'determined limit is too small')
	ok(limit < (MAX_DURATION + 15), 'determined limit is too small')

	{
		const dbHafas = createHafas(dbProfile, pkg.name + ' test')
		const limit = await findDepsDurationLimit(dbHafas, hamburgDammtor)
		console.info('DB HAFAS limit:', limit)
	}

	console.info('✔︎ seems to work')
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
