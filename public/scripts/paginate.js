function pagination(selectedPage, totalPages) {
  let oldPage = 0,
    pages = [];

  // Creates the array containing the pages for the pagination
  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    let firstAndLastPages = Number(
      currentPage == 1 || currentPage == totalPages
    );
    let pagesBetween = Number(
      currentPage <= selectedPage + 2 && currentPage >= selectedPage - 2
    );

    //Defines how the array is filled
    if (firstAndLastPages || pagesBetween) {
      if (currentPage - oldPage > 2) {
        pages.push("...");
      }

      if (currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);

      oldPage = currentPage;
    }
  }

  return pages;
}

const paginate = document.querySelector(".paginate");

const totalPages = +paginate.dataset.total;
const pages = +paginate.dataset.page;
const filter = paginate.dataset.filter;

const newDiv = document.createElement("div");
let element = "";
let arrayPages = pagination(pages, totalPages);

if (window.location.href.includes("instructors")) {
  for (const page of arrayPages) {
    if (String(page).includes("...")) {
      element += `<span>${page}</span>`;
    } else {
      element += `<a href='/instructors?page=${page}&filter=${filter}'>${page}</a>`;
    }
  }
} else {
  for (const page of arrayPages) {
    if (String(page).includes("...")) {
      element += `<span>${page}</span>`;
    } else {
      element += `<a href='/members?page=${page}&filter=${filter}'>${page}</a>`;
    }
  }
}

newDiv.innerHTML = element;

paginate.appendChild(newDiv);

console.log(arrayPages);
