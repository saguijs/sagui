![Sagui](https://raw.githubusercontent.com/saguijs/sagui/master/banner.jpg)

[![Build Status](https://travis-ci.org/saguijs/sagui.svg)](https://travis-ci.org/saguijs/sagui)
[![Windows Tests](https://img.shields.io/appveyor/ci/pirelenito/sagui.svg?label=Windows%20Tests)](https://ci.appveyor.com/project/pirelenito/sagui)
[![npm version](https://badge.fury.io/js/sagui.svg)](https://badge.fury.io/js/sagui)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Join the chat at https://gitter.im/saguijs/sagui](https://badges.gitter.im/saguijs/sagui.svg)](https://gitter.im/saguijs/sagui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Sagui is the **single development dependency** that provides the tooling required to build, test and develop modern JavaScript applications.

Its main goal is to kill the need of global CLIs and boilerplates, making a reproducible and easily updated environment across projects.

It follows an opinionated convention over configuration approach, providing a solid foundation so that you can focus on writing your code and not your tooling.

## Quick start in 3 steps!

Let's create a new front-end project from scratch.

**In a new folder**, create a [new npm project](https://docs.npmjs.com/cli/init):

```bash
npm init -y
```

**Install Sagui locally** as a development dependency:

```bash
npm install --save-dev sagui
```

Start the development server:

```bash
npm start
```

Done! Sagui is an *auto-bootstraping* library, so during the install process (in a fresh npm project) it automatically creates a basic project scaffolding:

```bash
├── .babelrc
├── .editorconfig
├── .eslintignore
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

Just start writing the code inside the `src/` folder.

## npm scripts

Sagui manages the [package.json](https://docs.npmjs.com/files/package.json) scripts for you:

- `npm run build`: build a development version of the project;
- `npm run develop`: spin up a development server with live-reload and [HMR](http://webpack.github.io/docs/hot-module-replacement.html);
- `npm run dist`: build a production ready version of the project;
- `npm run start`: alias for the *develop* script;
- `npm run test`: run all test related scripts below;
- `npm run test:lint`: run static analysis in the code;
- `npm run test:unit`: run the unit tests;
- `npm run test:coverage`: run the unit tests with coverage report;
- `npm run test:typecheck`: run the static type analysis in the code;
- `npm run test:unit:watch`: run a test watcher (great for development and debugging).

If you don't change the scripts, they will be **automatically updated** on new Sagui releases.

## Features

As stated earlier, Sagui strives to provide all the basic needs to create modern JavaScript applications.

### Development server

The development server out-of-the-box has live reloading and **hot-module replacement**.

[ReactJS](http://reactjs.com/) has first-class support via [react-transform](https://github.com/gaearon/babel-plugin-react-transform), so updating components' source reflects instantly (without full refresh) in the browser.

### Build

Sagui uses [Webpack](http://webpack.github.io/) as its underlying bundling tool. The biggest feature that Webpack provides is that everything is a module. Sagui supports the following module types by default:

- Fonts (`.woff`, `.woff2`, `.ttf`, `.eot`, `.otf`)
- Images (`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`)
- JavaScript (`.js`, `.es6`, `.jsx`) via [Babel]((http://babeljs.io/docs/learn-es2015/))
- JSON
- Styles in [CSS Modules](https://github.com/css-modules) in either plain CSS or [Sass lang](http://sass-lang.com/)
- Text (`.txt`) files [loaded](https://github.com/webpack/raw-loader) without any processing
- Video (`.ogg`, `.mp4`)
- YAML

During build, optimizations and special processing are also performed in the output bundle:

- [Autoprefixer for CSS properties](https://github.com/postcss/autoprefixer) for cross-browser support;
- [Commons code splitting](https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin) if there is more than a single entry-point;
- [Extract styles as separated files](https://github.com/webpack/extract-text-webpack-plugin) to style the page before the JavaScript is loaded and parsed;
- Minification and code dedupication.

### Testing and quality

Test automation in Sagui is achieved by creating `.spec.js` files inside the `src/` folder using the [Jasmine](http://jasmine.github.io/) framework.

A simple example would be:

- `src/components/button.js`
- `src/components/button.spec.js`

Sagui will automatically run every test file that follows this convention.

Under the hood it uses [Karma test runner](http://karma-runner.github.io/) to allow running the tests in the most diverse browsers and even through [Selenium](http://docs.seleniumhq.org/) (not natively).

By default Sagui uses [PhantomJS](http://phantomjs.org/) to run the tests headlessly. To **speed up installing the dependencies** (`npm install`) it is advisable to have PhantomJS [installed globally](https://github.com/Medium/phantomjs#using-phantomjs-from-disk) in the machine.

To open the tests in a browser (or in multiple browsers!), simply follow the link Karma outputs when you start running the script `test:unit:watch`. Running them in a browser allows you to set breakpoints and debug your code properly. Note watch mode is necessary, else tests will stop running when finished.

#### Linting

Static code analysis is also performed on the code following the [JavaScript Standard Style](http://standardjs.com/) convention.

#### Static type checking

[Flowtype](flowtype.org) static type analysis is available as part of the testing suite. By default the flowtype checker only runs on files with the `// @flow` comment at the beginning, so no static type analysis will be actually performed unless you add that. See the [docs](https://flowtype.org/docs/existing.html) for an more in depth explanation of why it is a good idea to have it like this.

Sagui bundles loose lib [interface declarations](https://flowtype.org/docs/declarations.html#pointing-your-project-to-declarations) for the Jasmine APIs used in the tests. You might want to look into the more complete [flow-typed](https://github.com/flowtype/flow-typed) repo to get already made interfaces for common project dependencies such as React, Redux, Ramda, …

## Configuration

The Sagui configuration is all performed via the single `sagui.config.js` that is bootstraped in the project root folder once Sagui is first installed. At its simplest it could be just:

```js
module.exports = {
  pages: ['index']
}
```

Then we can add extra configuration on top of it:

### `pages`

These are static **applications** that can be built around multiple pages. Each page is the combination of an `html` and a `js` file.

```js
module.exports = {
  pages: ['index', 'about']
}
```

The previous configuration will expect and build the files:

- `src/about.html` => `dist/about.html`
- `src/about.js` => `dist/about.js`
- `src/index.html` => `dist/index.html`
- `src/index.js` => `dist/index.js`

### `libraries`

Create **reusable libraries** that can be shared across applications. Sagui will take care of the build process so that external libraries are not bundled and that you have a CommonJS module as the output.

It works similarly to *pages*, allowing a list of "library entry points" to be built. The only difference here is that each library points to a single JavaScript file. Taking the example of a UI toolkit project, it could have the following libraries:

```js
module.exports = {
  libraries: ['button', 'field', 'select']
}
```

And these will build the files:

- `src/button.js` => `dist/button.js`
- `src/field.js` => `dist/field.js`
- `src/select.js` => `dist/select.js`

Regarding **external dependencies**, Sagui will use the **peerDependencies** information in the project's `package.json` to determine what are the external dependencies of the library that shouldn't be bundled in the final build.

As an example, given a project with the `package.json`:

```json
{
  "name": "library-project",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "left-pad": "1.1.0"
  },
  "peerDependencies": {
    "react": "^0.14.7"
  }
}
```

And somewhere in the source there are the following imports:

```js
import React from 'react'
import leftPad from 'left-pad'
```

When building the project, `react` won't actually be bundled in the output but `left-pad` will, so your project won't blow up once `left-pad` is unpublished again.

#### Publishing libraries as UMD

If you need to build your library targeting UMD, you can use a slightly different configuration. For UMD you need to provide a _umdName_ for the library, which is going to be the name that it will use to add itself to the `window` object when loaded as a global in the browser.

```js
module.exports = {
  libraries: [
    {
      main: 'button',
      umdName: 'MyUIButton'
    }
  ]
}
```

### `style.cssModules`

By default, styles compiled with Sagui will be output as [CSS Modules](https://github.com/css-modules), meaning they won't be global.

It is possible to disable this behavior and have regular CSS styles:

```js
module.exports = {
  style: {
    cssModules: false
  }
}
```

### `style.sourceMaps`

Source maps are always generated for styles, but it is possible to disable it.

```js
module.exports = {
  style: {
    sourceMaps: false
  }
}
```

### `style.extract`

By default, when building **pages**, Sagui [extracts](https://github.com/webpack/extract-text-webpack-plugin) the CSS definitions into separated `.css` files. It is possible to disable this behavior and have the CSS inlined in the same JavaScript bundle.

```js
module.exports = {
  style: {
    extract: false
  }
}
```

### `javaScript.transpileDependencies`

Dependencies **installed through npm** are not transpiled with Babel by default. If you have a dependency that needs to be transpiled it is very easy, just add its name to the list:

```js
module.exports = {
  javaScript: {
    transpileDependencies: ['dependency-to-be-transpiled']
  }
}
```

### `javaScript.typeCheckAll`

By default, Flowtype ignores files that don't start with the `// @flow` comment line. If you want all your files to be statically type checked, you can enable that feature in the sagui config:

```js
module.exports = {
  javaScript: {
    typeCheckAll: true
  }
}
```

### `develop.proxy`

Allow proxying requests to a separate, possible external, backend server.

```js
module.exports = {
  develop: {
    proxy: {
      '/some/path*': {
        target: 'https://other-server.example.com',
        secure: false
      }
    }
  }
}
```

Please check [node-http-proxy documentation](https://github.com/nodejitsu/node-http-proxy#options) for the available configuration options.

### `webpack`

If a build requirement can't be achieved via the previous configuration options, first [open an issue](https://github.com/saguijs/sagui/issues) so that we can add official support, and if you can't wait or is something very specific to your project, there is an **escape hatch** to allow extending the internal Webpack configuration.

As an example, let's add an extra loader to load HTML files. In the `sagui.config.js` file:

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

For more information about configuring Webpack, check the [Webpack documentation](http://webpack.github.io/docs/configuration.html).

For more information on how the merging of Webpack configurations work, check [webpack-merge](https://github.com/survivejs/webpack-merge).

### `disabledLoaders`

Disable internal Sagui loaders in order to implement custom behavior via the `webpack` configuration.

```js
module.exports = {
  disabledLoaders: ['yaml']
}
```

Possible values:

- `font`
- `image`
- `javaScript`
- `json`
- `style`
- `txt`
- `video`
- `yaml`

### `karma`

If a test automation requirement can't be achieved via the previous configuration options, first [open an issue](https://github.com/saguijs/sagui/issues) so that we can add official support, and if you can't wait or is something very specific to your project, there is an **escape hatch** to allow extending the internal Karma configuration.

As an example, let's change the default browser used to execute the tests from *PhantomJS* to *Chrome*. In the `sagui.config.js` file:

```js
module.exports = {
  karma: {
    browsers: ['Chrome']
  }
}
```

For more information about configuring Karma, check the [Karma documentation](https://karma-runner.github.io/0.13/config/configuration-file.html).

## Gotchas

### React Router

For [`react-router`](https://github.com/ReactTraining/react-router) to work on the development server, an absolute static path for the output has to be configured on Webpack. You can do that by adding this configuration to `sagui.config.js`:

```javascript
webpack: {
  output: {
    publicPath: '/'
  }
}
```

## Logo

[Monkey artwork](https://thenounproject.com/term/monkey/267835) created by Ryan Spiering from the Noun Project.

## Contributing and development

To develop the tool locally, we will need to resort to a combination of a global [npm link](https://docs.npmjs.com/cli/link) and local links in projects.

You can start by linking Sagui globally. While at its folder:

```bash
npm link
```

The environment variable is to inform Sagui that it is working in a "linked environment".

Then, **in the project you intend to use Sagui**, link it locally:

```bash
npm link sagui
```

Now, the project is set to use your development copy of Sagui. Unfortunately, you will need to run any command in the project providing the environment variable `SAGUI_LINK`:

```bash
SAGUI_LINK=true npm start
```
