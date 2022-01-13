'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"https://easy-mock.com/mock/vue-admin"',
  BASE_API: '"http://localhost:9001"',
  //BASE_API: '"http://localhost:8222"',
  OSS_PATH: '"https://edu-2933.oss-cn-beijing.aliyuncs.com"'
})
