// Array to store dog history
let dogHistory = [];

// Function to load dog history from local storage and display in the lastResultList
function loadDogHistory() {
  const storedHistory = localStorage.getItem('dogHistory');
  if (storedHistory) {
    dogHistory = JSON.parse(storedHistory);

    // Selecting the lastResultList element
    const lastResultList = document.querySelector('.lastResult');

    // Clear the existing content in lastResultList
    lastResultList.innerHTML = '';

    // Extract the last 10 items from dogHistory
    const last10Items = dogHistory.slice(-10).reverse(); // Reverse the order to show the newest first

    // Iterate through the sorted last 10 items and append them to lastResultList
    last10Items.forEach(dogRecord => {
      const listItem = document.createElement('li');
      listItem.textContent = `${dogRecord.name} ${dogRecord.surname} - Breed: ${dogRecord.breed}`;
      lastResultList.appendChild(listItem);
    });
  }
}

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
      // ... (existing code)

      // Creating a list item to display dog history
      const listItem = document.createElement('li');
      listItem.textContent = `${nameInput} ${surnameInput} - Breed: ${dogName}`;

      // Inserting the new item at the beginning of the dog history array
      dogHistory.unshift({ name: nameInput, surname: surnameInput, breed: dogName });

      // Trim the history to keep only the last 10 items
      dogHistory = dogHistory.slice(0, 10);

      // Save the updated dog history to local storage
      localStorage.setItem('dogHistory', JSON.stringify(dogHistory));

      // Displaying the dog name in the heading
      h2DogName.textContent = `${nameInput} ${surnameInput} - The Famous ${dogName}`;

      // Dynamically add the new history item to the existing list
      const lastResultList = document.querySelector('.lastResult');
      const newItem = document.createElement('li');
      newItem.textContent = `${nameInput} ${surnameInput} - Breed: ${dogName}`;
      lastResultList.insertBefore(newItem, lastResultList.firstChild);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });

  // Clearing input values
  document.getElementById('name-input').value = '';
  document.getElementById('surname-input').value = '';
}

// Function to load dog history from local storage and display in the lastResultList
function loadDogHistory() {
  const storedHistory = localStorage.getItem('dogHistory');
  if (storedHistory) {
    dogHistory = JSON.parse(storedHistory);

    // Selecting the lastResultList element
    const lastResultList = document.querySelector('.lastResult');

    // Clear the existing content in lastResultList
    lastResultList.innerHTML = '';

    // Extract the last 10 items from dogHistory
    const last10Items = dogHistory.slice(-10); // Reverse the order to show the newest first

    // Iterate through the sorted last 10 items and append them to lastResultList
    last10Items.forEach(dogRecord => {
      const listItem = document.createElement('li');
      listItem.textContent = `${dogRecord.name} ${dogRecord.surname} - Breed: ${dogRecord.breed}`;
      lastResultList.appendChild(listItem);
    });
  }
}

// Load dog history when the script is executed
loadDogHistory();
