const captureVideoButton =
  document.querySelector('#screenshot .capture-button');
const screenshotButton = document.querySelector('#screenshot-button');
const img = document.querySelector('#screenshot img');
const video = document.querySelector('#screenshot video');
const enumerateMediaButton = document.querySelector('#screenshot .check-media')
const canvas = document.createElement('canvas');

const constraints = {
  video: {
    // facingMode: {exact: "user"}, // options are ["environment", "user", "left", "right"]
    width: {min: 100}, height: {min: 200} //Set either dimension to higher than 2000 to see dimension errors
  }
};

const otherConstraints = {
  video: {
    facingMode: {exact: "environment"}, // options are ["environment", "user", "left", "right"]
    width: {min: 100}, height: {min: 100} //Set either dimension to higher than 2000 to see dimension errors
  }
};

function noCameraException(message) {
 return {message, name: 'device id empty'}
}

enumerateMediaButton.onclick = async () => {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(async (stream) => {
      devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter(device => device.kind === 'videoinput')
      // cameras.forEach(camera => console.log(camera.toJSON()))
      document.getElementById('errorSpan').innerHTML = `Camera Count: ${cameras.length}`
  })
  .catch((e) => handleError(e))
}

captureVideoButton.onclick = () => {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => handleSuccess())
    .catch((e) => handleError(e))
}

// const handleSecondCamera = () => {
//   console.log('we were here')
//    navigator.mediaDevices.getUserMedia(otherConstraints)
//     .then((stream) => handleSuccess(stream))
//     .catch((e) => handleError(e))
// }

screenshotButton.onclick = video.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('image/webp');
};

const handleSuccess = (stream) => {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}

const handleError = (e) => {
  console.log(e)
  let errorContainer = document.getElementById('errorSpan')
  switch(e.constraint) {      
    case "facingMode":
      errorContainer.innerHTML = 'Only rear cameras are supported'
      break;
    case "width":
    case "height":
      errorContainer.innerHTML = 'The resolution of your camera is too low'
      break;
    default: 
      errorContainer.innerHTML = 'An unknown error has occured'
  }
}

