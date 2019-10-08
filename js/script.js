/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentList = document.getElementsByClassName("student-item");
const perPage = 10;

const showPage = (list, page) => {
  const start = page * perPage - perPage;
  const end = page * perPage;

  for (i = 0; i < list.length; i++) {
    if (i >= start && i < end) {
      list[i].hidden = false;
    } else {
      list[i].hidden = true;
    }
  }
};

showPage(studentList, 1);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = list => {
  const pages = Math.ceil(list.length / perPage);
  const pageSelect = document.querySelector(".page");

  let paginationList = `<div class='pagination'><ol>`;
  for (i = 1; i <= pages; i++) {
    paginationList += `<li class='button-pg'>`;
    paginationList +=
      i === 1
        ? `<a onclick='pageHopper' class="active" (${i})">${i}</a>`
        : `<a onclick='pageHopper' (${i})">${i}</a>`;
    paginationList += `</li>`;
  }
  paginationList += `</ol></div>`;
  pageSelect.innerHTML += paginationList;
};
appendPageLinks(studentList);

const pageHopper = newPage => {
  const buttons = document.getElementsByClassName("button-pg");
};
// Remember to delete the comments that came with this file, and replace them with your own code comments.
