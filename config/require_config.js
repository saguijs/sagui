/**
  A RequireJS config file adapted to be used:
   - By the RequireJS loader in the browser;
   - By NodeJS during the r.js build task;
   - By Karma test runner.

   To maintain compatibility, change only the underlying config object.
 */

/* jshint node: true */
(function (global, requirejs) {

  /**
    Actual RequireJS config.
    You need only to perform changes here.
   */
  var config = {
    baseUrl: 'app',
    paths: {
    }
  };

  /**
    Karma doesn't load the application at the root folder
    but instead at the '/base'.
   */
  if (isKarmaRunner()) { config.baseUrl = '/base/app';}

  /**
    If in NodeJS, exports the config as a module.
   */
  if (isNodeJS()) { module.exports = config; }

  /**
    If is beign used in the browser, and require config is already loaded (Karma)
    configures the existing instance of RequireJS.
   */
  if (isRequirejsLoaded()) { requirejs.config(config); }

  /**
    If RequireJS is not loaded yet, sets the config as the global require variable.
    Once RequireJS loads, it will pick this configuration up.
   */
  else { global.require = config; }

  function isRequirejsLoaded () {
    return requirejs;
  }

  function isKarmaRunner () {
    return typeof window === "object" && window && typeof window.__karma__ === "object";
  }

  function isNodeJS () {
    return typeof module === "object" && module && typeof module.exports === "object";
  }

})(this, this.requirejs);
