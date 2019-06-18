const fs = require('fs');
const path = require('path');

const scanDirForModels = (dir) => {
  const models = fs.readdirSync(dir).reduce((result, name) => {
    const absolutePath = path.resolve(dir, name);

    const stats = fs.statSync(absolutePath);
    if (stats.isFile() && /.?models?.js$/.test(absolutePath)) result.push(absolutePath);
    if (stats.isDirectory()) return result.concat(scanDirForModels(absolutePath));

    return result;
  }, []);
  return models;
};

module.exports = scanDirForModels;
