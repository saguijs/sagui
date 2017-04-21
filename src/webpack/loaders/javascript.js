import { HotModuleReplacementPlugin } from 'webpack'
import HappyPack from 'happypack'
import path from 'path'
import reactTransform from 'babel-plugin-react-transform'
import istanbul from 'babel-plugin-istanbul'
import fileExtensions from '../../file-extensions'
import actions from '../../actions'

export default {
  name: 'javaScript',
  configure ({ action, projectPath, javaScript = {}, coverage }) {
    const userPaths = (javaScript.transpileDependencies || []).map((dependency) => (
      path.join(projectPath, 'node_modules', dependency)
    ))

    // Enable caching and parallel builds
    const happypack = new HappyPack({
      id: 'babel',
      verbose: false,
      tempDir: '.sagui/.happypack',
      cachePath: '.sagui/.happypack/cache--[id].json',
      loaders: [{
        path: 'babel',
        query: {
          babelrc: false,
          presets: ['sagui'],
          plugins: babelPlugins(action, coverage),
          // enabling compact breaks source maps
          compact: false
        }
      }]
    })

    return {
      plugins: action === actions.DEVELOP
        ? [happypack, new HotModuleReplacementPlugin()]
        : [happypack],

      resolve: {
        extensions: fileExtensions.list.JAVASCRIPT
      },

      module: {
        loaders: [
          {
            test: fileExtensions.test.JAVASCRIPT,
            include: [
              path.join(projectPath, 'src'),
              ...userPaths
            ],
            loaders: [ 'happypack/loader?id=babel' ]
          }
        ]
      }
    }
  }
}

const babelPlugins = (action, coverage) => {
  if (action === actions.DEVELOP) {
    return [
      [reactTransform, {
        transforms: [{
          transform: 'react-transform-hmr',
          imports: ['react'],
          locals: ['module']
        }]
      }]
    ]
  }

  if (action === actions.TEST_UNIT && coverage) {
    return [
      [istanbul, {
        exclude: [
          '**/*.spec.*',
          '**/node_modules/**/*'
        ]
      }]
    ]
  }

  return []
}
