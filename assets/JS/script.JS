function getLocation() {
  const imgResult = document.querySelector('.imgResult');
  const apiUrl = 'https://dog.ceo/api/breeds/image/random';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      imgResult.src = data.message;
    })
    .catch(error => {
      console.error('Error fetching dog image:', error);
    });
}