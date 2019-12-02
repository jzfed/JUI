const fs = require('fs');
const path = require('path');
const Util = {
    readMockJSON(fileName) {
        return fs.promises.readFile(path.join(__dirname, '/json', fileName), {
            encoding: 'utf8'
        });
    },

    readMockJSONState(fileName) {
        return fs.promises.stat(path.join(__dirname, '/json', fileName));
    },

    getMockJsonFileName(pathName) {
        return pathName.slice(1) + '.json';
    }
};
module.exports = Util;