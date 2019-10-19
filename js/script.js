/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global vars
//(`studentList` contains all students in the list)
//(`studentLen` contains length of studentList)
const studentList = document.getElementsByClassName("student-item");
const studentLen = studentList.length;
const perPage = 10;

//pagination of student display count
const resultsEl = document.createElement("p");
const headerSelect = document.querySelector(".page-header");
resultsEl.id = "results";
headerSelect.after(resultsEl);

//`filteredList` is set to false to have the default list remain as `StudentList`
let filteredList = false;

//`showPage` calculates which students to display based on selected page number
const showPage = (list, page) => {
  const start = page * perPage - perPage;
  const end = page * perPage;
  //loops through list
  for (i = 0; i < list.length; i++) {
    if (i >= start && i < end) {
      list[i].hidden = false;
    } else {
      list[i].hidden = true;
    }
  }
};
showPage(studentList, 1);

//`appendPageLinks` adds page link button(s) depending on amount of students in studentList.
const appendPageLinks = list => {
  const pages = Math.ceil(list.length / perPage);
  const pageSelect = document.querySelector(".page");
  //construction of page links begins here
  let paginationList = `<div id='pagination' class="pagination"><ol>`;
  for (i = 1; i <= pages; i++) {
    paginationList += `<li class='button-pg'>`;
    //if page one is selected, then the active class is added, and the first 10 students are shown
    //else if another page link is clicked, then that set of students will be displayed
    //on click of page links `pageHopper` is called using selected page number
    paginationList +=
      i === 1
        ? `<a onclick='pageHopper(${i})' class="active">${i}</a>`
        : `<a onclick='pageHopper(${i})'>${i}</a>`;
    paginationList += `</li>`;
  }
  paginationList += `</ol></div>`;
  pageSelect.innerHTML += paginationList;
};
appendPageLinks(studentList);

//updates page links based on search results
const updatePageLinks = num => {
  const pages = Math.ceil(num / perPage);
  const buttons = document.getElementsByClassName("button-pg");

  //loops through buttons and alters button pagination depending if there are more buttons than needed...
  //... this is determined by the if statement
  for (var i = 0; i < buttons.length; i++) {
    if (i + 1 > pages) {
      buttons[i].style.display = "none";
    } else {
      buttons[i].style.display = "inline";
    }
  }
};

//`pageHopper` adds and removes classes to page links
const pageHopper = newPage => {
  const buttons = document.getElementsByClassName("button-pg");
  for (i = 0; i < buttons.length; i++) {
    let aTag = buttons[i].children[0];
    //if newPage is equal to the selected page link in appendPageLinks
    //then the class of 'active' is applied
    //else if the page number does not equal newPage, the 'active' class is removed
    i + 1 === newPage
      ? aTag.classList.add("active")
      : aTag.classList.remove("active");
  }
  //if filteredList is true (list = filteredList) if false then (studentList=list)
  const list = filteredList ? filteredList : studentList;
  showPage(list, newPage);
};

//adds search form to the DOM
const appendSearchBar = () => {
  const headerSelect = document.querySelector(".page-header");
  let insrtSearch = `<form class='student-search'>`;
  insrtSearch += `<input type='text' onkeyup='searchStudents()' id='search' placeholder='Search for students...'>`;
  // insrtSearch += `<button type="submit">Search</button>`;
  //button removed because pasting still triggers onkeyup
  insrtSearch += `</form>`;
  headerSelect.innerHTML += insrtSearch;
};
appendSearchBar();

// filters through Students
const searchStudents = () => {
  const inputVal = document.getElementById("search").value.toLowerCase();

  //if input field is blank, then pagination is still shown.
  //when input is cleared, `showPage` will restore back to page 1 default
  if (!inputVal.length) {
    filteredList = false;
    showPage(studentList, 1);
    updatePageLinks(studentLen.length);
    studentsFound(studentLen);
    return;
  }

  //studentList is then looped through to find matching names or emails
  //if there is a match, the matched results will be shown, else they will be hidden

  let numStudents = 0;

  for (var i = 0; i < studentList.length; i++) {
    const details = studentList[i].children[0];
    const name = details.children[1].innerText.toLowerCase();
    const email = details.children[2].innerText.toLowerCase();

    if (name.indexOf(inputVal) > -1 || email.indexOf(inputVal) > -1) {
      studentList[i].hidden = false;
      numStudents++;
    } else {
      studentList[i].hidden = true;
    }
  }

  //selects students without hidden attribute and sets them to `filteredList`
  //this is used to only display students without the hidden attribute on all available pages
  const shown = document.querySelectorAll("li.student-item:not([hidden])");
  filteredList = shown;

  showPage(shown, 1);
  updatePageLinks(numStudents);
  studentsFound(numStudents);
};

//displays how many students are shown on the site
//changes with search results
const studentsFound = numResults => {
  const results = document.getElementById("results");
  results.innerText = `${numResults} students`;
  results.style.textAlign = "center";
};
studentsFound(studentLen);
