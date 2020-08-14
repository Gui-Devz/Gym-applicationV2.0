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

const element = document.querySelector(".paginate");

const totalPages = element.dataset.total;
const page = element.dataset.page;

console.log(pagination(page, totalPages));
