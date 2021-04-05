/* global sinon */

import TestContainer from 'mocha-test-container-support';

import useSpinner from '..';

describe('#useSpinner', function() {

  let spinnerContainer;

  beforeEach(function() {
    spinnerContainer = document.createElement('div');

    const container = TestContainer.get(this);

    container.appendChild(spinnerContainer);
  });


  it('should wrap function', function() {

    // given
    const fn = sinon.spy();

    // when
    const spinned = useSpinner(fn);
    spinned();

    // then
    expect(fn).to.have.been.called;
  });


  it('should return value', async function() {

    // given
    const expected = 'foo';

    const fn = createAsyncFunction(1, expected);

    const spinned = useSpinner(fn);

    // when
    const result = await spinned();

    // then
    expect(result).to.equal(expected);
  });


  it('should render spinner in configured parent', function() {

    // given
    const fn = createAsyncFunction(1);

    const spinned = useSpinner(fn, {
      container: spinnerContainer
    });

    // when
    spinned();

    const spinnerElement = spinnerContainer.querySelector('.us-spinner');

    // then
    expect(spinnerElement).to.exist;
  });


  it('should render spinner in default', function() {

    // given
    const fn = createAsyncFunction(1);

    const spinned = useSpinner(fn);

    // when
    spinned();

    const spinnerElement = document.querySelector('body').querySelector('.us-spinner');

    // then
    expect(spinnerElement).to.exist;
  });


  it('should work with selector', function() {

    // given
    spinnerContainer.classList.add('foo');

    const fn = createAsyncFunction(1);

    const spinned = useSpinner(fn, {
      container: '.foo'
    });

    // when
    spinned();

    const spinnerElement = document.querySelector('.us-spinner');

    // then
    expect(spinnerElement).to.exist;
  });



  it('should render spinner in body', function() {

    // given
    const fn = createAsyncFunction(1);

    const spinned = useSpinner(fn, {
      container: 'body'
    });

    // when
    spinned();

    const spinnerElement = document.querySelector('body').querySelector('.us-spinner');

    // then
    expect(spinnerElement).to.exist;
  });


  it('should cleanup spinner', async function() {

    // given
    const fn = createAsyncFunction(1);

    const spinned = useSpinner(fn);

    // when
    await spinned();

    const spinnerElement = document.querySelector('.us-spinner');

    // then
    expect(spinnerElement).to.not.exist;
  });

});


// helpers ////////////////////

function createAsyncFunction(seconds, result) {
  return async function() {
    return new Promise(resolve => setTimeout(() => {
      resolve(result);
    }, seconds * 1000));
  };
}