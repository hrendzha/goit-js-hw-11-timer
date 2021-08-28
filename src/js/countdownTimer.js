import refs from '../js/refs.js';
import timerDataTemplate from '../templates/timerData.hbs';
import timerWrapperTemplate from '../templates/timerWrapper.hbs';

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.intervalId = null;
        this.timerDataTemplate = timerDataTemplate;
        this.timerWrapperTemplate = timerWrapperTemplate;
        this.selector = selector;
        this.targetDate = targetDate;
        this.currentTime = 0;
    }

    start() {
        const timerDataRef = this.createTimerWrapperRef();

        this.intervalId = setInterval(() => {
            this.currentTime = Date.now();

            this.finishCountdown();

            this.refreshTimerInterface(timerDataRef);
        }, 1000);
    }

    finishCountdown() {
        const { days, hours, mins, secs } = this.getTimeComponents(
            this.currentTime,
            this.targetDate,
        );

        if (Number(days) === 0 && Number(hours) === 0 && Number(mins) === 0 && Number(secs) === 0) {
            clearInterval(this.intervalId);
        }
    }

    getTimeComponents(currentTime, targetDate) {
        return {
            days: this.pad(Math.floor((targetDate - currentTime) / (1000 * 60 * 60 * 24))),
            hours: this.pad(
                Math.floor(((targetDate - currentTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            ),
            mins: this.pad(
                Math.floor(((targetDate - currentTime) % (1000 * 60 * 60)) / (1000 * 60)),
            ),
            secs: this.pad(Math.floor(((targetDate - currentTime) % (1000 * 60)) / 1000)),
        };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    createTimerWrapperRef() {
        const markup = this.timerWrapperTemplate({
            name: this.selector,
        });

        refs.main.insertAdjacentHTML('beforeend', markup);

        const timerWrapperRef = document.getElementById(this.selector);
        const timerDataRef = timerWrapperRef.querySelector('.timer__data');

        return timerDataRef;
    }

    refreshTimerInterface(ref) {
        ref.innerHTML = this.timerDataTemplate(
            this.getTimeComponents(this.currentTime, this.targetDate),
        );
    }
}

export default CountdownTimer;
