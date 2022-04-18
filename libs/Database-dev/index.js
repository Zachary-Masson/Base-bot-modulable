const {existsSync, readFileSync, writeFileSync} = require('fs');
const error = require('./utils/error');
const saveRoot = require('./utils/saveRoot');
const {verifyFile, getRoute} = require('./utils/rootData');

class DataBase {
  _options;
  _database;

  /**
   * @param {{root: `${string}/database.json`}} options
   */
  constructor (options) {
    this._options = options ? options : {};
    this.main()
  }

  main() {
    // if (!this._options['root'] || !existsSync(this._options['root'])) error('the path of root does not exist or root is available !');

    if (this._options['root']) {
      if (existsSync(this._options['root'])) {
        saveRoot(this._options['root']);
      } else return error('the path of root does not exist !');
    } else {
      if (verifyFile() && existsSync(getRoute())) this._options['root'] = getRoute()
      else return error('root is available !')
    }

    this._database = JSON.parse(readFileSync(this._options.root, {encoding: "utf-8"}));
    if (this._options['autoSave'] && this._options['timeForAutoSave']) setInterval(() => {this.save()}, this._options.timeForAutoSave * 1000)
    return this;
  }

  save() {
    writeFileSync(this._options.root, JSON.stringify(this._database), {encoding: "utf-8"});
  }

  set database(database) {
    this._database = database;
  }

  get database() {
    return this._database;
  }
}
module.exports = DataBase;