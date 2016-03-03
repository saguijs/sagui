### Master

There were two small breaking changes, making this upgrade very simple:

- The plugin `webpack-pages` was renamed to `webpack-archetype-pages`;
- We changed the way webpack configurations are merged, now loaders are merged toghether if their test name matches.

Changes:

- [#36](https://github.com/pirelenito/sagui/pull/36) Add support to Library projects;
- [#35](https://github.com/pirelenito/sagui/pull/35) Use webpack-merge smart feature to allow modifying an existing loader.

### v3.2.0 (2016-03-03)

- [#47](https://github.com/pirelenito/sagui/pull/47) Bootstrap gitignore file
- [#49](https://github.com/pirelenito/sagui/pull/49) Resolve .jsx modules by default

### v3.0.0 (2016-02-21)

Allow extensibility and customization of webpack and karma configurations.

#### Deprecated

Project specific configuration has moved from `package.json` to `sagui.config.js`.

#### Major changes:

- [#16](https://github.com/pirelenito/sagui/issues/16) Allow extensibility of webpack configuration
- [#23](https://github.com/pirelenito/sagui/pull/23) Add support for CSS Modules #23

### v2.6.0 (2015-12-12)

In this release we finaly are able to build and distribute our projects!

- [#3](https://github.com/pirelenito/sagui/issues/3) Implement build action to generate the compiled assets
- [#4](https://github.com/pirelenito/sagui/issues/4) Implement dist action to generate optimized assets ready for distribution
