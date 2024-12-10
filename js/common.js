document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("nav ul li span");
  const iframeContainer = document.getElementById("iframe-container");
  const menuDescription = document.getElementById("menu-description");
  const iframe = document.getElementById("menu-iframe");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
      item.classList.add("active");
      const url = item.getAttribute("data-url");

      menuDescription.style.display = "none";
      iframeContainer.style.display = "block";
      iframe.src = url;
    });
  });
});
