const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const NODE_ENV = process.env.NODE_ENV;
const REACT_APP_REGEXP = /^REACT_APP_/i;

if (!NODE_ENV) {
  throw new Error('必须指定 NODE_ENV');
}

const rootPath = path.resolve(__dirname, '..');

function getProcessEnv() {
  const result = {};

  const dotenvFiles = [
    `${rootPath}/.env`,
    `${rootPath}/.env.local`,
    `${rootPath}/.env.${NODE_ENV}.local`,
    `${rootPath}/.env.${NODE_ENV}`,
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



module.exports = {
  getProcessEnv,
  processSize,
};

