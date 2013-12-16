(function (global, requirejs) {
  var config = {

    paths: {
      'jquery': '../bower_components/jquery/jquery'
    },
  };

  if (window.__karma__) {
    config.baseUrl = '/base/app';
    requirejs.config(config);
  } else {
    config.baseUrl = '/app';
    global.require = config;
  }

})(this, this.requirejs);
