import toSlugCase from 'to-slug-case'

export default {
  name: 'webpack-library',
  configure ({ library }) {
    if (!library) { return {} }

    return {
      entry: './src/index.js',
      output: {
        filename: `${toSlugCase(library)}.js`,
        libraryTarget: 'commonjs2',
        library
      }
    }
  }
}
