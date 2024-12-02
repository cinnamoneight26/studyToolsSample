$(document).ready(function () {
  showShadow();
});

// 이미지 랜덤 변경
function showShadow() {
  var num = 1;
  setInterval(function () {
    if (num == 3) {
      num = 0;
    } else {
      $(".shadows").css("display", "none");
      $("#shadows_" + num)
        .css({ opacity: 0, display: "block" })
        .animate({ opacity: 1 }, 500);
      num++;
    }
  }, 5000);
}
