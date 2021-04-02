import useSpinner from '..';

const fn = async () => {
  await new Promise(resolve => setTimeout(() => {
    console.log('done.');
    resolve();
  }, 2000));
};

const spinnedFn = useSpinner(fn);

const btn = document.querySelector('.btn-exec');

btn.addEventListener('click', async (event) => {
  await spinnedFn();
});