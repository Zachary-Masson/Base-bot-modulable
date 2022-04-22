
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./api.cjs.production.min.js')
} else {
  module.exports = require('./api.cjs.development.js')
}
