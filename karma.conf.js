/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = (config) => {
  config.set(
      merge(createDefaultConfig(config), {
        files: [
          // runs all files ending with .test in the test folder,
          // can be overwritten by passing a --grep flag. examples:
          //
          // npm run test -- --grep test/foo/bar.test.js
          // npm run test -- --grep test/bar/*
          {
            pattern: config.grep ? config.grep : 'test/**/*.test.js',
            type: 'module',
          },
          {
            pattern: require.resolve('prismjs/prism.js'),
            type: 'js',
          },
          {
            pattern: require.resolve('prismjs/components/prism-bash.min.js'),
            type: 'js',
          },
          {
            pattern: require.resolve('prismjs/components/prism-java.min.js'),
            type: 'js',
          },
          {
            pattern: require.resolve('prismjs/components/prism-python.min.js'),
            type: 'js',
          },
          {
            pattern: require.resolve('prismjs/components/prism-http.min.js'),
            type: 'js',
          },
        ],

        // see the karma-esm docs for all options
        esm: {
          // if you are using 'bare module imports' you will need this option
          nodeResolve: true
        }
      })
  );
  return config;
};
