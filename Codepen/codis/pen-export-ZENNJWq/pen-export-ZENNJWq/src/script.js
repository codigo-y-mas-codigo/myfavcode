const images = [
  "https://ucarecdn.com/4cf0ced9-aef2-42bd-b2b7-1c3836fc9a39/-/preview/813x813/",
  "https://ucarecdn.com/352116ee-b7d9-4728-8b9c-629b90aba551/-/preview/813x813/",
  "https://ucarecdn.com/26df83f8-00cb-4742-954c-6c22f9c5755e/-/preview/813x813/",
  "https://ucarecdn.com/03df567b-1298-4c14-a727-c811dd6d0179/-/preview/813x813/",
  "https://ucarecdn.com/480daf9c-9a9d-4402-8a74-915ff607d931/-/preview/813x813/",
  "https://ucarecdn.com/3288a109-8675-4775-a483-d45caed4edfd/-/preview/813x813/"
];

const gallery = document.querySelector('.gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-image');
const quoteForm = document.getElementById('quote-form');
const imageURLInput = document.getElementById('image-url');
const columnsSelect = document.getElementById('columns');
const favoritesIcon = document.getElementById('favorites-icon');
const favoritesModal = document.getElementById('favorites-modal');
const favoritesList = document.getElementById('favorites-list');

// Array to store favorite images
let favorites = [];

// Event listener for column buttons
document.querySelectorAll('.column-button').forEach(button => {
  button.addEventListener('click', () => {
    const columns = parseInt(button.dataset.columns);
    displayImages(columns);
  });
});

// Function to display images in the gallery
function displayImages(columns) {
  gallery.innerHTML = '';
  images.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.style.flexBasis = `calc(${100 / columns}% - 20px)`;
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    const img = document.createElement('img');
    img.src = image;
    img.addEventListener('click', () => openModal(image));
    imgContainer.appendChild(img);
    const heartIcon = document.createElement('span');
    heartIcon.classList.add('heart-icon');
    if (favorites.includes(image)) {
      heartIcon.classList.add('favorited');
    }
    heartIcon.innerHTML = '❤️';
    heartIcon.addEventListener('click', (event) => toggleFavorite(event, image));
    imgContainer.appendChild(heartIcon);
    galleryItem.appendChild(imgContainer);
    gallery.appendChild(galleryItem);
  });
}

// Function to open modal with selected image
function openModal(image) {
  modal.style.display = 'block';
  modalImg.src = image;
  imageURLInput.value = image;
}

// Close modal when clicking on close button or outside modal content
modal.addEventListener('click', (event) => {
  if (event.target === modal || event.target.classList.contains('close')) {
    closeModal();
  }
});

// Close modal function
function closeModal() {
  modal.style.display = 'none';
  quoteForm.reset();
}

// Event listener for submitting quote form
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get form data
  const formData = new FormData(quoteForm);
  const quoteData = {};
  formData.forEach((value, key) => {
    quoteData[key] = value;
  });
  // Save quote data to localStorage
  localStorage.setItem('quoteData', JSON.stringify(quoteData));
  // Send quote data to WhatsApp
  sendToWhatsApp(quoteData);
  // Close modal
  closeModal();
});

// Function to send quote data to WhatsApp
function sendToWhatsApp(quoteData) {
  const { name, email, company, 'image-url': imageURL, pieces, engraving, 'engraving-type': engravingType, observations } = quoteData;
  let message = `Hola, solicito de su apoyo para la siguiente cotización:\n\nNombre: ${name}\nEmail: ${email}\nEmpresa: ${company}\nImagen: ${imageURL}\nPiezas: ${pieces}\n`;
  if (engraving === 'yes') {
    message += `Grabado: Sí (${engravingType})\n`;
  } else {
    message += 'Grabado: No\n';
  }
  message += `Observaciones: ${observations}`;
  const whatsappURL = `https://api.whatsapp.com/send/?phone=%2B525585779906&text=${encodeURIComponent(message)}`;
  window.open(whatsappURL);
}

// Event listener for changing number of columns
columnsSelect.addEventListener('change', () => {
  const columns = parseInt(columnsSelect.value);
  displayImages(columns);
});

// Function to show engraving options if user selects 'Yes' for engraving
function showEngravingOptions() {
  const engravingSelect = document.getElementById('engraving');
  const engravingOptions = document.getElementById('engraving-options');
  if (engravingSelect.value === 'yes') {
    engravingOptions.style.display = 'block';
  } else {
    engravingOptions.style.display = 'none';
  }
}

// Function to toggle favorite status of an image
function toggleFavorite(event, image) {
  event.stopPropagation(); // Prevent opening modal when clicking on heart icon
  const index = favorites.indexOf(image);
  if (index === -1) {
    favorites.push(image);
    event.target.classList.add('favorited');
  } else {
    favorites.splice(index, 1);
    event.target.classList.remove('favorited');
  }
  // Update favorites icon
  updateFavoritesIcon();
}

// Function to update favorites icon
function updateFavoritesIcon() {
  if (favorites.length > 0) {
    favoritesIcon.classList.add('active');
  } else {
    favoritesIcon.classList.remove('active');
  }
}

// Function to open favorites modal
favoritesIcon.addEventListener('click', () => {
  favoritesList.innerHTML = '';
  favorites.forEach(image => {
    const listItem = document.createElement('li');
    listItem.textContent = image;
    favoritesList.appendChild(listItem);
  });
  favoritesModal.style.display = 'block';
});

// Close favorites modal when clicking on close button or outside modal content
favoritesModal.addEventListener('click', (event) => {
  if (event.target === favoritesModal || event.target.classList.contains('close')) {
    favoritesModal.style.display = 'none';
  }
});

// Initial display of images
displayImages(1); // Default to 1 column

// Check if there is saved data in localStorage and fill the form
const savedData = localStorage.getItem('quoteData');
if (savedData) {
  const parsedData = JSON.parse(savedData);
  for (const key in parsedData) {
    if (Object.hasOwnProperty.call(parsedData, key)) {
      const input = document.getElementById(key);
      if (input) {
        input.value = parsedData[key];
      }
    }
  }
}

// Update favorites icon when page loads
updateFavoritesIcon();
