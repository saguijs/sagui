# Sagui

Do you want to code your next awesome Single Page Application and not care about build, testing and all that boring stuff? This is a good place to start.

## Getting started

* Make sure you have [Node.js](http://nodejs.org/), [Grunt](https://github.com/sindresorhus/grunt-sass/archive/master.zip) and [Bower](http://bower.io/) installed
* [Download](https://github.com/sindresorhus/grunt-sass/archive/master.zip) this boilerplate
* Install the dependencies `npm install`
* Start the development server `npm start`
* Open the browser [http://0.0.0.0:8000/](http://0.0.0.0:8000/)
* Code like there is no tomorrow inside the `app` folder.

## Managing dependencies

Frontend dependencies could be managed with [Bower](http://bower.io):

* Install new dependencies with `bower install --save`
* Setup [RequireJS](http://requirejs.org) dependencies by changing the `app/config/require_config.js`

## Automated testing

Don't forget to code your specs with [Jasmine](http://jasmine.github.io/1.3/introduction.html):

* Have your tests run on any file change `grunt watch_spec`

## Build

Once you are ready, hit the build button!

* `grunt build`

Your application will then be ready to be distributed at a `build` folder.

This project's main goal is to do all the laborious serving/building/testing tasks automated for you.

*The code examples are from the Jasmine Standalone distribution.*

## Found a better build system ?

Just take your `app` folder with you. No strings attached.

## More information

For more information, check the CONTRIBUTING file.

## Author

[Paulo Ragonha](https://github.com/pirelenito)
