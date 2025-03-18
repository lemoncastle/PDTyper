//global variables
let isAnimating1 = false;
let isAnimating2 = false;
let time1 = 0;
let time2 = 0;

let data;
const defaultPhrase = "the quick brown fox jumps over the lazy dog";
const phraseInput = document.getElementById('phrase-input');

async function readCSV(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    return text;
} readCSV('./data/time_of_day.csv').then(csvData => {
    data = csvData;
});

document.addEventListener('DOMContentLoaded', () => {
    generateKeyboard('keyboard-container-1');
    generateKeyboard('keyboard-container-2');

    document.getElementById('animate-button').addEventListener('click', () => {
        let phrase = phraseInput.value || defaultPhrase;
        phraseInput.disabled = true;

        animateKeyboard(phrase, 'keyboard-container-1',103,166); // old values 102,171
        animateKeyboard(phrase, 'keyboard-container-2',128,211); // old values 128,211    
    });
});

function scaleKeyboards() {
    const containers = document.querySelectorAll('.keyboard-container');
    const wrapper = document.querySelector('.keyboard-wrapper');

    // Calculate the total width of the keyboards
    const totalKeyboardWidth = containers.length * 1100; // Assuming each keyboard has a max width of 1085px

    // Calculate the scale factor based on the width of the wrapper
    const scaleFactor = Math.min(wrapper.clientWidth / totalKeyboardWidth, 1);

    // Adjust scale for keyboards
    containers.forEach(container => {
        container.style.transform = `scale(${scaleFactor})`;
    });

    // Dynamically adjust the gap based on screen width
    const baseGap = 1150; // Original gap value
    wrapper.style.gap = `${baseGap * scaleFactor}px`;
}

window.addEventListener('load', scaleKeyboards);
window.addEventListener('resize', scaleKeyboards);

// generate keyboard
function generateKeyboard(containerId) {
    const keys = [
        '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Delete',
        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\',
        'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Return',
        'LeftShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'RightShift',
        'LeftCtrl', 'Alt', 'Command', 'Space', 'Command', 'Alt', 'RightCtrl', 'Fn'
    ];

    const specialKeys = {
        'Delete': 'delete',
        'Tab': 'tab',
        'CapsLock': 'capslock',
        'Return': 'return',
        'LeftShift': 'leftshift',
        'RightShift': 'rightshift',
        'LeftCtrl': 'leftctrl',
        'RightCtrl': 'rightctrl',
        'Alt': 'alt',
        'Command': 'command',
        'Space': 'space',
        'Fn': 'fn',
        '\\': 'backslash'
    };

    const keyboardBase = document.createElement('div');
    keyboardBase.className = 'keyboard-base';

    keys.forEach(key => {
        const keyDiv = document.createElement('div');
        keyDiv.className = 'key';
        if (specialKeys[key]) {
            keyDiv.classList.add(specialKeys[key]);
        }
        // Replace text content for specific keys
        if (key === 'LeftShift' || key === 'RightShift') {
            keyDiv.textContent = 'Shift';
        } else if (key === 'LeftCtrl' || key === 'RightCtrl') {
            keyDiv.textContent = 'Ctrl';
        } else if (key === 'Space') {
            keyDiv.textContent = 'Space';
        } else {
            keyDiv.textContent = key;
        }
        keyboardBase.appendChild(keyDiv);
    });

    document.getElementById(containerId).appendChild(keyboardBase);
}

// animates keyboard
function animateKeyboard(phrase, containerId, holdTime, flightTime) {
    // if(phrase) {
    //     if(containerId === 'keyboard-container-1') {
    //         phrase = insertRandomTildes(phrase);
    //     }
    // }
    
    let isAnimating = containerId === 'keyboard-container-1' ? isAnimating1 : isAnimating2;
    if (isAnimating) return; // Prevent multiple animations
    if (containerId === 'keyboard-container-1') {
        isAnimating1 = true;
    } else {
        isAnimating2 = true;
    }

    let index = 0;
    let stopAnimation = false;
    const startTime = Date.now(); // Start time of the animation
    
    const outputElement1 = document.getElementById('kitten1');
    const outputElement2 = document.getElementById('kitten2');

    const progressBar1 = document.getElementById('progress-bar1');
    const progressBar2 = document.getElementById('progress-bar2');

    const timerElement1 = document.getElementById('timer1');
    const timerElement2 = document.getElementById('timer2');
    const difference = document.getElementById('difference');

    //clear elements
    if (containerId === 'keyboard-container-1') {
        outputElement1.textContent = '';
        progressBar1.style.width = '0%';
        timerElement1.textContent = '0 ms';
        difference.style.opacity = "0";
        difference.textContent = '+';
    } else {
        outputElement2.textContent = '';
        progressBar2.style.width = '0%';
        timerElement2.textContent = '0 ms';
        difference.style.opacity = "0";
        difference.textContent = '+';
    }

    function highlightNextKey() {
        if (index >= phrase.length || stopAnimation) {
            if (containerId === 'keyboard-container-1') {
                isAnimating1 = false;
                finished1 = true;
            } else {
                isAnimating2 = false;
                finished2 = true;
            } 
            // update difference when either finished
            if (!isAnimating1 || !isAnimating2) { updateDifference(); }

            return;
        }

        let key = phrase[index].toUpperCase();
        if (key === ' ') {
            key = 'Space';
        }else if (key === '~'){
            key = 'Delete';
        }

        const keyDivs = document.querySelectorAll(`#${containerId} .key`);
        keyDivs.forEach(keyDiv => {
            if (keyDiv.textContent === key) {
                keyDiv.classList.add('highlight');
                setTimeout(() => {
                    keyDiv.classList.remove('highlight');
                    setTimeout(highlightNextKey, flightTime);
                }, holdTime);
            }
        });
        if (containerId === 'keyboard-container-1') {
            if (key==='Delete') {
                outputElement1.innerHTML += `<span style="color: red;">~</span>`; // Show ` in red
            } else {
                outputElement1.innerHTML += phrase[index];
            }
            
            // outputElement1.textContent += phrase[index];
            outputElement1.style.color = '#454545';
            progressBar1.style.width = ((index + 1) / phrase.length) * 100 + '%'; // Update progress bar 1
            time1 = Date.now() - startTime;
            timerElement1.textContent = `${Date.now() - startTime} ms`; // Update timer 1
        } else {
            outputElement2.textContent += phrase[index];
            outputElement2.style.color = '#454545';
            progressBar2.style.width = ((index + 1) / phrase.length) * 100 + '%'; // Update progress bar 2
            time2 = Date.now() - startTime;
            timerElement2.textContent = `${Date.now() - startTime} ms`; // Update timer 2
        }

        if(progressBar1.style.width === '100%') {
            outputElement1.style.color = 'cornflowerblue';
        }
        if(progressBar2.style.width === '100%') {
            outputElement2.style.color = '#4CAF50';
            phraseInput.disabled = false;
        }
        index++;
    }
    highlightNextKey();

    // stop button
    document.getElementById('stop-button').addEventListener('click', () => {
        stopAnimation = true;
        if (containerId === 'keyboard-container-1') {
            isAnimating1 = false;
            outputElement1.style.color = 'gray';
        } else {
            isAnimating2 = false;
            outputElement2.style.color = 'gray';
            phraseInput.disabled = false;
        }
    });
}

function updateDifference() {
    const interval = setInterval(() => {
        difference.style.opacity = "1";
        difference.textContent = `+ ${Math.abs(time1 - time2)} ms`;
        difference.style.color = 'red';
        
        // Stop updating when both are finished
        if (!isAnimating1 && !isAnimating2) { clearInterval(interval); }
    }, 75); //update every 75ms
}

function insertRandomTildes(phrase) {
    if (phrase.length > 30) {
        let positions = new Set();
        while (positions.size < 2) {
            let randomIndex = Math.floor(Math.random() * phrase.length);
            positions.add(randomIndex);
        }

        let phraseArray = phrase.split('');
        positions.forEach(pos => phraseArray.splice(pos, 0, '~'));
        return phraseArray.join('');
    }

    if (phrase.length < 30) {
        let positions = new Set();
        while (positions.size < 1) {
            let randomIndex = Math.floor(Math.random() * phrase.length);
            positions.add(randomIndex);
        }

        let phraseArray = phrase.split('');
        positions.forEach(pos => phraseArray.splice(pos, 0, '~'));
        return phraseArray.join('');
    }
    return phrase;
}