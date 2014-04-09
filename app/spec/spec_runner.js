require(['spec/spec_helper'], function () {
  var tests = [];
  for (var file in window.__karma__.files) {
    if (/^(\/base\/spec)(.*)spec\.js$/.test(file)) {
      tests.push(file);
    }
  }

  require(tests, window.__karma__.start);
});
