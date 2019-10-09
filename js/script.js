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

  let paginationList = `<div class='pagination'><ol>`;
  for (i = 1; i <= pages; i++) {
    paginationList += `<li class='button-pg'>`;
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

const pageHopper = newPage => {
  const buttons = document.getElementsByClassName("button-pg");
  for (i = 0; i < buttons.length; i++) {
    let aTag = buttons[i].children[0];
    i + 1 === newPage
      ? aTag.classList.add("active")
      : aTag.classList.remove("active");
  }
  showPage(studentList, newPage);
};
// Remember to delete the comments that came with this file, and replace them with your own code comments.
