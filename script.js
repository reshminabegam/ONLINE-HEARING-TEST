// Initialize Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Oscillator and Gain Nodes
let oscillator = null;
let gainNode = audioContext.createGain();
let panNode = audioContext.createStereoPanner();

// Default Values
let frequency = 440; // Default frequency in Hz
let volume = 0.5;    // Default volume (50%)
let waveform = "sine"; // Default waveform
let isPlaying = false;

// Chain Connections
gainNode.connect(panNode);
panNode.connect(audioContext.destination);

// Function to Update Volume
function updateVolume(value) {
    volume = value;
    gainNode.gain.value = volume;
    document.querySelector(".volume-value").innerText = `${Math.round(volume * 100)}%`;
}

// Function to Update Frequency
function updateFrequency(value) {
    frequency = value;
    if (oscillator) {
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    }
    document.getElementById("Frequency_Input").value = frequency;
    document.getElementById("Frequency_Slider").value = frequency;
}

// Function to Update Waveform
function updateWaveform(type) {
    waveform = type;
    if (oscillator) {
        oscillator.type = waveform;
    }
}

// Function to Update Stereo Pan
function updatePan(value) {
    panNode.pan.value = value;
    document.querySelector(".panning-value").innerText = value;
}

// Event Listeners
document.querySelector(".volume-control").addEventListener("input", function () {
    updateVolume(this.value);
});

document.getElementById("Frequency_Slider").addEventListener("input", function () {
    updateFrequency(this.value);
});

document.getElementById("Frequency_Input").addEventListener("change", function () {
    updateFrequency(this.value);
});

document.querySelectorAll('input[name="waveformRadioButton"]').forEach((radio) => {
    radio.addEventListener("click", function () {
        updateWaveform(this.value);
    });
});

document.querySelector(".panning-control").addEventListener("input", function () {
    updatePan(this.value);
});

// Play and Stop Functions
function Play_Button() {
    if (!isPlaying) {
        oscillator = audioContext.createOscillator();
        oscillator.type = waveform;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        // Connect Oscillator to Gain Node
        oscillator.connect(gainNode);
        oscillator.start();

        isPlaying = true;
    }
}

function Stop_Button() {
    if (isPlaying) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;

        isPlaying = false;
    }
}

// Stereo Speaker Functions
function LeftSpeaker() {
    updatePan(-1); // Full left
}

function RightSpeaker() {
    updatePan(1); // Full right
}

function CenterAudio() {
    updatePan(0); // Centered
}
