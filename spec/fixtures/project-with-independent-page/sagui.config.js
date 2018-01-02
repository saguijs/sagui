module.exports = {
  pages: ['index', 'about', { name: 'demo', independent: true }],
  chunks: {
    vendor: true,
    common: true,
  }
}
