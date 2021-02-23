const helper = require('../helper');

class PackingGenerateFilePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('PackingGenerateFilePlugin', (compilation) => {
      let assets = compilation.assets;
      let contentList = [];
      // statObj.size() 的单位是 bit
      Object.entries(assets).forEach(([filename, statObj]) => {
        const { size, unit } = helper.processSize(statObj.size());
        contentList.push({filename, size: `${size}${unit}` });
      });
      console.table(contentList);
    });
  }
}

module.exports = PackingGenerateFilePlugin;
