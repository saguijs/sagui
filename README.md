# Sagui

Your last `devDependency`.

The idea behing it is pretty simple:

- No more generators;
- No more boiletplate projects;
- No more starter kits!

**This is still a prototype.**

## Getting started

Create a new NPM project:

```bash
npm init -y .
```

Install **sagui** in the project:

```bash
npm install --save-dev sagui
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

## What you get

- Build system;
- Development environment with live-reloading and hot-module-replacement;
- Linting and testing.

## Tech

It is build on top of:

- [webpack](http://webpack.github.io/);
- [babel](http://babeljs.io/);
- [standard](http://standardjs.com/).

## Background

It is an idea I had in mind for a while, and after seeing a similar approach internaly at [Klarna](https://github.com/klarna), I've decided to build a simpler version of my own.

The internals were based on:

- https://github.com/gaearon/react-transform-boilerplate
- https://github.com/pirelenito/generator-react-webpack-component
