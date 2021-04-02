import useSpinner from '..';

import '../assets/use-spinner.css';

const fn = async () => {
  await new Promise(resolve => setTimeout(() => {
    console.log('done.');
    resolve();
  }, 2000));
};

const spinnedFn = useSpinner(fn, {
  container: 'body'
});

const btn = document.querySelector('.btn-exec');

btn.addEventListener('click', async (event) => {
  await spinnedFn();
});