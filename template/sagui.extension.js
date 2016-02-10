/**
 * Extend Sagui's environment to add extra configuration and behavior
 *
 * You should try to solve most of the configuration requirements via the `sagui.config.js` file
 *
 * @param  {Object} env complete Sagui environment
 * @param  {String} env.buildTarget build|dist|develop|test
 * @param  {String} env.projectPath absolute path where Sagui is going to be executer
 * @param  {String} env.saguiPath absolute path of Sagui location
 * @param  {String} env.webpackConfig Webpack bundler configuration
 * @param  {String} env.karmaConfig Karma test runner configuration
 * @param  {Function} merge helper function to merge (extend) Webpack configuration
 *
 * @return {Object} a new environment instance with the additional configuration
 */
module.exports = function (env, merge) {
  const webpackConfig = merge(env.webpackConfig, {
    // extend the Webpack configuration
    // with aditional loaders and configurations
    // see: http://webpack.github.io/docs/configuration.html
  })

  return Object.assign({}, env, { webpackConfig: webpackConfig })
}
