//global variables
let isAnimating1 = false;
let isAnimating2 = false;
let data;
const phrase = "the quick brown fox jumps over the lazy dog";

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
        animateKeyboard(phrase, 'keyboard-container-1',100,100);
        animateKeyboard(phrase, 'keyboard-container-2',100,159);
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
    const baseGap = 1100; // Original gap value
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
        keyDiv.addEventListener('click', () => {
            keyDiv.classList.toggle('highlight');
        });
        keyboardBase.appendChild(keyDiv);
    });

    document.getElementById(containerId).appendChild(keyboardBase);
}

// animates keyboard
function animateKeyboard(phrase, containerId, holdTime, flightTime) {
    let isAnimating = containerId === 'keyboard-container-1' ? isAnimating1 : isAnimating2;
    if (isAnimating) return; // Prevent multiple animations
    if (containerId === 'keyboard-container-1') {
        isAnimating1 = true;
    } else {
        isAnimating2 = true;
    }

    let index = 0;
    let stopAnimation = false;
    
    const outputElement1 = document.getElementById('kitten1');
    const outputElement2 = document.getElementById('kitten2');

    const progressBar1 = document.getElementById('progress-bar1');
    const progressBar2 = document.getElementById('progress-bar2');

    //clear elements
    if (containerId === 'keyboard-container-1') {
        outputElement1.textContent = '';
        progressBar1.style.width = '0%';
    } else {
        outputElement2.textContent = '';
        progressBar2.style.width = '0%';
    }

    function highlightNextKey() {
        if (index >= phrase.length || stopAnimation) {
            if (containerId === 'keyboard-container-1') {
                isAnimating1 = false;
            } else {
                isAnimating2 = false;
            }
            return;
        }

        let key = phrase[index].toUpperCase();
        if (key === ' ') {
            key = 'Space';
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
            outputElement1.textContent += phrase[index];
            progressBar1.style.width = ((index + 1) / phrase.length) * 100 + '%'; // Update progress bar 1
        } else {
            outputElement2.textContent += phrase[index];
            progressBar2.style.width = ((index + 1) / phrase.length) * 100 + '%'; // Update progress bar 2
        }
        index++;
    }

    highlightNextKey();

    // stop button
    document.getElementById('stop-button').addEventListener('click', () => {
        stopAnimation = true;
        if (containerId === 'keyboard-container-1') {
            isAnimating1 = false;
        } else {
            isAnimating2 = false;
        }
    });
}