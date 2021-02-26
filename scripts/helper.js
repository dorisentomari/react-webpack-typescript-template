const fs = require('fs');
const os = require('os');
const dotenv = require('dotenv');
const paths = require('./paths');

const pkg = require(paths.appPackageJson);

const NODE_ENV = process.env.NODE_ENV;

function getProcessEnv() {
  const REACT_APP_REGEXP = /^REACT_APP_/i;

  if (!NODE_ENV) {
    throw new Error('必须指定 NODE_ENV');
  }

  const result = {};

  const dotenvFiles = [
    `${paths.appPath}/.env`,
    `${paths.appPath}/.env.local`,
    `${paths.appPath}/.env.${NODE_ENV}.local`,
    `${paths.appPath}/.env.${NODE_ENV}`,
  ].filter(Boolean);

  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      const envObj = dotenv.config({path: dotenvFile,}).parsed;
      Object.keys(envObj).forEach(key => {
        if (REACT_APP_REGEXP.test(key)) {
          result[key] = envObj[key];
        }
      });
    }
  });

  result.NODE_ENV = NODE_ENV;
  result.packageName = pkg.name;

  return result;
}

function processSize(size) {
  let idx = 0;
  let sizeUnit = ['Byte', 'Kb', 'Mb', 'Gb'];
  while (size > 1024) {
    size = size / 1024;
    idx++;
  }

  return {
    size: parseFloat(Number(size).toFixed(2)),
    unit: sizeUnit[idx],
  };
}

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    if (interfaces.hasOwnProperty(devName)) {
      let iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
}

module.exports = {
  getProcessEnv,
  processSize,
  getLocalIP,
};
