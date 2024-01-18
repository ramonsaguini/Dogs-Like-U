function getCatBreed() {
  const imgResult = document.querySelector('.imgResult');
  const apiKey = 'live_OYYRpXZf5kdIf5ICz2ivykRKNQV9zAfW2nAYCyxNl9bkLU1Wb2Sw0U6pUyqLASgP'

  const apiUrl = `https://api.thedogapi.com/v1/images/search?limit=10&api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      imgResult.src = data[0].url;
      imgResult.style.width = '300px';
      imgResult.style.height = '250px'

    })
    .catch(error => {
      console.error('Error fetching dog image:', error);
    });
}