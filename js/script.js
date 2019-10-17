/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global vars that contain full list of students
//and the amount of students that will show on each page
const studentList = document.getElementsByClassName("student-item");
const perPage = 10;

//`showPage` calculates which students to display based on selected page number
const showPage = (list, page) => {
  const start = page * perPage - perPage;
  const end = page * perPage;
  //loops through the list (in this case `studentList`)
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
  let paginationList = `<div class='pagination'><ol>`;
  for (i = 1; i <= pages; i++) {
    paginationList += `<li class='button-pg'>`;
    //if page one is selected, then the active class is added and the first 10 students are shown
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
  showPage(studentList, newPage);
};

//adds search form to the DOM
const appendSearchBar = () => {
  const headerSelect = document.querySelector(".page-header");
  let insrtSearch = `<div class='student-search'>`;
  insrtSearch += `<input type='text' onkeyup='searchStudents()' id='search' onkeyup='sortThru()' placeholder='Search for students...'>`;
  insrtSearch += `<button>Search</button>`;
  insrtSearch += `</div>`;
  headerSelect.innerHTML += insrtSearch;
};
appendSearchBar();

//filters through Students
const searchStudents = () => {};
