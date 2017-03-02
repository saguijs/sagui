import { expect } from 'chai'
import mergeKarma from './merge-karma'

describe('mergeKarma', function () {
  it('should merge the reporters', () => {
    const configA = {
      reporters: ['mocha']
    }

    const configB = {
      reporters: ['junit']
    }

    const mergedConfig = mergeKarma(configA, configB)

    expect(mergedConfig).to.eql({ reporters: ['mocha', 'junit'] })
  })

  it('should not duplicate reporters', () => {
    const configA = {
      reporters: ['mocha']
    }

    const configB = {
      reporters: ['mocha']
    }

    const mergedConfig = mergeKarma(configA, configB)

    expect(mergedConfig).to.eql({ reporters: ['mocha'] })
  })
})
