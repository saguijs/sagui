/* jshint node: true */
(function (global, requirejs) {
  var config = {
    baseUrl: 'app',
    paths: {
      'jquery': '../bower_components/jquery/jquery'
    },
  };

  if (isKarmaRunner()) { config.baseUrl = '/base/app';}
  if (isNodeJS()) { module.exports = config; }
  if (isRequirejsLoaded()) { requirejs.config(config); }
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
