const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Router} = require('../libs/api');
const {debug} = require('../libs/debug')

module.exports = (options, modules, routes) => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const port = process.argv.includes('--port') ? process.argv[3] : 3000;
    app.listen(port, () => {
        debug({type: "title"}, "Server");
        debug({type: "api", replaces: [{String: "{port}", data: port}]}, "$→Application start$ in http://localhost:{port}");
        routes.map(Route => {
            options.config = modules.filter(module => module.name === Route['modulesParent'])[0]['config'];
            const router = new Router(options, Route['modulesParent'], Route);
            const path = `/${Route['modulesParent']}`
            app.use(path, router.main())
            debug({type: "api", replaces: [{String: "{{ routePath }}", data: path}]}, `$→{{ routePath }}$ is $→initialize$ !`)
        })
    })
}