var _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    configPath = path.join(__dirname, '/config/scss_config.json'),
    config = JSON.parse(fs.readFileSync(configPath)),
    includePaths = config.includePaths.map(function (scssPath) { return path.join(__dirname, scssPath); });


/**
  Connect middleware to compile and serve sass files
 */
function sassMiddleware (connect, options) {
  var sass = require('node-sass'),
      middlewares = [],
      sassDest = path.join(__dirname, '/.compiled_sass'),
      directory = options.directory || options.base[options.base.length - 1];

  middlewares.push(sass.middleware({
    src: __dirname,
    includePaths: includePaths,
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
            __dirname
          ],
          middleware: sassMiddleware
        }
      }
    },

    watch: {
      livereload: {
        files: [
          '*.hmtl',
          '*.scss',
          '*.js'
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
        options: _.extend(require('./config/require_config'), {
          name: "index",
          out: "build/index.js"
        })
      }
    },

    sass: {
      options: {
        includePaths: includePaths
      },
      all: {
        files: {
          'build/index.css': 'index.scss'
        }
      }
    },

    copy: {
      bowerDependenciesAsSCSS: {
        files: [
          {
            expand: true,
            cwd: 'bower_components',
            src: ['**/*.css', '!**/*.min.css'],
            dest: 'bower_components',
            ext: ".scss"
          }
        ]
      },

      build: {
        files: [
          { src: 'index.html', dest: 'build/index.html' },
          { expand: true, src: 'bower_components/requirejs/require.js', dest: 'build' },
          { expand: true, src: 'config/require_config.js', dest: 'build' }
        ]
      }
    },

    karma: {
      options: {
        basePath: '',
        frameworks: ['jasmine', 'requirejs'],
        files: [
          'bower_components/jquery/jquery.js',
          'bower_components/sinonjs/sinon.js',
          'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
          'bower_components/jasmine-sinon/lib/jasmine-sinon.js',
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
      all: ['app/**/*.js', 'spec/**/*.js', 'config/**/*.js']
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
