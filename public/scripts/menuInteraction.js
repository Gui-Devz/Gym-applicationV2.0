//Script that guarantees that the CSS of the options of the menu works properly

const URL_checking = window.location.href;

const menuLinks = document.querySelectorAll(".links a");

for (const link of menuLinks) {
  if (URL_checking.includes("members")) {
    if (link.getAttribute("id") == "members") link.classList.add("active");
  } else if (URL_checking.includes("instructors")) {
    if (link.getAttribute("id") == "instructors") link.classList.add("active");
  }
}
