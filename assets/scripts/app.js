// Step 1: Selecting Modal
const addMovieModal = document.getElementById('add-modal');

// Step 2 : Access to button
//Tag selector method
const addMovieButton = document.querySelector('header button');

// Selecting Backdrop
const applyBackdrop = document.getElementById('backdrop');

// Making cancel button active in Modal
const activateCancel = addMovieModal.querySelector('.btn--passive');

// Selecting add option from Modal
const confirmAddMovieModal = activateCancel.nextElementSibling;

// Selecting user inputs
const userInputs = addMovieModal.querySelectorAll('input');

// Creating movies array for movies to be added
const movies = [];
const entryTextSelection = document.getElementById('entry-text');
const deleteMovie = document.getElementById('delete-modal');
//Updating the UI
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSelection.style.display = 'block ';
  } else {
    entryTextSelection.style.display = 'none';
  }
};
// Refactored close modal
const closeModal = () => {
  addMovieModal.classList.remove('visible');
};

//Adding function
const showMovieModal = () => {
  addMovieModal.classList.toggle('visible');
  //Background color changes when modal opens
  toggleBackDrop();
};
const toggleBackDrop = () => {
  applyBackdrop.classList.toggle('visible');
};
// Click the backdrop to close modal
const backdropClickHandler = () => {
  closeModal();
  closeMovieModal();
  clearMovieInput();
};

// Making cancel button functional
const cancelButton = () => {
  closeModal();
  clearMovieInput();
  toggleBackDrop();
};

// Clear movie details
const clearMovieInput = () => {
  for (const usrInpt of userInputs) {
    usrInpt.value = '';
  }
};

const closeMovieModal = () => {
  toggleBackDrop();
  deleteMovie.classList.remove('visible');
};

// Delete movie confirmation modal
const deleteMovieConfirmation = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  // splice method takes two params: index and no.of elements you want to remove
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieModal();
  updateUI();
};

//Delete movies
const deleteMovieHandler = (movieId) => {
  deleteMovie.classList.add('visible');
  toggleBackDrop();
  const cancelDeletion = deleteMovie.querySelector('.btn--passive');
  let confirmDeletion = deleteMovie.querySelector('.btn--danger');

  confirmDeletion.replaceWith(confirmDeletion.cloneNode(true));

  confirmDeletion = deleteMovie.querySelector('.btn--danger');
  cancelDeletion.removeEventListener('click', closeMovieModal);
  //   confirmDeletion.removeEventListener(
  //     'click',
  //     deleteMovieConfirmation.bind(null, movieId)
  //   );

  cancelDeletion.addEventListener('click', closeMovieModal);
  confirmDeletion.addEventListener(
    'click',
    deleteMovieConfirmation.bind(null, movieId)
  );
  //deleteMovieConfirmation();
};

// Display the movies
const renderMovie = (id, title, imageUrl, userRating) => {
  const renderMovieElement = document.createElement('li');
  renderMovieElement.className = 'movie-element';
  renderMovieElement.innerHTML = `
    <div class = "movie-element__image">
        <img src = "${imageUrl}" alt="${title}">
    </div>
    <div class = "movie-element__info">
    <h2>${title}</h2>
    <p>${userRating}/5 stars</p>
</div>`;
  renderMovieElement.addEventListener(
    'click',
    deleteMovieHandler.bind(null, id)
  );
  const listRoot = document.getElementById('movie-list');
  listRoot.append(renderMovieElement);
};

const addMovieHandler = () => {
  // Get the title, image, and rating
  const titleValue = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const userRating = userInputs[2].value;
  // Adding validations to the inputs. Trim function takes care of the whitespaces
  if (
    titleValue.trim() === '' ||
    imageUrl.trim() === '' ||
    userRating.trim() === '' ||
    // The '+'sign indicates parseInt.
    +userRating < 1 ||
    +userRating > 5
  ) {
    alert('Please provide valid rating between 1 -5');
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrl,
    rating: userRating,
  };
  movies.push(newMovie);
  console.log(movies);
  //Close the modal

  closeModal();
  clearMovieInput();
  toggleBackDrop();
  updateUI();
  renderMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
};

// Adding event listener to button
addMovieButton.addEventListener('click', showMovieModal);
applyBackdrop.addEventListener('click', backdropClickHandler);
activateCancel.addEventListener('click', cancelButton);
confirmAddMovieModal.addEventListener('click', addMovieHandler);
