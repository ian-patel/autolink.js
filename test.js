const autoLink = require('./')

describe('main', () => {
  it('replace only url', done => {
    const string = 'http://github.com/egoist, image http://twitter.com/shomin_sample.jpg no'
    const result = '<a href="http://github.com/egoist">http://github.com/egoist</a>, image <a href="http://twitter.com/shomin_sample.jpg">http://twitter.com/shomin_sample.jpg</a> no'
    autoLink(string, {image: false}).should.equal(result)
    done()
  })
  it('replace url and image', done => {
    const string = 'url http://github.com/egoist ok, image http://twitter.com/shomin_sample.jpg'
    const result = 'url <a href="http://github.com/egoist">http://github.com/egoist</a> ok, image <img src="http://twitter.com/shomin_sample.jpg"/>'
    autoLink(string).should.equal(result)
    done()
  })
  it('makes attrs for image', done => {
    const string = 'url http://github.com/egoist ok, image http://twitter.com/shomin_sample.jpg too'
    autoLink(string, {imageAttr: {'data-lazy': true, 'pattern': '[a-zA-Z0-9]'}})
      .should
      .equal('url <a href="http://github.com/egoist">http://github.com/egoist</a> ok, image <img src="http://twitter.com/shomin_sample.jpg" data-lazy="true" pattern="[a-zA-Z0-9]"/> too')
    done()
  })
  it('makes attrs for url', done => {
    const string = 'url http://github.com/egoist ok, image http://twitter.com/shomin_sample.jpg too'
    autoLink(string, {linkAttr: {'data-lazy': true, 'pattern': '[a-zA-Z0-9]'}})
      .should
      .equal('url <a href="http://github.com/egoist" data-lazy="true" pattern="[a-zA-Z0-9]">http://github.com/egoist</a> ok, image <img src="http://twitter.com/shomin_sample.jpg"/> too')
    done()
  })
  it('makes attrs for both', done => {
    const string = 'url http://github.com/egoist ok, image http://twitter.com/shomin_sample.jpg too'
    autoLink(string, {linkAttr: {'data-lazy': true, 'pattern': '[a-zA-Z0-9]'}, imageAttr: {'data-image': true}, sharedAttr: {'data-common': true}})
      .should
      .equal('url <a href="http://github.com/egoist" data-common="true" data-lazy="true" pattern="[a-zA-Z0-9]">http://github.com/egoist</a> ok, image <img src="http://twitter.com/shomin_sample.jpg" data-common="true" data-image="true"/> too')
    done()
  })
})
