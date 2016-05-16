# Sagui

[![Build Status](https://travis-ci.org/saguijs/sagui.svg)](https://travis-ci.org/saguijs/sagui)
[![npm version](https://badge.fury.io/js/sagui.svg)](https://badge.fury.io/js/sagui)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Code Climate](https://codeclimate.com/github/pirelenito/sagui/badges/gpa.svg)](https://codeclimate.com/github/pirelenito/sagui)

Sagui is **the single development dependency** that bundles [Webpack](http://webpack.github.io/), [Babel](http://babeljs.io/), [Karma](http://karma-runner.github.io/) and [Standard](http://standardjs.com/) in a hassle-free, easily updatable setup.

It follows an opinionated convention over configuration approach, providing a solid foundation so that you can focus on writing your code.

## Creating a new front-end project

Start by creating a new folder to hold your project files:

```bash
mkdir my-project
cd my-project
```

Then, create a [new NPM project](https://docs.npmjs.com/cli/init) (while at the project's folder):

```bash
npm init -y
```

**Install Sagui locally** as a development dependency:

```bash
npm install --save-dev sagui
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
├── sagui.config.js
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

Sagui manages the [package.json](https://docs.npmjs.com/files/package.json) scripts for you:

- `npm run start`: spins a development server
- `npm run test`: run the tests
- `npm run test-watch` run a test watcher (great for development)
- `npm run build`: build a development version of the project
- `npm run dist`: build a production ready version of the project

Then you can start writing your code inside the `src/` folder.

## Features:

Sagui acts as a front-end to a bunch of amazing technology to keep your development environment always up to date:

- [JavaScript 2015](http://babeljs.io/docs/learn-es2015/);
- [CSS Modules](https://github.com/css-modules) or [Sass lang](http://sass-lang.com/);
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
/**
 * Sagui configuration object
 */
module.exports = {
  /**
   * Different application entry-points
   * Each page is a combination of a JavaScript file and a HTML file
   *
   * Example: 'index' -> 'index.html' and 'index.js'
   */
  pages: ['index', 'about']
}
```

And add additional `src/about.js` and `src/about.html` files for each page entry-point.

### Library

Create reusable libraries that can be shared across applications. Sagui will take care of the build process so that external libraries are not bundled and that you have a CommonJS module as the output.

To get started, the only required configuration is the library name:

```js
/**
 * Sagui configuration object
 */
module.exports = {
  /**
   * Library name (usually in CammelCase)
   * Example: ReactTransition, ReactRedux
   */
  library: 'ReactTransition'
}
```

#### External dependencies

Sagui will use the the **peerDependencies** information in the project's `package.json` to determine what are the external dependencies of the library that shouldn't be bundled in the final build.

## Advanced configuration

Webpack and Karma have both very rich plugins ecosystems already, so it is no point trying to create a new ecosystem on top of them. Instead Sagui aims to provide a good set of default configurations that can be easily disabled or extended.

### Disabling a default behavior

The internal architecture of Sagui is build around plugins, each providing a set of functionalities that can be used during any of Sagui's actions.

If you need to disable any default behavior, it is possible via:

```js
/**
 * Sagui configuration object
 */
module.exports = {
  /**
   * List of Sagui plugins to disable
   */
  disabledPlugins: ['webpack-scss']
}
```

Here is the complete list of existing Sagui plugins:

- **webpack-archetype-library**: Add support for the above *Library* configuration;
- **webpack-archetype-pages**: Add support for the above *Pages* configuration;
- **webpack-babel**: ES2015 support;
- **webpack-base**: Base paths and webpack plugins;
- **webpack-css-modules**: [CSS Modules](https://github.com/css-modules/css-modules) support;
- **webpack-define-node-env**: Populates `process.env.NODE_ENV`;
- **webpack-eslint**: ESLint support via [Standard](http://standardjs.com/);
- **webpack-images** Images loading support (`jpg`, `jpeg`, `png`, `gif`);
- **webpack-json**: JSON loader;
- **webpack-scss**: SCSS support;
- **webpack-videos**: Videos loading support (`ogg`, `mp4`).

### <a name="custom-webpack-and-karma-config"></a> Custom Webpack and Karma config

To overwrite and extend the default configuration you can use the same `saqui.config.js` file to specify your custom configurations:

```js
/**
 * Sagui configuration object
 */
module.exports = {
  /**
   * Webpack configuration object
   * see: http://webpack.github.io/docs/configuration.html
   *
   * Will ovewrite and extend the default Sagui configuration
   */
  webpackConfig: {

  },

  /**
   * Karma configuration object
   * see: https://karma-runner.github.io/0.13/config/configuration-file.html
   *
   * Will overwrite and extend the default Sagui configuration
   */
  karmaConfig: {

  }
}
```

As **an example**, lets add an extra loader to handle [Yaml](http://yaml.org/) files:

```js
/**
 * Sagui configuration object
 */
module.exports = {
  webpackConfig: {
    module: {
      loaders: [{
        test: /\.(yaml|yml)$/,
        loader: 'json!yaml'
      }]
    }
  }
}
```

For more information on how the merging of Webpack configurations work check [webpack-merge](https://github.com/survivejs/webpack-merge).

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
