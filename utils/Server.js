const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Router} = require('../libs/api');

module.exports = (options, modules, routes) => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    routes.map(Route => {
        options.config = modules.filter(module => module.name === Route['modulesParent'])[0]['config'];
        const router = new Router(options, Route['modulesParent'], Route);
        app.use(`/${Route['modulesParent']}`, router.main())
    })

    const port = process.argv.includes('--port') ? process.argv[3] : 3000;
    app.listen(port, () => {
        console.log(`Api start in http://localhost:${port}`)
    })
}