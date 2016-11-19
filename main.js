/* the entire way with the switching views with this could be
done much better by adding in reming css but I dont care */
var mainDiv = document.getElementById('main');

var homePageElements = document.getElementsByClassName('home');
var addPageElements = document.getElementsByClassName('add');
var librayPageElements = document.getElementsByClassName('library');

/* change back to the home page */
function changeToHomePage () {
  var header = document.createElement('h1')
  header.innerHTML = 'Aski and key Board Art Library';

  var addButton = document.createElement('button');
  addButton.innerHTML = 'Add';
  addButton.onclick = changeToAddPage;

  var libraryButton = document.createElement('button');
  libraryButton.innerHTML = 'Library';
  libraryButton.onclick = changeToLibraryPage;

  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  mainDiv.appendChild(header);
  mainDiv.appendChild(addButton);
  mainDiv.appendChild(libraryButton);
}

/* change to the library page */
function changeToLibraryPage () {
  var backButton = document.createElement('button');
  backButton.onclick = changeToHomePage;
  backButton.innerHTML = 'back';

  var art = JSON.parse(localStorage.getItem('art'));

  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  for(var i = 0; i < art.length; i++) {
    console.log(art[i])

    var artContainer = document.createElement('div');

    var artText = document.createElement('p');
    artText.innerHTML = artText[i];
    console.log(artText.innerHTML);

    mainDiv.appendChild(artText);
  }

  mainDiv.appendChild(backButton);
}

/* change to the page to add stuff */
function changeToAddPage () {
  var backButton = document.createElement('button');
  backButton.onclick = changeToHomePage;
  backButton.innerHTML = 'back';

  var mainTextArea = document.createElement('textarea');

  var addButton = document.createElement('button');
  addButton.innerHTML = 'Add';
  addButton.onclick = addButtonOnClick;

  var art;
  var addedArt = JSON.parse(localStorage.getItem('art'));

  if(addedArt) {
    art = addedArt;
  } else {
    art = [];
  }

  /* the adding button on submit */
  function addButtonOnClick () {
    var text = mainTextArea.value;

    if (text != '') {
      art.push(text);

      localStorage.setItem('art', JSON.stringify(art));
      changeToHomePage();
    }

  }

  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  mainDiv.appendChild(backButton);
  mainDiv.appendChild(mainTextArea);
  mainDiv.appendChild(addButton);
}

/* change to the edit page */
function changeToEditPage() {

}
