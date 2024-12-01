// 메뉴 클릭 시 iframe에 URL 로드
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("nav ul li span");
  const iframe = document.getElementById("contentFrame");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const url = item.getAttribute("data-url");
      if (url) {
        iframe.src = url; // iframe의 src를 업데이트
      }
    });
  });
});
