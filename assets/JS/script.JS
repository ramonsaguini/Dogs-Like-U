function getDog() {
  const imgResult = document.querySelector('.imgResult');
  const videoResult = document.querySelector('.videoResult');
  const apiKeyDog = 'live_OYYRpXZf5kdIf5ICz2ivykRKNQV9zAfW2nAYCyxNl9bkLU1Wb2Sw0U6pUyqLASgP';
  const apiKeyYoutube = 'AIzaSyASeziY62j7oLZgUeVw0z0avF7p2GCr1rM';
  const apiUrlDog = `https://api.thedogapi.com/v1/images/search?limit=10&api_key=${apiKeyDog}`;

  fetch(apiUrlDog)
    .then(response => response.json())
    .then(data => {

      const dogName = extractDogName(data[0].breeds);
      imgResult.src = data[0].url;
      imgResult.style.width = '300px';
      imgResult.style.height = '250px';

      const apiUrlYoutube = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${dogName}dog&maxResults=1&key=${apiKeyYoutube}`;

      return fetch(apiUrlYoutube);
    })
    .then(response => response.json())
    .then(data => {

      if (data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        videoResult.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        console.error('No YouTube video found for the dog breed.');
      }
    })
    .catch(error => {
      console.error('Error fetching dog image or YouTube video:', error);
    });
}

function extractDogName(breedsData) {

  return breedsData.length > 0 ? breedsData[0].name : 'Unknown';
}

function newsArticles() {

  const apiNewsKey = 'd96fd62daac841ce82b9991d385e00e6';
  const apiNews = `https://newsapi.org/v2/everything?q=${videoId}&sortBy=publishedAt&apiKey=${apiNewsKey}`

  fetch(apiNews)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}