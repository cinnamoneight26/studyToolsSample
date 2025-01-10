document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("nav ul li span");
  const iframeContainer = document.getElementById("iframe-container");
  const menuDescription = document.getElementById("page-description");
  const iframe = document.getElementById("menu-iframe");

  const openModalBtn = document.getElementById("open-modal-btn");
  const modal = document.getElementById("modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalBtn = modal?.querySelector(".close-btn");

  // 필요한 요소가 null인지 확인
  if (!iframeContainer || !menuDescription || !iframe) {
    console.error("No Ifame");
    return; // 실행 중단
  }

  // 화면 크기를 체크하여 모바일/태블릿 환경인지 확인하는 함수
  function checkDeviceSize() {
    const deviceWarning = document.getElementById("device-warning");
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const main = document.querySelector("main");

    if (!deviceWarning || !header || !nav || !main) {
      console.error("디바이스 관련 요소가 누락되었습니다.");
      return;
    }

    if (window.innerWidth <= 768) {
      deviceWarning.style.display = "block";
      header.style.display = "none";
      nav.style.display = "none";
      main.style.display = "none";
      if (iframe.getAttribute("src") !== "") {
        iframeContainer.style.display = "block";
      } else {
        iframeContainer.style.display = "none";
      }
    } else {
      deviceWarning.style.display = "none";
      header.style.display = "flex";
      nav.style.display = "block";
      main.style.display = "flex";
      if (iframe.getAttribute("src") !== "") {
        iframeContainer.style.display = "block";
      } else {
        iframeContainer.style.display = "none";
      }
    }
  }

  // 처음 로딩 시 화면 크기 체크
  checkDeviceSize();

  // 화면 리사이즈 시 다시 체크
  window.addEventListener("resize", checkDeviceSize);

  if (menuItems.length > 0) {
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
  }

  if (openModalBtn && modal && modalOverlay && closeModalBtn) {
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
      modalOverlay.style.display = "block";
    });

    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
      modalOverlay.style.display = "none";
    });

    modalOverlay.addEventListener("click", () => {
      modal.style.display = "none";
      modalOverlay.style.display = "none";
    });
  } else {
    console.warn("No Modal");
  }
});
