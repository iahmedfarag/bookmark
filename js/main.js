var nameInput = document.getElementById("siteName");
var urlInput = document.getElementById("siteURL");
var addBtn = document.getElementById("add");
var bookMarkContainer = document.getElementById("bookMarkContainer");
var deleteAllBtn = document.getElementById("deleteAll");
urlInput.value = "https://";
nameInput.focus();
var bookMarks;

if (JSON.parse(localStorage.getItem("marks"))) {
  bookMarks = JSON.parse(localStorage.getItem("marks"));
  displayMarks(bookMarks);
} else {
  bookMarks = [];
}

if (bookMarks.length < 1) {
  bookMarkContainer.innerHTML = `<p class="empty" id="empty">Noo BooKMarKs.</p>`;
}

// add marks
function addMark() {
  if (addBtn.innerHTML.trim() == "ADD") {
    if (!nameInput.value | !urlInput.value) {
      nameInput.nextElementSibling.classList.add("active");
      urlInput.nextElementSibling.classList.add("active");
    } else {
      var bookMark = {
        name: nameInput.value,
        url: urlInput.value,
      };
      localStorage.setItem("marks", bookMarks);
      bookMarks.push(bookMark);
      displayMarks(bookMarks);
      //   local storage
      localStorage.setItem("marks", JSON.stringify(bookMarks));
      clearValues();
      nameInput.nextElementSibling.classList.remove("active");
      urlInput.nextElementSibling.classList.remove("active");
    }
  } else {
    editMark();
    clearValues();
  }
}

// display function
function displayMarks(arr) {
  if (arr.length < 1) {
    bookMarkContainer.innerHTML = `<p class="empty" id="empty">Noo BooKMarKs.</p>`;
  } else {
    var box = "";
    for (var i = 0; i < arr.length; i++) {
      box += `
          <div class="bookMark">
                <h3 class="name">${arr[i].name}</h3>
                <div class="control">
                  <a href="${arr[i].url}" class="link" target="_blank">Visit</a>
                  <i class="fa-solid fa-pen-to-square updateIcon"onclick="updateMark(${i})"></i>
                  <i class="fa-solid fa-trash delete"onclick="deleteMark(${i})"></i>
                </div>
            </div>        
          `;
    }

    bookMarkContainer.innerHTML = box;
  }
}

// clear values function
function clearValues() {
  nameInput.value = "";
  urlInput.value = "https://";
}

// delete function
function deleteMark(index) {
  for (var i = 0; i < bookMarks.length; i++) {
    if (index == i) {
      bookMarks.splice(i, 1);
    }
  }
  console.log(bookMarks);
  localStorage.setItem("marks", JSON.stringify(bookMarks));
  displayMarks(bookMarks);
}

// update functions
var updateIndex;
function updateMark(index) {
  updateIndex = index;
  for (var i = 0; i < bookMarks.length; i++) {
    if (index == i) {
      nameInput.value = bookMarks[i].name;
      urlInput.value = bookMarks[i].url;
    }
  }
  addBtn.innerHTML = "Edit";
  console.log("update func");
}

function editMark() {
  console.log("edit func");
  bookMarks[updateIndex].name = nameInput.value;
  bookMarks[updateIndex].url = urlInput.value;
  localStorage.setItem("marks", JSON.stringify(bookMarks));
  displayMarks(bookMarks);
  addBtn.innerHTML = "ADD";
}

// delete all function
function deleteAll() {
  console.log("delete All");
  bookMarks = [];
  localStorage.clear("marks");
  displayMarks(bookMarks);
}

// search function
function searchMarks(searchV) {
  var searchedArray = [];
  for (i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].name.includes(searchV)) {
      searchedArray.push(bookMarks[i]);
      displayMarks(searchedArray);
    }
  }
}

function urlRegex() {
  var regex = /^(https:\/\/)\w /;
  console.log("test");
}
