# Sagui

Sagui is my attempt in gathering the best practices I've been applying in developing Single Page Applications. It provides a foundation of base build support to create complex web applications.

It comes loaded with **RequireJS**, **Jasmine**, **Bower** and **SCSS** (libsass).

It does make the assumption that you are building a Single Page Application, so you will only find single `index.html` and `index.scss` files.

It expects that Node, Grunt and Bower are installed in the machine.

## Managing front-end dependencies

The front-end dependencies are managed via bower, making it really easy to install and track the project's dependencies.

To install [Bourbon](http://bourbon.io) for example, which is a great SCSS mixing library, you can do:

```
$ bower install --save bourbon
```

But to begin using bourbon in the application, you must first tell it how to find it.

Open up the `config/scss_config.json` file and add the root path of where the stylesheets are located. In the Bourbon example it would be:

```
{
  "includePaths": [
    "bower_components/bourbon/app/assets/stylesheets"
  ]
}
```

For JavaScript libraries, like [jQuery](http://jquery.com), you can start with the same bower command:

```
$ bower install --save query
```

And latter, as we are using RequireJS, we must tell the application how to load jQuery.

Under the `config` folder there is another file called `require_config.js`. It is used to define [RequireJS configuration parameters](http://requirejs.org/docs/api.html#config). 

Although it is a little different from a vanilla RequireJS configuration file, its complexity is to allow its load in the most diverse scenarios, like during a test execution by the [Karma Runner](http://karma-runner.github.io), during build time and during application execution in the browser.

To add the new jQuery dependency, simply add a new path entry pointing to the locating of the `jquery.js` file.

```
/**
  Actual RequireJS config.
  You need only to perform changes here.
 */
var config = {
  baseUrl: 'app',
  paths: {
    'jquery': '../bower_components/jquery/jquery'
  }
};
```

Since jquery is an AMD module, there is nothing left to configure, but if you are loading another library which doesn't have AMD support you will also need to add a [shim configuration](http://requirejs.org/docs/api.html#config-shim).

If jquery didn't come with AMD support, we would also need to add the shim entry for it:

```
/**
  Actual RequireJS config.
  You need only to perform changes here.
 */
var config = {
  baseUrl: 'app',
  paths: {
    'jquery': '../bower_components/jquery/jquery'
  },
  shims: {
  	exports: 'jquery'
  }
};
```

## Development task

To start development in your shiny new application start up the grunt **dev** task.

```
$ grunt dev
```

It will start up a server with live-reload at [http://0.0.0.0:8000/](http://0.0.0.0:8000/). So once the [live-reload pluggin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) is installed, any change in the code base will be automatically reflected in the browser.


## Build

Build will run the [RequireJS optimiser](http://requirejs.org/docs/optimization.html) and compile all the SCSS files. Execute it by:

```
$ grunt build
```

## SCSS Bower dependencies support

Althogh SCSS does not support importing regular CSS files at the time, the support of loading Bower components CSS dependencies was implemented via a custom grunt task that copies all CSS files under the `bower_components` directory to SCSS extension.

It works transparently during build and dev tasks. For more information on the actual implementation, take a look at the commit 6f7a352836f06c64d2973e8e10807a08ac368eaf.

## Author

Paulo Ragonha