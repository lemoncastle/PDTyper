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
function animateKeyboard(data, containerId) {
    let index = 0;

    function highlightNextKey() {
        if (index >= data.length) return;

        const row = data[index];
        const key = row['time of day'];
        const holdTime = +row['hold_time'];
        const flightTime = +row['flight_time'];

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

    d3.csv('time_of_day.csv').then(data => {
        document.getElementById('animate-button').addEventListener('click', () => {
            const selectedTimeOfDay = document.getElementById('time-of-day-select').value;
            const filteredDataFalse = data.filter(row => row['time of day'] === selectedTimeOfDay && row['Parkinsons'] === 'False');
            const filteredDataTrue = data.filter(row => row['time of day'] === selectedTimeOfDay && row['Parkinsons'] === 'True');
            console.log(filteredDataFalse);
            console.log(filteredDataTrue);
            animateKeyboard(filteredDataFalse, 'keyboard-container-1');
            animateKeyboard(filteredDataTrue, 'keyboard-container-2');
        });
    });
});