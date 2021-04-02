const useSpinner = (fn) => {
  return async (...args) => {

    // (1) add loading spinner to DOM
    const spinner = _addSpinner();

    // (2) execute registered function
    const result = await fn(...args);

    // (3) cleanup spinner
    _cleanupSpinner(spinner);

    // (4) return + finish
    return result;
  };
};

export default useSpinner;

const _addSpinner = () => {
  const body = document.querySelector('body');

  const spinnerElement = document.createElement('div');
  spinnerElement.classList.add('us-spinner');

  body.appendChild(spinnerElement);

  return spinnerElement;
};

const _cleanupSpinner = (element) => {
  const body = document.querySelector('body');
  body.removeChild(element);
};