'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = require('express');
var express__default = _interopDefault(express);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var Router = /*#__PURE__*/function () {
  function Router(options, moduleName, route) {
    this._options = options;
    this._moduleName = moduleName;
    this._route = route;
  }

  var _proto = Router.prototype;

  _proto.main = function main() {
    this._router = express__default.Router();

    this._router.use(this._route.baseUrl, this._route.main(this._options));

    this._router.get('/try', function (req, res) {
      res.send('success');
    });

    return this._router;
  } // @ts-ignore
  ;

  _createClass(Router, [{
    key: "options",
    get: function get() {
      return this._options;
    } // @ts-ignore

  }, {
    key: "moduleName",
    get: function get() {
      return this._moduleName;
    } // @ts-ignore

  }, {
    key: "route",
    get: function get() {
      return this._route;
    }
  }]);

  return Router;
}();

var Error = function Error(code, message, response) {
  response.status(code).json({
    error: true,
    message: message
  });
};

var bodyController = function bodyController(req, res, meta) {
  var error = false;
  meta.map(function (mt) {
    if (!req.body[mt]) {
      error = true; // @ts-ignore

      return Error(404, "Missing " + mt + " in body", res);
    }
  });
  return error;
};

var headerController = function headerController(req, res, meta) {
  var error = false;
  meta.map(function (mt) {
    if (!req.headers[mt]) {
      error = true; // @ts-ignore

      return Error(404, "Missing " + mt + " in header", res);
    }
  });
  return error;
};

var Route = /*#__PURE__*/function () {
  function Route(baseUrl) {
    this._baseUrl = baseUrl;
    this._request = [];
    this._routes = [];
    this._options = {};
  }

  var _proto = Route.prototype;

  _proto.main = function main(options) {
    var _this = this;

    this._options = options;
    this._router = express.Router();

    this._request.map(function (request) {
      _this._router[request.type](request.path, function (req, res) {
        // @ts-ignore
        if (request.options['bodyController'] && request.options['bodyController'][0]) {
          // @ts-ignore
          if (bodyController(req, res, request.options['bodyController'])) return;
        } // @ts-ignore


        if (request.options['headerController'] && request.options['headerController'][0]) {
          // @ts-ignore
          if (headerController(req, res, request.options['headerController'])) return;
        }

        request.execute(_this._options, req, res);
      });
    });

    if (this._routes[0]) {
      this._routes.map(function (route) {
        _this._router.use(route.baseUrl, route.main(_this._options));
      });
    }

    return this._router;
  };

  _proto.use = function use(route) {
    this._routes.push(route);
  };

  _proto.get = function get(path, options, execute) {
    this._request.push({
      type: 'get',
      path: path,
      options: options,
      execute: execute
    });

    return this;
  };

  _proto.post = function post(path, options, execute) {
    // @ts-ignore
    this._request.push({
      type: 'post',
      path: path,
      options: options,
      execute: execute
    });

    return this;
  };

  _proto.put = function put(path, options, execute) {
    // @ts-ignore
    this._request.push({
      type: 'put',
      path: path,
      options: options,
      execute: execute
    });

    return this;
  };

  _proto["delete"] = function _delete(path, options, execute) {
    // @ts-ignore
    this._request.push({
      type: 'delete',
      path: path,
      options: options,
      execute: execute
    });

    return this;
  } // @ts-ignore
  ;

  _createClass(Route, [{
    key: "baseUrl",
    get: function get() {
      return this._baseUrl;
    } // @ts-ignore

  }, {
    key: "request",
    get: function get() {
      return this._request;
    }
  }]);

  return Route;
}();

exports.Error = Error;
exports.Route = Route;
exports.Router = Router;
exports.bodyController = bodyController;
//# sourceMappingURL=api.cjs.development.js.map
