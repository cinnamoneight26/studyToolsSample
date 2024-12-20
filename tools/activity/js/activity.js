$(document).ready(function () {
  // Reset all input fields
  $("#inputUser").val("");
  $("#allUser").val("");
  $("#allUser").focus();

  // Animate chick
  var bg_num = 1;
  setInterval(function () {
    bg_num++;
    if (bg_num > 2) {
      bg_num = 1;
    }
    $(".chick").css(
      "background-image",
      'url("./images/chick_' + bg_num + '.png")'
    );
  }, 500);
});

// Limit input to maximum length
function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

// Limit participants to a maximum of 10
$(document).on("keyup", "input[name^=inputUser]", function () {
  var val = $(this).val();
  if (val.replace(/[0-9]/g, "").length > 0) {
    $(this).val("");
  }

  if (val == "") {
    return;
  }

  if (val < 1 || val > 10) {
    alert("Please enter a number between 1 and 10.");
    $(this).val("");
    return;
  }
});

// Limit total students to a maximum of 40
$(document).on("keyup", "input[name^=allUser]", function () {
  var val = $(this).val();
  if (val.replace(/[0-9]/g, "").length > 0) {
    $(this).val("");
  }

  if (val == "") {
    return;
  }

  if (val < 1 || val > 40) {
    alert("The number of students cannot exceed 40.");
    $(this).val("");
    return;
  }
});

// Handle Enter key (same as clicking the Start button)
$("#inputUser").on("keydown", function (e) {
  if (e.which == 13 || e.keyCode == 13) {
    output_result();
  }
});

$(".activity_bg_body_right").on("click", function () {
  output_result();
});

// Start drawing
function output_result() {
  var all = $("#allUser").val();
  var setNum = $("#inputUser").val();

  if (setNum == null || setNum == "" || all == null || all == "") {
    if (all == "") {
      alert("Please enter the total number of students.");
      $("#allUser").focus();
    } else if (setNum == "") {
      alert("Please enter the number of participants.");
      $("#inputUser").focus();
    }
    return;
  } else if (setNum == "0") {
    alert("Please enter at least one participant.");
    $("#inputUser").val("");
    $("#inputUser").focus();
    return;
  } else if (parseInt(all) < parseInt(setNum)) {
    alert(
      "The number of participants cannot exceed the total number of students."
    );
    $("#inputUser").val("");
    $("#inputUser").focus();
    return;
  } else {
    make_egg(all);
  }
}

// Create eggs
function make_egg(all) {
  // Hide input screen and show result screen
  $("#activity_wrap").css("display", "none");
  $("#activity_result_wrap").css("display", "block");

  var _html = "";
  for (var i = 1; i <= all; i++) {
    _html +=
      '<div class="egg_straw"><div class="result_egg egg_' +
      i +
      '"></div><div class="result_straw"></div></div>';
  }
  $("#egg_wrap").append(_html);
}

// Reset
$("#reset_btn").on("click", function () {
  do_reset_btn();
});

// Reset button functionality
function do_reset_btn() {
  $("#egg_wrap").empty();
  $("#result_egg_wrap").empty();
  $("#allUser").val("");
  $("#inputUser").val("");
  $("#activity_wrap").css("display", "block");
  $("#activity_result_wrap").css("display", "none");
  $("#activity_result_btn").css("display", "block");
  $("#reset_btn").css("margin", "0 5%");
}

function activity_result_action(result) {
  var setNum = $("#inputUser").val();
  // Generate result HTML
  var _html = "";
  for (var r = 0; r < setNum; r++) {
    // Display result at the bottom
    var num = Math.floor(Math.random() * 4) + 1;
    _html +=
      '<div class="result_eggs result_eggs_' +
      num +
      '"><span class="re_num">' +
      result[r] +
      "</span></div>";

    // Hide top egg positions
    $(".egg_" + result[r])
      .stop(true)
      .css({ opacity: 1 })
      .animate({ opacity: 0 }, 800);
  }

  $("#result_egg_wrap").append(_html);
  $(".result_eggs")
    .stop(true)
    .css({ opacity: 0 })
    .animate({ opacity: 1 }, 1000);
}

// Hide buttons
function hide_buttons() {
  $("#activity_result_btn").css("display", "none");
  $("#reset_btn").css("margin", "0 30%");
}

// Start breaking eggs
$("#activity_result_btn").on("click", function () {
  // Prevent multiple clicks by hiding buttons
  hide_buttons();

  var all = $("#allUser").val();
  var setNum = $("#inputUser").val();
  // Generate random numbers
  var result = [];
  var n = 0;
  while (n < setNum) {
    var num = Math.floor(Math.random() * all) + 1;
    if (!sameNum(num)) {
      result.push(num);
      n++;
    }
  }

  // Remove duplicates
  function sameNum(num) {
    for (var i = 0; i < setNum; i++) {
      if (num === result[i]) {
        return true;
      }
    }
    return false;
  }

  var result_str = "[" + result.join(",") + "]";

  // Add cracking motion to selected eggs
  egg_motion(result);

  // Show results after 2 seconds
  setTimeout_active(result);
});

function egg_motion(result) {
  var setNum = $("#inputUser").val();
  for (var v = 0; v < setNum; v++) {
    $(".egg_" + result[v]).css({
      "background-image": "url('./images/eggleak.png')",
    });
    $(".egg_" + result[v]).addClass("eggleak_motion");
  }
}

function setTimeout_active(result) {
  setTimeout(function () {
    activity_result_action(result);
  }, 2000);
}
