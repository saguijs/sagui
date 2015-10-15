# Sagui

[![Build Status](https://travis-ci.org/pirelenito/sagui.svg)](https://travis-ci.org/pirelenito/sagui)
[![npm version](https://badge.fury.io/js/sagui.svg)](https://badge.fury.io/js/sagui)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Sagui is a modern approach on build infrastructure to front-end projects. It follows an opinionated **convention over configuration** approach, providing a solid foundation so that you can focus on writing your code.

- No more generators;
- No more boiletplate projects;
- No more starter kits;
- NPM and Node should be your only global dependencies.

Right off of the bat you get:

- JavaScript 2015 support through [Babel](http://babeljs.io/);
- Automated testing through [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/);
- Linting via [ESlint](http://eslint.org/) and [JavaScript Standard Style](http://standardjs.com/);
- Build and development environment provided by [webpack](http://webpack.github.io/);
- Hot module replacement with [React transform](https://github.com/gaearon/react-transform)

In simpler terms, it is your last `devDependency`.

**Note**: Still early in development, and might miss something that you want.

## Getting started

Create a new NPM project:

```bash
npm init -y .
```

Install **sagui** in the project:

```bash
npm install --save-dev sagui
```

After the install is completed, Sagui **bootstraps** its basic infrastructure:

```bash
$ tree
.
├── node_modules
│   └── sagui
├── package.json
└── src
    ├── index.html
    ├── index.js
    ├── index.scss
    └── index.spec.js
```

Start developing!

```bash
npm start
```

Run the tests!

```bash
num test
```

Sagui manages the [package.json](https://docs.npmjs.com/files/package.json) scripts for you, creating additional tasks such as:

- `npm run sagui:test`
- `npm run sagui:test-watch`
- `npm run sagui:develop`

Then you can start writing your code inside the `src/` folder.

## Background

It is an idea I had in mind for a while, and after seeing a similar approach internally at [Klarna](https://github.com/klarna) (in the form of a global tool), I've got inspired to build a simpler (and locally installed) version of my own.

The internals were based on:

- [gaearon/react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)
- [pirelenito/generator-react-webpack-component](https://github.com/pirelenito/generator-react-webpack-component)

## Version 1.x.x

The first version of this project was supposed to be a project bootstrap, you can still check its original implementation at the [1.x.x branch](https://github.com/pirelenito/sagui/tree/1.x.x).
