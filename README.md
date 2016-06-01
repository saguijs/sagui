![Sagui](https://raw.githubusercontent.com/saguijs/sagui/master/banner.jpg)

[![Build Status](https://travis-ci.org/saguijs/sagui.svg)](https://travis-ci.org/saguijs/sagui)
[![npm version](https://badge.fury.io/js/sagui.svg)](https://badge.fury.io/js/sagui)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Code Climate](https://codeclimate.com/github/pirelenito/sagui/badges/gpa.svg)](https://codeclimate.com/github/pirelenito/sagui)

Sagui is **the single development dependency** that bundles [Webpack](http://webpack.github.io/), [Babel](http://babeljs.io/), [Karma](http://karma-runner.github.io/) and [Standard](http://standardjs.com/) in a hassle-free, easily updatable setup.

It follows an opinionated convention over configuration approach, providing a solid foundation so that you can focus on writing your code.

**This branch is for the upcoming v5 release**, for the current stable release check the [v4 branch](https://github.com/saguijs/sagui/tree/v4).

## Creating a new front-end project

**In a new folder**, create a [new NPM project](https://docs.npmjs.com/cli/init):

```bash
npm init -y
```

**Install Sagui locally** as a development dependency:

```bash
npm install --save-dev sagui@beta
```

After the install is completed, Sagui **bootstraps** its basic infrastructure, **no extra step is required**.

```bash
$ tree
.
├── .eslintrc
├── .gitignore
├── node_modules
│   └── sagui
├── package.json
├── karma.conf.js
├── webpack.config.js
└── src
    ├── index.html
    ├── index.js
    ├── index.css
    └── index.spec.js
```

From here on, you are ready to start development. You do that by **using common NPM run scripts**:

```bash
npm start
```

To run the tests, simply:

```bash
npm test
```

Then you can start writing your code inside the `src/` folder.

## npm scripts

Sagui manages the [package.json](https://docs.npmjs.com/files/package.json) scripts for you:

- `npm run build`: build a development version of the project;
- `npm run develop`: spins a development server;
- `npm run dist`: build a production ready version of the project;
- `npm run start`: alias for the *develop* script;
- `npm run test`: run all test scripts;
- `npm run test:lint`: run static analysis in the code;
- `npm run test:unit`: run the unit tests;
- `npm run test:unit:watch`: run a test watcher (great for development).

## Features:

Sagui acts as a front-end to a bunch of amazing technology to keep your development environment always up to date:

- [JavaScript 2015](http://babeljs.io/docs/learn-es2015/);
- [CSS Modules](https://github.com/css-modules) with either [Sass lang](http://sass-lang.com/) or vanilla CSS;
- [Webpack loaders](http://webpack.github.io/) for common media files
- Automated testing with [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/);
- Linting via [JavaScript Standard Style](http://standardjs.com/);
- Live-reload with **hot module replacement** ([React components](https://github.com/gaearon/react-transform));

## Configuration

Sagui supports two major project archetypes: **Pages** and **Library**.

They are not mutually exclusive, so it is possible to create a library project and use the pages archetype to create some demo pages for example.

### Pages

This is a static application that can be built around multiple pages. Each page is the combination of an `html` and a `js` files.

**It is the default bootstrapped configuration**, and it will build and serve a single page for your entire application based on the `src/index.js` and `src/index.html` files.

To change it and add more pages, you can add a custom configuration in the `webpack.config.js` file:

```js
var sagui = require('sagui')

module.exports = sagui().webpack({
  sagui: {
    /**
     * Different application entry-points
     * Each page is a combination of a JavaScript file and a HTML file
     *
     * Example: 'index' -> 'index.html' and 'index.js'
     */
    pages: ['index', 'about'],
  }
})
```

And add additional `src/about.js` and `src/about.html` files for each page entry-point.

### Library

Create reusable libraries that can be shared across applications. Sagui will take care of the build process so that external libraries are not bundled and that you have a CommonJS module as the output.

To get started, the only required configuration is the library name:

```js
var sagui = require('sagui')

module.exports = sagui().webpack({
  sagui: {
    /**
     * Library name (usually in CammelCase)
     * Example: ReactTransition, ReactRedux
     */
    library: 'ReactTransition'
  }
})
```

#### External dependencies

Sagui will use the the **peerDependencies** information in the project's `package.json` to determine what are the external dependencies of the library that shouldn't be bundled in the final build.

## <a name="advanced-configuration"></a>Advanced configuration

Webpack and Karma have both very rich plugins ecosystems already, so it is no point trying to create a new ecosystem on top of them. Instead Sagui aims to provide a good base configuration that can be easily extended or changed.

### Extending the default Webpack configuration

Sagui uses the standard Webpack [CLI](http://webpack.github.io/docs/cli.html) and [configuration file](http://webpack.github.io/docs/configuration.html) file, so extending it is pretty straightforward.

As **an example**, lets add an extra loader to handle [Yaml](http://yaml.org/) files:

```js
var sagui = require('sagui')

module.exports = sagui().webpack({
  module: {
    loaders: [{
      test: /\.(yaml|yml)$/,
      loader: 'json!yaml'
    }]
  }
})
```

For more information on how the merging of Webpack configurations work check [webpack-merge](https://github.com/survivejs/webpack-merge).

### Disabling a default Webpack configuration

The internal architecture of Sagui is build around presets. If you need to disable any default behavior, it is possible by removing a preset from the list of `enabledPresets` in the `webpack.config.js` file:

```js
var sagui = require('sagui')

module.exports = sagui().webpack({
  sagui: {
    // example: enables only babel and base
    enabledPresets: [
      'babel',
      'base'
    ]
  }
})
```

Here is the complete list of existing Sagui presets:

- **babel**: ES2015 support;
- **base**: Base paths and webpack plugins;
- **clean**: Clean the build folder;
- **define-node-env**: Populates `process.env.NODE_ENV`;
- **eslint**: ESLint support via [Standard](http://standardjs.com/);
- **fonts**: Font loading support (`woff`, `woff2`, `ttf`, `eot`);
- **images** Images loading support (`jpg`, `jpeg`, `png`, `gif`, `svg`);
- **json**: JSON loader;
- **library**: Add support for the above *Library* configuration;
- **optimize**: Optimize the build using UglifyJsPlugin and DedupePlugin;
- **pages**: Add support for the above *Pages* configuration;
- **style**: Vanilla CSS and [Sass language](http://sass-lang.com/) with [CSS Modules](https://github.com/css-modules/css-modules) support;
- **videos**: Videos loading support (`ogg`, `mp4`).

### Extending the default Karma configuration

Sagui uses the standard Karma [CLI](https://karma-runner.github.io/0.13/intro/configuration.html) and [configuration file](https://karma-runner.github.io/0.13/config/configuration-file.html) file, so extending it is pretty straightforward.

As **an example**, lets change the default browser used to execute the tests from *PhantomJS* to *Chrome* by updating the configuration file `karma.conf.js`:

```js
var sagui = require('sagui')
var webpack = require('./webpack.config')

module.exports = sagui().karma({
  // webpack configuration used to build the tests
  webpack,

  browsers: ['Chrome']
})
```

### Disabling a default Karma configuration

Following the same architecture of the Webpack presets, it is also possible to disable a specific Sagui behavior by also removing a preset from the list of `enabledPresets` in the `karma.conf.js` file:

```js
var sagui = require('sagui')
var webpack = require('./webpack.config')

module.exports = sagui().karma({
  sagui: {
    enabledPresets: [
      'base',
      'browsers',
      'frameworks',
      'reporters'
    ]
  },

  // webpack configuration used to build the tests
  webpack
})

```

Here is the complete list of existing Sagui presets:

- **base**: base configuration setting up the path and Webpack;
- **browsers**: default Sagui recommended browsers [PhantomJS](http://phantomjs.org);
- **frameworks**: recommended testing framework [Jasmine](http://jasmine.github.io/) and [Sinon](http://sinonjs.org/) setup so that they are available as globals in the test environment;
- **reporters**: Basic reporting of test results using the *mocha* style.

## Logo

[Monkey artwork](https://thenounproject.com/term/monkey/267835) created by Ryan Spiering from the Noum Project.

## Contributing and development

To develop the tool locally, we will need to resort to a combination of a global [npm link](https://docs.npmjs.com/cli/link) and local links in projects.

You can start by linking Sagui globally. While at its folder:

```bash
npm link
```

The environment variable is to inform Sagui that it is working in a "linked environment".

Then, **at the project you intend to use Sagui**, link it locally:

```bash
npm link sagui
```

Now, the project is set to use your development copy of Sagui. Unfortunately, you will need to run any command in the project providing the environment variable `SAGUI_LINK`:

```bash
SAGUI_LINK=true npm start
```
