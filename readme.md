# hafas-find-departures-duration-limit

**Find the duration limit of a HAFAS endpoint's departures method.**

[![npm version](https://img.shields.io/npm/v/hafas-find-departures-duration-limit.svg)](https://www.npmjs.com/package/hafas-find-departures-duration-limit)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/hafas-find-departures-duration-limit.svg)
![minimum Node.js version](https://img.shields.io/node/v/hafas-find-departures-duration-limit.svg)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with me on Twitter](https://img.shields.io/badge/chat%20with%20me-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)

Given a [`hafas-client@5`](https://github.com/public-transport/hafas-client/tree/5)-compatible HAFAS client and a stop/station ID, `hafas-find-departures-duration-limit` tries to find the largest duration that the HAFAS endpoint can return departures/arrivals for.


## Installation

```shell
npm install hafas-find-departures-duration-limit
```


## Usage

```js
const createHafasClient = require('hafas-client')
const bvgProfile = require('hafas-client/p/bvg')
const findDurLimit = require('hafas-find-departures-duration-limit')

const mehringdamm = '900000017101'

const hafas = createHafasClient(
	bvgProfile,
	'hafas-find-departures-duration-limit example',
)

await findDurLimit(hafas, mehringdamm) // 1920
```


## Contributing

If you have a question or need support using `hafas-generate-gtfs`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, use [the issues page](https://github.com/derhuerst/hafas-generate-gtfs/issues).
