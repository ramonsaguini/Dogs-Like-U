// Array to store dog history
let dogHistory = [];

// Function triggered when the "Looks like Me!" button is clicked
function getDog() {
  // Selecting elements from the DOM
  const imgResult = document.querySelector('.imgResult');
  const videoResult = document.querySelector('.videoResult');
  const lastResultList = document.querySelector('.lastResult');
  const apiKeyDog = 'live_OYYRpXZf5kdIf5ICz2ivykRKNQV9zAfW2nAYCyxNl9bkLU1Wb2Sw0U6pUyqLASgP';
  const apiKeyYoutube = 'AIzaSyDOPdrfeEt61dxUdZtLeeMqiC1VHWWL3lc';

  // API URL for fetching dog images
  const apiUrlDog = `https://api.thedogapi.com/v1/images/search?limit=1&api_key=${apiKeyDog}`;
  let dogName = ''; // Variable to store the extracted dog name
  const nInput = document.getElementById('name-input').value;
  const sInput = document.getElementById('surname-input').value;
  const nameInput = capitalizeFirstLetter(nInput); // Capitalizing the first letter of the name
  const surnameInput = capitalizeFirstLetter(sInput); // Capitalizing the first letter of the surname
  const h2DogName = document.querySelector('.dogBreed'); // Element to display dog name

  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Check if both name and surname are not blank
  if (nInput.trim() === '' || sInput.trim() === '') {
    // Show the modal if either name or surname is blank
    const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    myModal.show();
    return; // Exit the function if either name or surname is blank
  }

  // Function to extract dog name from breeds data
  function extractDogName(breedsData) {
    return breedsData.length > 0 ? breedsData[0].name : 'Unknown';
  }

  // Fetching dog data from the Dog API until a valid breed is obtained
  function fetchDogData() {
    return fetch(apiUrlDog)
      .then(response => response.json())
      .then(data => {
        // Extracting the dog name from the fetched data
        dogName = extractDogName(data[0].breeds);
        // Setting the source of the dog image
        imgResult.src = data[0].url;
        return dogName;
      });
  }

  // Function to recursively fetch data until a valid breed is obtained
  function tryFetchingUntilValidBreed() {
    return fetchDogData().then(name => {
      if (name === 'Unknown') {
        return tryFetchingUntilValidBreed();
      } else {
        return name;
      }
    });
  }

  // Recursively try fetching until a valid breed is obtained
  tryFetchingUntilValidBreed()

    .then(validDogName => {
      // API URL for fetching YouTube videos related to the dog breed
      const apiUrlYoutube = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${validDogName}dog&maxResults=1&key=${apiKeyYoutube}`;

      // Fetching YouTube videos
      return fetch(apiUrlYoutube);
    })
    .then(response => response.json())
    .then(data => {
      // Checking if there are videos available for the dog breed on YouTube
      if (data.items.length > 0) {
        // Extracting video ID and embedding the YouTube video
        const videoId = data.items[0].id.videoId;
        videoResult.innerHTML = `<iframe width="100%" style='min-height: 500px;max-height: 700px;' src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;

        // Creating a list item to display dog history
        const listItem = document.createElement('li');
        listItem.textContent = `${nameInput} ${surnameInput} - Breed: ${dogName}`;
        // Appending the list item to the dog history list
        lastResultList.appendChild(listItem);
        // Saving the updated dog history to local storage
        localStorage.setItem('dogHistory', JSON.stringify(dogHistory));
        // Displaying the dog name in the heading
        h2DogName.textContent = `${nameInput} ${surnameInput} - The Famous ${dogName}`;
      } else {
        // Logging an error if no YouTube video is found
        console.error('No YouTube video found for the dog breed.');
      }
    })
  document.getElementById('name-input').value = '';
  document.getElementById('surname-input').value = '';
}