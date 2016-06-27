![Sagui](https://raw.githubusercontent.com/saguijs/sagui/master/banner.jpg)

[![Build Status](https://travis-ci.org/saguijs/sagui.svg)](https://travis-ci.org/saguijs/sagui)
[![npm version](https://badge.fury.io/js/sagui.svg)](https://badge.fury.io/js/sagui)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Sagui is **the single development dependency** that bundles [Webpack](http://webpack.github.io/), [Babel](http://babeljs.io/), [Karma](http://karma-runner.github.io/) and [Standard](http://standardjs.com/) in a hassle-free, easily updatable setup.

It follows an opinionated convention over configuration approach, providing a solid foundation so that you can focus on writing your code.

**This branch is for the upcoming v6 release**, for the current stable release check the [v4 branch](https://github.com/saguijs/sagui/tree/v4).

**The documentation in still a work in progress.**

## Creating a new front-end project

**In a new folder**, create a [new npm project](https://docs.npmjs.com/cli/init):

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
├── .babelrc
├── .eslintrc
├── .eslintignore
├── .gitignore
├── node_modules
│   └── sagui
├── package.json
├── sagui.config.js
└── src
    ├── index.html
    ├── index.js
    ├── index.css
    └── index.spec.js
```

From here on, you are ready to start development. You do that by **using common npm run scripts**:

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
- `npm run test:coverage`: run the unit tests with HTML coverage report;
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

To change it and add more pages, you can add a custom configuration in the `sagui.config.js` file:

```js
module.exports = {
  pages: ['index', 'about']
}
```

And add additional `src/about.js` and `src/about.html` files for each page entry-point.

### Library

Create reusable libraries that can be shared across applications. Sagui will take care of the build process so that external libraries are not bundled and that you have a CommonJS module as the output.

To get started, the only required configuration is the library name:

```js
module.exports = {
  library: 'ReactTransition'
}
```

#### External dependencies

Sagui will use the the **peerDependencies** information in the project's `package.json` to determine what are the external dependencies of the library that shouldn't be bundled in the final build.

## <a name="advanced-configuration"></a>Advanced configuration

Webpack and Karma have both very rich plugins ecosystems already, so it is no point trying to create a new ecosystem on top of them. Instead Sagui aims to provide a good base configuration that can be easily extended or changed.

### Extending the default Webpack configuration

Sagui supports the standard [configuration](http://webpack.github.io/docs/configuration.html), so if a feature you need is not supported, extending Sagui should be pretty straightforward.

As **an example**, lets add an extra loader to load HTML files. In the `sagui.config.js` file:

```js
module.exports = {
  webpack: {
    module: {
      loaders: [{
        test: /\.html$/,
        loader: 'html'
      }]
    }
  }
}
```

For more information on how the merging of Webpack configurations work check [webpack-merge](https://github.com/survivejs/webpack-merge).

### Extending the default Karma configuration

Sagui also supports the standard Karma [configuration](https://karma-runner.github.io/0.13/config/configuration-file.html).

As **an example**, lets change the default browser used to execute the tests from *PhantomJS* to *Chrome*. In the `sagui.config.js` file:

```js
module.exports = {
  karma: {
    browsers: ['Chrome']
  }
}
```

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
