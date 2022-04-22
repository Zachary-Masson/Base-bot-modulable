'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cliColor = require('cli-color');

var Type = {
  error: 124,
  success: 82,
  actions: 22,
  modules: 18,
  module: 171,
  api: 184,
  title: 21
};
var VerifyTypeExist = function VerifyTypeExist(type) {
  // @ts-ignore
  return !!Type[type];
};
var ReturnColor = function ReturnColor(type) {
  // @ts-ignore
  return Type[type];
};

var sendDebug = function sendDebug(message) {
  console.log(message);
};

var SetColor = function SetColor(String, color) {
  var Text = String;
  var part = String.split('$');
  part.map(function (p) {
    if (p.startsWith('→')) {
      var text = p.slice(1, p.length);
      Text = Text.replace("$" + p + "$", cliColor.xterm(color)(text));
    }
  });
  return Text;
};

var sendError = function sendError(message) {
  var title = "     [$→ERROR$]";
  sendDebug(SetColor(title + " " + message, 124));
};

var DebugSuccess = function DebugSuccess(message) {
  var title = "     [$→SUCCESS$]";
  sendDebug(SetColor(title + " " + message, ReturnColor('success')));
};
var DebugActions = function DebugActions(message) {
  var title = "     [$→ACTIONS$]";
  sendDebug(SetColor(title + " " + message, ReturnColor('actions')));
};
var DebugModules = function DebugModules(message, moduleName) {
  var title = "     [$\u2192MODULES$] ($\u2192" + moduleName + "$)";
  sendDebug(SetColor(title + " " + message, ReturnColor('modules')));
};
var DebugModule = function DebugModule(message, moduleName) {
  var title = "     [$\u2192MODULE$] ($\u2192" + moduleName + "$)";
  sendDebug(SetColor(title + " " + message, ReturnColor('module')));
};
var DebugApi = function DebugApi(message) {
  var title = "     [$\u2192API$]";
  sendDebug(SetColor(title + " " + message, ReturnColor('api')));
};
var DebugTitle = function DebugTitle(title) {
  sendDebug(SetColor("\n   $\u2192" + title + " \u2192$", ReturnColor('title')));
};

var debug = function debug(options, message) {
  var Message = message;
  if (!VerifyTypeExist(options.type)) return sendError("($\u2192" + options.type + "$) does exits !");

  if (options["replaces"] && options["replaces"][0]) {
    options["replaces"].map(function (meta) {
      Message = Message.replace(meta.String, meta.data === "moduleName" ? options['module'] ? options['module'] : "undefined" : meta.data);
    });
  }

  if (options.type === "error") return sendError(Message);
  if (options.type === "success") return DebugSuccess(Message);
  if (options.type === "actions") return DebugActions(Message);
  if (options.type === "api") return DebugApi(Message);
  if (options.type === "title") return DebugTitle(Message);
  if (options.type === "modules") return DebugModules(Message, options['module'] ? options['module'] : 'undefined');
  if (options.type === "module") return DebugModule(Message, options['module'] ? options['module'] : 'undefined');
};

exports.debug = debug;
//# sourceMappingURL=debug.cjs.development.js.map
