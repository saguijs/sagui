/**
 * Sagui test bundler that finds all test files in a project
 * for Karma to run them.
 */
const testsContext = require.context('../../../src', true, /\.spec\..+$/)
testsContext.keys().forEach(testsContext)
