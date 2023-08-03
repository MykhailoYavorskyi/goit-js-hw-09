const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', onStart);

function onStart() {
  refs.body.style.backgroundColor = getRandomHexColor();
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  const id = setInterval(
    () => (refs.body.style.backgroundColor = getRandomHexColor()),
    1000
  );

  refs.stopBtn.addEventListener('click', onStop);
  function onStop() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(id);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
