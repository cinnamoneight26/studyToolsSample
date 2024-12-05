document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("nav ul li span");
  const iframeContainer = document.getElementById("iframe-container");
  const menuDescription = document.getElementById("menu-description");
  const iframe = document.getElementById("menu-iframe");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const url = item.getAttribute("data-url");

      // 메뉴 클릭 시, 설명 부분 숨기고 iframe을 보이도록
      menuDescription.style.display = "none";
      iframeContainer.style.display = "block";

      // 아이프레임의 src를 업데이트
      iframe.src = url;
    });
  });
});
