function getLocation() {
  // Check if the browser supports geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      displayLocation(latitude, longitude);
    }, function (error) {
      console.error('Error getting location:', error);
      displayError('Error getting location. Please try again.');
    });
  } else {
    displayError('Geolocation is not supported by your browser.');
  }
}

function displayLocation(latitude, longitude) {
  const locationResult = document.getElementById('locationResult');
  locationResult.innerHTML = `
    <p>Latitude: ${latitude}</p>
    <p>Longitude: ${longitude}</p>
  `;
}

function displayError(message) {
  const locationResult = document.getElementById('locationResult');
  locationResult.innerHTML = `<p>${message}</p>`;
}
