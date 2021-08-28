import refs from './js/refs.js';
import CountdownTimer from './js/countdownTimer';

const TIME_ZONE = 10800000;

refs.timerDataForm.addEventListener('submit', onTimerDataFormSubmit);

function onTimerDataFormSubmit(e) {
    e.preventDefault();

    const timerName = refs.timerDataFormName.value;
    const targetDate = new Date(refs.timerDataFormDatetime.valueAsNumber) - TIME_ZONE;

    if (document.getElementById(timerName)) {
        alert('Choose another timer name');
        return;
    }
    new CountdownTimer({
        selector: timerName,
        targetDate,
    }).start();
}
