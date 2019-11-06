## Deprecated

When Sagui was created, the frontend landscape was in a much different situation than it is today. Creating projects was a hell and we all faced the now infamous "JavaScript fatigue". Fast-forward to 2019 and we now have established solutions such as [create-react-app](https://github.com/facebook/create-react-app) that have a large community behind and is being well maintained. Therefore there is no longer a need for Sagui to exist.

This was a fantastic ride and I've learned a lot while building this little tool.

Thanks to all the community who help me along the way! ❤️🐒

![Sagui](https://raw.githubusercontent.com/saguijs/sagui/master/banner.jpg)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsaguijs%2Fsagui.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsaguijs%2Fsagui?ref=badge_shield)

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
├── .editorconfig
├── .flowconfig
├── .gitignore
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
- `npm run dist`: build an optimized (ready for deployment) version of the project;
- `npm run start`: spin up a development server with live-reload and [HMR](https://webpack.js.org/concepts/hot-module-replacement/);
- `npm run format`: automatically format the code using [prettier](https://github.com/prettier/prettier);
- `npm run test`: run all test related scripts below;
- `npm run test:lint`: run static analysis in the code;
- `npm run test:unit`: run the unit tests;
- `npm run test:typecheck`: run the static type analysis in the code;
- `npm run test:unit:watch`: run a test watcher (great for development and debugging).

If you don't change the scripts, they will be **automatically updated** on new Sagui releases.

## Features

As stated earlier, Sagui strives to provide all the basic needs to create modern JavaScript applications.

### Development server

The development server out-of-the-box has live reloading and **hot-module replacement**.

### Build

Sagui uses [Webpack](https://webpack.js.org/) as its underlying bundling tool. The biggest feature that Webpack provides is that everything is a module. Sagui supports the following module types by default:

- Fonts (`.woff`, `.woff2`, `.ttf`, `.eot`, `.otf`)
- HTML (`.html`)
- Images (`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`)
- JavaScript (`.js`, `.es6`, `.jsx`) via [Babel]((http://babeljs.io/docs/learn-es2015/))
- JSON
- Styles in [CSS Modules](https://github.com/css-modules) in either plain CSS or [Sass lang](http://sass-lang.com/)
- Text (`.txt`) files [loaded](https://github.com/webpack/raw-loader) without any processing
- Video (`.ogg`, `.mp4`)
- YAML

During build, optimizations and special processing are also performed in the output bundle:

- [Autoprefixer for CSS properties](https://github.com/postcss/autoprefixer) for cross-browser support;
- [Commons code splitting](https://webpack.js.org/plugins/commons-chunk-plugin/) if there is more than a single entry-point;
- [Extract styles as separated files](https://github.com/webpack/extract-text-webpack-plugin) to style the page before the JavaScript is loaded and parsed;
- Minification and code dedupication.

### Testing and quality

Test automation in Sagui is achieved by creating `.spec.js` files inside the `src/` folder using the [Jasmine](http://jasmine.github.io/) framework.

A simple example would be:

- `src/components/button.js`
- `src/components/button.spec.js`

Sagui will automatically run every test file that follows this convention.

Under the hood it uses [Karma test runner](http://karma-runner.github.io/) to allow running the tests in the most diverse browsers and even through [Selenium](http://docs.seleniumhq.org/) (not natively).

To run the tests Sagui uses [Chrome Headless](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md), but it fallbacks to [PhantomJS](http://phantomjs.org/) if Chrome is not installed on the machine.

Make sure either of these browsers is installed to be able to run the tests:

- [Chrome](https://www.google.com/chrome/browser/desktop/index.html)
- [PhantomJS](https://github.com/Medium/phantomjs#using-phantomjs-from-disk)

To open the tests in a browser (or in multiple browsers!), simply follow the link Karma outputs when you start running the script `test:unit:watch`. Running them in a browser allows you to set breakpoints and debug your code properly. Note watch mode is necessary, else tests will stop running when finished.

#### Code formatting

We expect the code to be formatted using [prettier](https://github.com/prettier/prettier). Sagui has a script that can apply the expected code format for you, simply run:

```bash
npm run format
```

To get the code formatted automatically for you, it is recommended that you install the [prettier plugin](https://atom.io/packages/prettier-atom) in your editor of choice with the same configuration that is used by Sagui:

- singleQuote: `true`
- parser: `babylon`
- semi: `false`
- printWidth: `100`
- trailingComma: `es5`

Prettier is combined with the [JavaScript Standard Style](http://standardjs.com/) convention to check for common errors in the code.

#### Static type checking

[Flowtype](flowtype.org) static type analysis is available as part of the testing suite. By default the flowtype checker only runs on files with the `// @flow` comment at the beginning, so no static type analysis will be actually performed unless you add that. See the [docs](https://flowtype.org/docs/existing.html) for an more in depth explanation of why it is a good idea to have it like this.

Sagui bundles loose lib [interface declarations](https://flowtype.org/docs/declarations.html#pointing-your-project-to-declarations) for the Jasmine APIs used in the tests. You might want to look into the more complete [flow-typed](https://github.com/flowtype/flow-typed) repo to get already made interfaces for common project dependencies such as React, Redux, Ramda, …

## Configuration

The Sagui configuration is all performed via the single `sagui.config.js` that is bootstraped in the project root folder once Sagui is first installed. At its simplest it could be just:

```js
// sagui.config.js
module.exports = {
  pages: ['index']
}
```

Then we can add extra configuration on top of it:

### `pages`

These are static **applications** that can be built around multiple pages. Each page is the combination of an `html` and a `js` file.

```js
// sagui.config.js
module.exports = {
  pages: ['index', 'about']
}
```

The previous configuration will expect and build the files:

- `src/about.html` => `dist/about.html`
- `src/about.js` => `dist/about.js`
- `src/index.html` => `dist/index.html`
- `src/index.js` => `dist/index.js`

#### Excluding a page from chunks

If you want a page to be excluded from either the [vendor](#chunksvendor) or [common](#chunkscommon) chunk, then you can do so by providing an object with a `name` and `independent` flag (set to `true`) instead of just the name of the page.

```js
// sagui.config.js
module.exports = {
  pages: ['index', 'about', { name: 'demo', independent: true }]
}
```

### `chunks.vendor`

If you want all your external dependencies (`node_modules`) in your [pages](#pages) to be bundled together in a "vendor" chunk, then set this flag to `true`. By default it is set to `false`.

```js
// sagui.config.js
module.exports = {
  chunks: {
    vendor: true
  }
}
```

### `chunks.common`

If you do not want all the common dependencies of your [pages](#pages) to be bundled together in a "common" chunk, then set this flag to `false`. By default it is set to `true`.

```js
// sagui.config.js
module.exports = {
  chunks: {
    common: false
  }
}
```

### `libraries`

Create **reusable libraries** that can be shared across applications. Sagui will take care of the build process so that external libraries are not bundled and that you have a CommonJS module as the output.

It works similarly to *pages*, allowing a list of "library entry points" to be built. The only difference here is that each library points to a single JavaScript file. Taking the example of a UI toolkit project, it could have the following libraries:

```js
// sagui.config.js
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
// sagui.config.js
module.exports = {
  libraries: [
    {
      main: 'button',
      umdName: 'MyUIButton'
    }
  ]
}
```

### `browsers`

List of browsers using the [browserslist format](https://github.com/ai/browserslist) that the target build must support.

```js
// sagui.config.js
module.exports = {
  browsers: [
    '> 1%',
    'last 2 versions',
    'IE 10'
  ]
}
```

If not provided, the above default will be used instead.

This information is used to decide:

- JavaScript language features to transpile;
- CSS prefixes to append.

Internally Sagui uses [babel-preset-env](https://github.com/babel/babel-preset-env) and [autoprefixer](https://github.com/postcss/autoprefixer).

### `style.cssModules`

By default, styles compiled with Sagui will be output as [CSS Modules](https://github.com/css-modules), meaning they won't be global.

It is possible to disable this behavior and have regular CSS styles:

```js
// sagui.config.js
module.exports = {
  style: {
    cssModules: false
  }
}
```

### `style.sourceMaps`

Source maps are never generated for styles, but it is possible to enable it.

```js
// sagui.config.js
module.exports = {
  style: {
    sourceMaps: true
  }
}
```

### `style.extract`

By default, when building **pages**, Sagui [extracts](https://github.com/webpack/extract-text-webpack-plugin) the CSS definitions into separated `.css` files. It is possible to disable this behavior and have the CSS inlined in the same JavaScript bundle.

```js
// sagui.config.js
module.exports = {
  style: {
    extract: false
  }
}
```

### `javaScript.transpileDependencies`

Dependencies **installed through npm** are not transpiled with Babel by default. If you have a dependency that needs to be transpiled it is very easy, just add its name to the list:

```js
// sagui.config.js
module.exports = {
  javaScript: {
    transpileDependencies: ['dependency-to-be-transpiled']
  }
}
```

### `javaScript.typeCheckAll`

By default, Flowtype ignores files that don't start with the `// @flow` comment line. If you want all your files to be statically type checked, you can enable that feature in the sagui config:

```js
// sagui.config.js
module.exports = {
  javaScript: {
    typeCheckAll: true
  }
}
```

### `develop.proxy`

Allow proxying requests to a separate, possible external, backend server.

```js
// sagui.config.js
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

## Escape hatches

If a build requirement can't be achieved via the previous configuration options, first [open an issue](https://github.com/saguijs/sagui/issues) so that we can add official support, and if you can't wait or is something very specific to your project, there is an **escape hatch** to allow extending the internal configurations.

**These options are for advanced users that are familiar with how Webpack and Karma work.**

### `disableLoaders`

Disable internal Sagui Webpack loaders in order to implement custom behavior via the `additionalWebpackConfig`.

```js
// sagui.config.js
module.exports = {
  disableLoaders: ['yaml']
}
```

Possible values:

- `font`
- `html`
- `image`
- `javaScript`
- `style`
- `txt`
- `video`
- `yaml`


### `additionalWebpackConfig`

Extend the internal Webpack configuration using [webpack-merge](https://github.com/survivejs/webpack-merge).

For example, It is possible to add additional Webpack plugins, like [git-revision-webpack-plugin](https://github.com/pirelenito/git-revision-webpack-plugin) by:

```js
// sagui.config.js
var GitRevisionPlugin = require('git-revision-webpack-plugin')

module.exports = {
  additionalWebpackConfig: {
    plugins: [
      new GitRevisionPlugin()
    ]
  }
}
```

For more information about configuring Webpack, check the [Webpack documentation](https://webpack.js.org/configuration/).

### `additionalKarmaConfig`

Extend the internal Karma configuration.

As an example, let's change the default browser used to execute the tests from *PhantomJS* to *Chrome*. In the `sagui.config.js` file:

```js
// sagui.config.js
module.exports = {
  additionalKarmaConfig: {
    browsers: ['Chrome']
  }
}
```

For more information about configuring Karma, check the [Karma documentation](https://karma-runner.github.io/1.0/config/configuration-file.html).

## Gotchas

### `Invalid Host header` - Accessing dev server from outside `localhost`

By default, Webpack disables access to the development server for hosts other than `localhost`, which means the development server will not be accessible from outside. If you want to give external access to the development server, you can set the `develop.disableHostCheck` to `true`:

```js
// sagui.config.js
module.exports = {
  develop: {
    disableHostCheck: true
  }
}
```

### React Router

For [`react-router`](https://github.com/ReactTraining/react-router) to work on the development server, an absolute static path for the output has to be configured on Webpack. You can do that by adding this configuration to `sagui.config.js`:

```js
// sagui.config.js
module.exports = {
  additionalWebpackConfig: {
    output: {
      publicPath: '/'
    }
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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsaguijs%2Fsagui.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsaguijs%2Fsagui?ref=badge_large)