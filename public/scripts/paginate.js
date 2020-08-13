/* let totalPages = dataset.total / 3 */

let totalPages = 20,
  currentPage = 0,
  pages = [];

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
  pages.push(currentPage);
}

console.log(pages);
