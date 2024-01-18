function getDog() {
  const imgResult = document.querySelector('.imgResult');
  const videoResult = document.querySelector('.videoResult');
  const apiKeyDog = 'live_OYYRpXZf5kdIf5ICz2ivykRKNQV9zAfW2nAYCyxNl9bkLU1Wb2Sw0U6pUyqLASgP'; // Replace with your actual Dog API key
  const apiKeyYoutube = 'AIzaSyASeziY62j7oLZgUeVw0z0avF7p2GCr1rM'; // Replace with your actual YouTube Data API key

  const apiUrlDog = `https://api.thedogapi.com/v1/images/search?limit=10&api_key=${apiKeyDog}`;

  fetch(apiUrlDog)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const dogName = extractDogName(data[0].breeds); // Assuming you have a function to extract the name from the breed data
      imgResult.src = data[0].url;
      imgResult.style.width = '300px';
      imgResult.style.height = '250px';

      // Fetch YouTube video related to the dog breed
      const apiUrlYoutube = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${dogName}dog&maxResults=1&key=${apiKeyYoutube}`;


      return fetch(apiUrlYoutube);
    })
    .then(response => response.json())
    .then(data => {
      // Display YouTube video
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
