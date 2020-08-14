/* let totalPages = dataset.total / 3 */

function pagination(selectedPage, totalPages) {
  let oldPage = 0,
    pages = [];

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    let firstAndLastPages = Number(
      currentPage == 1 || currentPage == totalPages
    );
    let pagesBetween = Number(
      currentPage <= selectedPage + 2 && currentPage >= selectedPage - 2
    );

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
