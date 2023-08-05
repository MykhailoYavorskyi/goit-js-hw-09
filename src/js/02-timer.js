// Описаний в документації
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.dir(selectedDates[0]);
  },
};

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

flatpickr(refs.inputDate, options);

refs.startBtn.disabled = true;
refs.inputDate.addEventListener('input', onInput);

function onInput() {
  const milliseconds = refs.inputDate._flatpickr.latestSelectedDateObj - new Date();
  if (milliseconds < 0) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  refs.startBtn.disabled = false;
}
refs.startBtn.addEventListener('click', onSetDate);

function onSetDate() {
  const id = setInterval(() => {
    const milliseconds = refs.inputDate._flatpickr.latestSelectedDateObj - new Date();
    if (milliseconds < 999) {
      clearInterval(id);
    }
    refs.days.textContent = addLeadingZero(convertMs(milliseconds).days);
    refs.hours.textContent = addLeadingZero(convertMs(milliseconds).hours);
    refs.minutes.textContent = addLeadingZero(convertMs(milliseconds).minutes);
    refs.seconds.textContent = addLeadingZero(convertMs(milliseconds).seconds);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
