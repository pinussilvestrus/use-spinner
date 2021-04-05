const _addSpinner = (parent) => {
  const spinnerContainer = document.createElement('div');
  spinnerContainer.classList.add('us-container');

  const spinnerElement = document.createElement('div');
  spinnerElement.classList.add('us-spinner');

  spinnerContainer.appendChild(spinnerElement);

  parent.appendChild(spinnerContainer);

  return spinnerContainer;
};

const _cleanupSpinner = (parent, element) => {
  parent.removeChild(element);
};


// API ///////////////////////

/**
 * Wraps defined (async) function to a new one adding a loading spinner while executing.
 *
 * @param {Function} fn - handler
 * @param {String|DOMElement} [options.container] - selector or parent container
 *
 * @returns {Promise<Function>}
 */
const useSpinner = (fn, options = {}) => {

  let {
    container
  } = options;

  if (!container) {
    container = 'body';
  }

  if (typeof container === 'string') {
    container = document.querySelector(container);
  }

  return async (...args) => {

    // (1) add loading spinner to DOM
    const spinner = _addSpinner(container);

    // (2) execute registered function
    const result = await fn(...args);

    // (3) cleanup spinner
    _cleanupSpinner(container, spinner);

    // (4) return + finish
    return result;
  };
};

export default useSpinner;