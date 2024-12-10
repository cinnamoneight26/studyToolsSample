document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("nav ul li span");
  const iframeContainer = document.getElementById("iframe-container");
  const menuDescription = document.getElementById("menu-description");
  const iframe = document.getElementById("menu-iframe");

  // 화면 크기를 체크하여 모바일/태블릿 환경인지 확인하는 함수
  function checkDeviceSize() {
    if (window.innerWidth <= 768) {
      // 모바일, 태블릿에서는 경고 메시지 표시
      document.getElementById("device-warning").style.display = "block";

      // 나머지 콘텐츠 숨기기
      document.querySelector("header").style.display = "none";
      document.querySelector("nav").style.display = "none";
      document.querySelector("main").style.display = "none";
      iframeContainer.style.display = "none";
    } else {
      // PC에서는 경고 메시지를 숨기고 콘텐츠 표시
      document.getElementById("device-warning").style.display = "none";
      document.querySelector("header").style.display = "block";
      document.querySelector("nav").style.display = "block";
      document.querySelector("main").style.display = "flex";
      iframeContainer.style.display = "none";
    }
  }

  // 처음 로딩 시 화면 크기 체크
  checkDeviceSize();

  // 화면 리사이즈 시 다시 체크
  window.addEventListener("resize", checkDeviceSize);

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
