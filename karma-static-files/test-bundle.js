const testsContext = require.context('../../../src', true, /\.spec\..+$/)
testsContext.keys().forEach(testsContext)
