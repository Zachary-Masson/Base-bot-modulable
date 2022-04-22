
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./debug.cjs.production.min.js')
} else {
  module.exports = require('./debug.cjs.development.js')
}
