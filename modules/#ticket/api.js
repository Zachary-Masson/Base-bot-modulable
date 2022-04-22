const {Route} = require('../../libs/api');
const route = new Route('/');

route.get('/', {}, (options, req, res) => {
    res.send('ok')
})

const routeTicket = new Route('/ticket');

routeTicket.get('/all', {}, (options, req, res) => {
    res.json(options.databaseModel.database['#ticket']['tickets'])
})
routeTicket.get('/one/:memberID', {}, (options, req, res) => {
    res.json(options.databaseModel.database['#ticket']['tickets'].filter(ticket => ticket.userID === req.params.memberID))
})

route.use(routeTicket);

module.exports = route;