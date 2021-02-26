const path = require('path');
const fs = require('fs');

// 根目录
const appDirectory = fs.realpathSync(process.cwd());

// 依据根目录，找到相对文件或相对目录
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension => {
      return fs.existsSync(resolveFn(`${filePath}.${extension}`))
    }
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  // 解析 env 环境变量
  dotenv: resolveApp('.env'),
  // 项目根目录
  appPath: resolveApp('.'),
  // 项目打包的目录
  appBuild: resolveApp('build'),
  // public 资源目录
  appPublic: resolveApp('public'),
  // public 目录下的 index.html 文件
  appHtml: resolveApp('public/index.html'),
  // 解析入口文件，入口文件可能是 index.js, index.jsx, index.ts, index.tsx
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  // package.json 的路径
  appPackageJson: resolveApp('package.json'),
  // src 目录
  appSrc: resolveApp('src'),
  // tsconfig 的路径
  appTsConfig: resolveApp('tsconfig.json'),
  // jsconfig 的路径
  appJsConfig: resolveApp('jsconfig.json'),
  // yarn.lock 文件的路径
  yarnLockFile: resolveApp('yarn.lock'),
  // setupTests 文件的路径
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  // setupProxy 文件的路径
  proxySetup: resolveApp('src/setupProxy.js'),
  // node_modules 的目录路径
  appNodeModules: resolveApp('node_modules'),
  // service-worker 文件的路径
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
};
