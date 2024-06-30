let [millisec, sec, min, hrs] = [0, 0, 0, 0];
let displayTime = document.getElementById("timerText");
let timer = null;

function stopWatch() {
    millisec += 10;
    if (millisec === 1000) {
        millisec = 0;
        sec++;
        if (sec === 60) {
            sec = 0;
            min++;
            if (min === 60) {
                min = 0;
                hrs++;
            }
        }
    }

    let h = hrs < 10 ? "0" + hrs : hrs;
    let m = min < 10 ? "0" + min : min;
    let s = sec < 10 ? "0" + sec : sec;
    let ms = millisec < 10 ? "00" + millisec : millisec < 100 ? "0" + millisec : millisec;

    displayTime.innerHTML = h + ":" + m + ":" + s + "." + ms;
}

function startTimer() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopWatch, 10);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    [millisec, sec, min, hrs] = [0, 0, 0, 0];
    displayTime.innerHTML = "00:00:00:000";
}
