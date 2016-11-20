/* the entire way with the switching views with this could be
done much better by adding in reming css but I dont care */

/* set click listeners because you cant use html on click with chrome
extention */

/* get buttons */
var addButton = document.getElementById('addButton');
var libraryButton = document.getElementById('libraryButton');
var editButton = document.getElementById('editButton');

/* onClickFuncions */
function addButtonClick() {
  changeToAddPage();
}

function libraryButtonClick() {
  changeToLibraryPage();
}

function editButtonClick() {
  changeToEditPage();
}

/* create listeners */
addButton.addEventListener('click', addButtonClick);
libraryButton.addEventListener('click', libraryButtonClick);
editButton.addEventListener('click', editButtonClick);

/* get the main div where all the elements will be changed */
var mainDiv = document.getElementById('main');

/* change back to the home page */
function changeToHomePage () {
  console.log("beta");
  /* create all the elements for the home page */
  var headerTopBorder = document.createElement('h1');
  headerTopBorder.innerHTML = '___________________________________';

  var header = document.createElement('h1')
  header.innerHTML = '|_Ascii_And_Text_Art_Library_|';

  var addButton = document.createElement('button');
  addButton.innerHTML = 'Add';
  addButton.onclick = changeToAddPage;
  addButton.className = 'button';

  var libraryButton = document.createElement('button');
  libraryButton.innerHTML = 'Library';
  libraryButton.onclick = changeToLibraryPage;
  libraryButton.className = 'button';

  var editButton = document.createElement('button');
  editButton.innerHTML = 'Edit'
  editButton.onclick = changeToEditPage;
  editButton.className = 'button';

  /* remove all the elements form page before */
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  /* add all the elemts to the page */
  mainDiv.appendChild(headerTopBorder);
  mainDiv.appendChild(header);
  mainDiv.appendChild(addButton);
  mainDiv.appendChild(libraryButton);
  mainDiv.appendChild(editButton);
}

/* change to the library page */
function changeToLibraryPage () {
  console.log("alpha")
  var backButton = document.createElement('button');
  backButton.onclick = changeToHomePage;
  backButton.innerHTML = 'back';
  backButton.className = 'button';

  /* get art from local storage as array */
  var art = JSON.parse(localStorage.getItem('art'));

  /* remove all elements for page before */
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  /* loop through all the art */
  if(art.length) {
    for(var i = 0; i < art.length; i++) {
      var artString = art[i]; //the art as a string

      /* create art */
      var artText = document.createElement('pre');
      artText.innerHTML = artString

      /* create container for art and put art in it */
      var artContainer = document.createElement('div');
      artContainer.appendChild(artText);

      /* add the art div with art to page */
      mainDiv.appendChild(artContainer);
    }

  } else {
    /* if there isent any art display a message saying that */
    var noStuff = document.createElement('p');
    noStuff.innerHTML = 'you have not added any art to be displayed yet'
    mainDiv.appendChild(noStuff);
  }

  /* add back button to page */
  mainDiv.appendChild(backButton);
}

/* change to the page to add stuff */
function changeToAddPage () {
  /* create all the elements that need to be displayed */
  var backButton = document.createElement('button');
  backButton.onclick = changeToHomePage;
  backButton.innerHTML = 'back';
  backButton.className = 'button';

  var mainTextArea = document.createElement('textarea');
  mainTextArea.className = 'textarea';

  var addButton = document.createElement('button');
  addButton.innerHTML = 'Add';
  addButton.onclick = addButtonOnClick;
  addButton.className = 'button';

  /* create an art varible and get localStorage art */
  var art;
  var addedArt = JSON.parse(localStorage.getItem('art'));

  /* if the there is localStorage art set art to the else set it to an
  emty array*/
  if(addedArt) {
    art = addedArt;
  } else {
    art = [];
  }

  /* the adding button on submit */
  function addButtonOnClick () {
    var text = mainTextArea.value;

    /* if there is text then  */
    if (text != '') {
      art.push(text);

      localStorage.setItem('art', JSON.stringify(art));
      changeToHomePage();
    }

  }

  /* remove all the elements for the view before */
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  /* add all the elements for this view */
  mainDiv.appendChild(backButton);
  mainDiv.appendChild(mainTextArea);
  mainDiv.appendChild(addButton);
}

/* display the edit page */
function changeToEditPage() {
  /* remove all the elements from the view before */
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  /* create all the elements that need to be displayed */
  var backButton = document.createElement('button');
  backButton.onclick = changeToHomePage;
  backButton.innerHTML = 'back';
  backButton.className = 'button';

  var info = document.createElement('p');
  info.innerHTML = 'to delete something simply delete ' +
  'everything in the textfield and to edit something edit it';

  var submitButton = document.createElement('button');
  submitButton.innerHTML = 'add changes';
  submitButton.onclick = submitChanges;
  submitButton.className = 'button';

  /* get art form localStorage as array */
  var art = JSON.parse(localStorage.getItem('art'));

  /* if there is stuff in the art array loop though and display a text field
  for each one */
  if (art.length) {

    for (var i = 0; i < art.length; i++) {
      var artString = art[i]; //the art

      /* create text area with the art inside */
      var artTextArea = document.createElement('textarea');
      artTextArea.innerHTML = artString;
      artTextArea.className = 'editTextField';

      /* line break between text areas */
      var lineBreak = document.createElement('br');

      /* add the elements that will be added multiple times with the for loop */
      mainDiv.appendChild(artTextArea);
      mainDiv.appendChild(lineBreak);
    }

  } else {
    /* if there isent any art display a message saying that */
    var noStuff = document.createElement('p');
    noStuff.innerHTML = 'you havent added any art to be edit yet'
    mainDiv.appendChild(noStuff);
  }

  /* submit the changes that the user made to the localStorage */
  function submitChanges() {
    var edits = document.getElementsByClassName('editTextField');
    var finishedEdits = [];

    /* loop through text area and add all changes to finishedEdits array
    if there is art*/
    for (var i = 0; i < edits.length; i++) {
      var value = edits[i].value;

      /* if the text area is blank dont add it */
      if(value != '') {
        finishedEdits.push(value);
      }
    }

    /* set the new localStorage array to finishedEdits array and change back to
    home */
    localStorage.setItem('art', JSON.stringify(finishedEdits));
    changeToHomePage();
  }

  /* add all the elements that are not part of the for loop */
  mainDiv.appendChild(backButton);
  mainDiv.appendChild(submitButton);
  mainDiv.appendChild(info);
}
