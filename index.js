const _addSpinner = (container) => {
  const parent = document.querySelector(container);

  const spinnerContainer = document.createElement('div');
  spinnerContainer.classList.add('us-container');

  const spinnerElement = document.createElement('div');
  spinnerElement.classList.add('us-spinner');

  spinnerContainer.appendChild(spinnerElement);

  parent.appendChild(spinnerContainer);

  return spinnerContainer;
};

const _cleanupSpinner = (element) => {
  const body = document.querySelector('body');
  body.removeChild(element);
};


// API ///////////////////////

const useSpinner = (fn, options = {}) => {

  let {
    container
  } = options;

  if (!container) {
    container = 'body';
  }

  return async (...args) => {

    // (1) add loading spinner to DOM
    const spinner = _addSpinner(container);

    // (2) execute registered function
    const result = await fn(...args);

    // (3) cleanup spinner
    _cleanupSpinner(spinner);

    // (4) return + finish
    return result;
  };
};

export default useSpinner;