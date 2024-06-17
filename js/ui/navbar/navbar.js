document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  // nav element
  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  // the menu
  const menu = document.createElement("ul");
  menu.classList.add("navbar-menu");

  // menu items
  const menuItems = ["Home", "Runcation", "About", "Contact"];
  const menuLinks = [
    "/index.html",
    "/blogposts.html",
    "/about.html",
    "/contact.html",
  ];

  // Search bar
  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.placeholder = "Search";
  searchBar.classList.add("search-bar");

  // append menu items to the menu
  menuItems.forEach((item, index) => {
    const menuItem = document.createElement("li");
    const menuLink = document.createElement("a"); // corrected here
    menuLink.href = menuLinks[index];
    menuLink.textContent = item; // move textContent to menuLink
    menuItem.appendChild(menuLink);
    menu.appendChild(menuItem);
  });

  // mobile menu button
  const mobileMenuButton = document.createElement("div");
  mobileMenuButton.classList.add("navbar-toggle");
  mobileMenuButton.id = "mobile-menu";
  for (let i = 0; i < 3; i++) {
    const bar = document.createElement("span");
    bar.classList.add("bar");
    mobileMenuButton.appendChild(bar);
  }

  // append the search bar, menu, and mobile button to the nav
  nav.appendChild(menu);
  nav.appendChild(searchBar);
  nav.appendChild(mobileMenuButton);

  // append the nav to the header
  header.appendChild(nav);

  // Add event listener for mobile menu button
  mobileMenuButton.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});
