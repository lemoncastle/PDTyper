// Function to read CSV file
async function readCSV(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    return text;
}

// Read the CSV file and store it in a variable called data
let data;
readCSV('time_of_day.csv').then(csvData => {
    data = csvData;
    console.log(data); // Log the data to the console for verification
});

// Function to generate the keyboard
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

// Function to animate the keyboard
function animateKeyboard(phrase, containerId) {
    let index = 0;

    function highlightNextKey() {
        if (index >= phrase.length) return;

        let key = phrase[index].toUpperCase();
        if (key === ' ') {
            key = 'Space';
        }
        const holdTime = 500; // Example hold time in milliseconds
        const flightTime = 200; // Example flight time in milliseconds

        console.log(`Animating key: ${key} with hold time: ${holdTime}ms and flight time: ${flightTime}ms`);

        const keyDivs = document.querySelectorAll(`#${containerId} .key`);
        keyDivs.forEach(keyDiv => {
            if (keyDiv.textContent === key) {
                console.log(`Highlighting key: ${key} in container: ${containerId}`);
                keyDiv.classList.add('highlight');
                setTimeout(() => {
                    keyDiv.classList.remove('highlight');
                    setTimeout(highlightNextKey, flightTime);
                }, holdTime);
            }
        });

        index++;
    }

    highlightNextKey();
}

document.addEventListener('DOMContentLoaded', () => {
    generateKeyboard('keyboard-container-1');
    generateKeyboard('keyboard-container-2');

    const phrase = "the quick brown fox jumps over the lazy dog";

    document.getElementById('animate-button').addEventListener('click', () => {
        animateKeyboard(phrase, 'keyboard-container-1');
        animateKeyboard(phrase, 'keyboard-container-2');
    });
});