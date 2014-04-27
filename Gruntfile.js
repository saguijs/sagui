var _ = require('underscore'),
    path = require('path'),
    appRoot = path.join(__dirname, 'app');


/**
  Connect middleware to compile and serve sass files
 */
function sassMiddleware (connect, options) {
  var sass = require('node-sass'),
      middlewares = [],
      sassDest = path.join(__dirname, '/.compiled_sass'),
      directory = options.directory || options.base[options.base.length - 1];

  middlewares.push(sass.middleware({
    src: appRoot,
    includePaths: appRoot,
    dest: sassDest,
    force: true
  }));

  if (!Array.isArray(options.base)) { options.base = [options.base]; }

  options.base.forEach(function(base) { middlewares.push(connect.static(base)); });
  middlewares.push(connect.static(sassDest));
  middlewares.push(connect.directory(directory));

  return middlewares;
}


/* jshint node: true */
module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      dev: {
        options: {
          port: 8000,
          hostname: '*',
          keepalive: true,
          base: [
            appRoot
          ],
          middleware: sassMiddleware
        }
      }
    },

    watch: {
      livereload: {
        files: [
          'app/*.hmtl',
          'app/*.scss',
          'app/*.js'
        ],
        options: {
          livereload: true
        },
      }
    },

    parallel: {
      dev: {
        options: {
          stream: true,
          grunt: true
        },
        tasks: ['watch:livereload', 'connect']
      }
    },

    requirejs: {
      compile: {
        options: _.extend(require('./app/config/require_config'), {
          name: "index",
          baseUrl: 'app',
          out: "build/index.js"
        })
      }
    },

    sass: {
      options: {
        includePaths: [appRoot]
      },
      all: {
        files: {
          'build/index.css': 'app/index.scss'
        }
      }
    },

    copy: {
      bowerDependenciesAsSCSS: {
        files: [
          {
            expand: true,
            cwd: 'app/vendor/bower_components',
            src: ['**/*.css', '!**/*.min.css'],
            dest: 'app/vendor/bower_components',
            ext: ".scss"
          }
        ]
      },

      build: {
        files: [
          { src: 'app/index.html', dest: 'build/index.html' },
          { expand: true, cwd: 'app', src: 'vendor/bower_components/requirejs/require.js', dest: 'build' },
          { expand: true, cwd: 'app', src: 'config/require_config.js', dest: 'build' }
        ]
      }
    },

    karma: {
      options: {
        basePath: 'app',
        frameworks: ['jasmine', 'requirejs'],
        files: [
          'vendor/bower_components/sinonjs/sinon.js',
          'vendor/bower_components/jasmine-sinon/lib/jasmine-sinon.js',
          'config/require_config.js',
          'spec/spec_runner.js',
          { pattern: './**/*.js', included: false }
        ],
        browsers: ['PhantomJS'],
        reporters: ['dots']
      },

      build: {
        singleRun: true
      },

      watch: {
        autoWatch: true
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['app/src/**/*.js', 'app/spec/**/*.js', 'app/config/**/*.js']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  // It is advisable to use only registered tasks and not their
  // plugin implementations.

  grunt.registerTask('build', ['copy:build', 'sass', 'requirejs']);
  grunt.registerTask('dev', ['parallel:dev']);
  grunt.registerTask('spec', ['jshint', 'karma:build']);
  grunt.registerTask('watch_spec', 'karma:watch');

  grunt.registerTask('default', ['spec', 'build']);
};
