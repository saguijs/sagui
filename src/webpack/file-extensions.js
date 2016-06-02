const fileExtensions = {
  CSS: /\.css$/,
  EOT: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
  IMAGE: /\.(png|jpg|jpeg|gif|svg)$/,
  JAVASCRIPT: /\.(jsx?|es6)$/,
  JAVASCRIPT_SPEC: (absPath) => absPath.match(fileExtensions.JAVASCRIPT) && !absPath.match(/\.spec/),
  JSON: /\.(json)$/,
  SCSS: /\.scss$/,
  TTF: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
  VIDEO: /\.(ogg|mp4)$/,
  WOFF2: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
  WOFF: /\.woff(\?v=\d+\.\d+\.\d+)?$/
}

export default fileExtensions
