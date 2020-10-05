'use strict'

const debug = require('debug')('hafas-find-departures-duration-limit')

const MAX_ITERATIONS = 12

const durationLimits = new WeakMap()

// This function finds *any* high-enough duration that seems to "touch"
// the HAFAS-dictated limit of departures() results.
const findDeparturesDurationLimit = async (hafas, station) => {
	if (durationLimits.has(hafas)) {
		debug('re-using previously determined duration limit')
		return durationLimits.get(hafas)
	}

	const testWith = async (duration) => {
		const opt = {duration, results: Infinity}
		const results = (await hafas.departures(station, opt)).length
		debug(`hafas.departures() with ${duration}:`, results, 'results')
		return results
	}

	let i = 0, results = 0, lower = 15, upper = 30 // minutes

	while (i++ < MAX_ITERATIONS) {
		const newUpper = upper * 2
		const newResults = await testWith(newUpper)

		if (newResults <= results) {
			upper *= 1.1
			debug('no increase in results with', newUpper, `${lower} < limit < ${upper}`)
			break
		}
		results = newResults
		lower = upper
		upper = newUpper
	}

	while (i++ < MAX_ITERATIONS && (upper - lower) > 2) {
		debug(`${lower} < limit < ${upper}`)
		const pivot = Math.round(lower + (upper - lower) / 2)
		const newResults = await testWith(pivot)

		if (newResults < results) {
			debug('less results')
			lower = pivot
		} else { // newResults >= results
			debug('equal or more results')
			upper = pivot + 1
		}
		results = Math.max(results, newResults)
	}

	debug('result', lower)
	durationLimits.set(hafas, lower)
	return lower
}

module.exports = findDeparturesDurationLimit
