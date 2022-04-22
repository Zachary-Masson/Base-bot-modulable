const {Route} = require('../../libs/api');
const route = new Route('/');
route.get('/', {}, (options, req, res) => {
    res.send('ok')
})
module.exports = route