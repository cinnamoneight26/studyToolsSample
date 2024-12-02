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

// 
document.addEventListener("DOMContentLoaded", function () {
  const infoIcons = document.querySelectorAll("nav li img");
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  const closeModal = document.querySelector(".modal .close");

  // 아이콘 클릭 이벤트
  infoIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
      const menuName = icon.previousElementSibling.textContent; // 이전 형제 요소의 텍스트 가져오기
      modalText.textContent = `${menuName}에 대한 설명입니다.`; // 모달에 표시할 텍스트
      modal.style.display = "block"; // 모달 표시
    });
  });

  // 닫기 버튼 이벤트
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // 모달 숨김
  });

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
