const {writeFileSync} = require('fs');
const {verifyFile, getPath, getRoute} = require('./rootData')

module.exports = async (path) => {
    if (!verifyFile()) {
        writeFileSync(getPath(), JSON.stringify({root: path}))
    }

    if (getRoute() !== path) {
        writeFileSync(getPath(), JSON.stringify({root: path}))
    }
}