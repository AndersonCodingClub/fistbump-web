const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const discardButton = document.getElementById('discardButton');
const saveButton = document.getElementById('saveButton');
const imageElement = document.getElementById('picture');
let stream;
let image;
let imageSavable = false;

discardButton.style.backgroundColor = "rgb(204, 204, 204)";
discardButton.style.cursor = "default";
saveButton.style.backgroundColor = "rgb(204, 204, 204)";
saveButton.style.cursor = "default";

// Access the user's camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((mediaStream) => {
        video.srcObject = mediaStream;
        stream = mediaStream;
    })
    .catch((error) => {
        console.error('Error accessing camera:', error);
    });


video.style.transform = "scaleX(-1)";
canvas.style.transform = "scaleX(-1)";

// Capture button click event
function takePhoto() {
    // Draw the current frame on the canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    image = canvas.toDataURL();
    imageSavable = true;
    discardButton.style.backgroundColor = "rgb(229, 156, 154)";
    discardButton.style.cursor = "pointer";
    saveButton.style.backgroundColor = "rgb(188, 180, 247)";
    saveButton.style.cursor = "pointer";
}

function saveImage() {
    if (imageSavable) {
        fetch('/capture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "dataURL": image })
        });
        saveButton.style.backgroundColor = "rgb(180, 247, 209)";

        setTimeout(() => {window.location.href = '/'}, 1000);
    }
}

function discardImage() {
    canvas.getContext('2d').clearRect(0, 0, canvas. width, canvas. height);
    imageSavable = false;

    discardButton.style.backgroundColor = "rgb(204, 204, 204)";
    saveButton.style.backgroundColor = "rgb(204, 204, 204)";
}