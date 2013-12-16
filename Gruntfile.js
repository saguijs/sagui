/* jshint node: true */
module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      dev: {
        options: {
          port: 8000,
          hostname: '*',
          keepalive: true,
          base: __dirname + '/'
        }
      }
    },

    watch: {
      livereload: {
        files: [
          'app/**/*'
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  // It is advisable to use only registered tasks and not their
  // plugin implementations.

  grunt.registerTask('dev', 'parallel:dev');
  grunt.registerTask('spec', ['jshint', 'karma:build']);
  grunt.registerTask('watch_spec', 'karma:watch');

  grunt.registerTask('default', 'spec');
};
