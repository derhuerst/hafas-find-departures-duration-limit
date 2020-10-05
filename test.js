'use strict'

const {ok} = require('assert')
const findDepsDurationLimit = require('.')

const MAX_DURATION = 1440 // 1440min = 24h

const mockedDepartures = async (stop, opt = {}) => {
	const {duration, results: maxResults} = opt
	const results = Math.min(2 * Math.min(duration, MAX_DURATION), maxResults)
	return new Array(results).fill(null)
}
const mockedHafasClient = {
	departures: mockedDepartures,
}

findDepsDurationLimit(mockedHafasClient, '123')
.then((limit) => {
	console.info('determined limit:', limit)
	ok(limit > (MAX_DURATION - 15), 'determined limit is too small')
	ok(limit < (MAX_DURATION + 15), 'determined limit is too small')
	console.info('✔︎')
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
