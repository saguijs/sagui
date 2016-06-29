import { expect } from 'chai'
import splitArchetypes from './split-archetypes'

describe('splitArchetypes', () => {
  it('should return a single configuration for all pages', () => {
    const config = {
      pages: ['index', 'demo']
    }

    expect(splitArchetypes(config)).to.eql([
      { pages: ['index', 'demo'] }
    ])
  })

  it('should return a different configuration for each library', () => {
    const config = {
      libraries: ['index', 'demo']
    }

    expect(splitArchetypes(config)).to.eql([
      { library: 'index' },
      { library: 'demo' }
    ])
  })

  it('should mix both archetypes', () => {
    const config = {
      pages: ['index', 'demo'],
      libraries: ['index', 'demo']
    }

    expect(splitArchetypes(config)).to.eql([
      { pages: ['index', 'demo'] },
      { library: 'index' },
      { library: 'demo' }
    ])
  })
})
