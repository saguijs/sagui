# Sagui

[![Build Status](https://travis-ci.org/pirelenito/sagui.svg)](https://travis-ci.org/pirelenito/sagui)
[![npm version](https://badge.fury.io/js/sagui.svg)](https://badge.fury.io/js/sagui)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Code Climate](https://codeclimate.com/github/pirelenito/sagui/badges/gpa.svg)](https://codeclimate.com/github/pirelenito/sagui)

Sagui is a modern approach on build infrastructure to front-end projects. It follows an opinionated **convention over configuration** approach, providing a solid foundation so that you can focus on writing your code.

## Features:

Sagui acts as a front-end to a bunch of amazing technology to keep your development environment always up to date.

Here are some of its main features:

- Build and development infrastructure via [webpack](http://webpack.github.io/);
- Automated testing with [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/);
- Linting via [JavaScript Standard Style](http://standardjs.com/);
- Modern JavaScript language support with [Babel](http://babeljs.io/);
- Live-reload with "hot module replacement", specially for [React components](https://github.com/gaearon/react-transform);
- [CSS Modules](https://github.com/css-modules);
- [Sass lang](http://sass-lang.com/);
- and more...

Sagui strives to be the **last devDependency**:

- [Be local](https://twitter.com/pirelenito/status/682571493092515840), not global;
- [Be extensible](#custom-webpack-and-karma-config);
- Act in the shadows behind [npm scripts](https://docs.npmjs.com/misc/scripts);
- No more generators;
- No more boilerplate projects;
- No more starter kits;
- No more updating Babel and Webpack.

## Creating a new Sagui project

Create a new NPM project:

```bash
npm init -y .
```

Install sagui **locally** as a development dependency:

```bash
npm install --save-dev sagui
```

After the install is completed, Sagui **bootstraps** its basic infrastructure, no extra step is required.

```bash
$ tree
.
├── .eslintrc
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

Run the tests!

```bash
npm test
```

Sagui manages the [package.json](https://docs.npmjs.com/files/package.json) scripts for you, creating additional tasks such as:

- `npm run sagui:test`
- `npm run sagui:test-watch`
- `npm run sagui:develop`
- `npm run sagui:build`
- `npm run sagui:dist`

Then you can start writing your code inside the `src/` folder.

## Configuration

The internal architecture of Sagui is build arround plugins, each providing a set of functionalities that can be used during any of Sagui's actions.

### Pages

By default, sagui will build and serve a single page for your entire application. This is your `src/index.js` and `src/index.html` files.

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
  pages: ['index', 'demo']
}
```

And add additional `src/demo.js` and `src/demo.html` files for each page entry-point.

### <a name="custom-webpack-and-karma-config"></a> Custom Webpack and Karma config

To overwrite and extend the default configuartion you can use the same `saqui.config.js` file to specify your custom configurations:

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

### Disable plugins

If you need to disable any default behavior, it is possible via:

```js
/**
 * Sagui configuration object
 */
module.exports = {
  /**
   * List of Sagui plugins to disable
   */
  disabledPlugins: []
}
```

Default available plugins:

- **webpack-babel**: ES2015 support;
- **webpack-base**: Base paths and webpack plugins;
- **webpack-css-modules**: [CSS Modules](https://github.com/css-modules/css-modules) support;
- **webpack-define-node-env**: Populates `process.env.NODE_ENV`;
- **webpack-eslint**: ESLint support via [Standard](http://standardjs.com/);
- **webpack-json**: JSON loader;
- **webpack-media** Basic media loading support (JPG, PNG, GIF);
- **webpack-pages**: Add support for the above *Pages* configuration;
- **webpack-scss**: SCSS support.

## Development

To develop the tool locally, we will need to resort to a combination of a global [npm link](https://docs.npmjs.com/cli/link) and local links in projects.

You can start by linking Sagui globally. While at its folder:

```bash
SAGUI_LINK=true npm link
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
