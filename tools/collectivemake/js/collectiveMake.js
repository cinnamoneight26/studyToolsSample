$(document).ready(function () {
  $("#modum").focus();
});
$(".alert_close").on("click", function () {
  alert_close();
});

function alert_close() {
  $(".alert_wrap").css("display", "none");
}
function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

// Group creation limit to 6 members
$(document).on("keyup", "input[name^=modum]", function () {
  var val = $(this).val();
  if (val.replace(/[0-9]/g, "").length > 0) {
    $(this).val("");
  }
  if (val == "") {
    return;
  }
  if (val < 2 || val > 6) {
    alert("Please enter a number between 2 and 6.");
    $(this).val("");
    return;
  }
});
// Enter key event (same functionality as the start button click)
$("#modum").on("keydown", function (e) {
  if (e.which == 13 || e.keyCode == 13) {
    output_result();
  }
});
// Click result
$("#reset_btn").on("click", function () {
  output_result();
});

function output_result() {
  var setNum = $("#modum").val();
  if (setNum == null || setNum == "") {
    alert("Please enter a number between 2 and 6.");
    $("#modum").focus();
    return false;
  } else {
    $("#cm_wrap").css("display", "none");
    $("#cm_result_wrap").css("display", "block");

    // margin-top
    switch (setNum) {
      case "2":
        $("#cr_bg_wrap").css("margin-top", "14%");
        break;
      case "3":
        $("#cr_bg_wrap").css("margin-top", "11%");
        break;
      case "4":
        $("#cr_bg_wrap").css("margin-top", "7%");
        break;
      case "5":
        $("#cr_bg_wrap").css("margin-top", "4%");
        break;
      case "6":
        $("#cr_bg_wrap").css("margin-top", "0");
        break;
      default:
        $("#cr_bg_wrap").css("margin-top", "0");
    }

    // Create branches
    var _html = "";
    var beans_htmls = "";
    for (var index = 1; index <= 10; index++) {
      beans_htmls +=
        "<div class='acorns acorns_hide' index='" + index + "'></div>";
    }
    for (var i = 1; i <= setNum; i++) {
      var branchs;
      if (i % 2 == 1) {
        branchs = "branch_odd";
      } else {
        branchs = "branch_even";
      }
      _html +=
        "<div id='branch_" +
        i +
        "' class='branch " +
        branchs +
        "'><input type='text' id='modum_" +
        i +
        "' class='inp_tx_st' name ='name' value='" +
        i +
        " group' maxlength='3'><div id='branch_wrap'>" +
        beans_htmls +
        "</div></div>";
    }
    $("#cr_bg_wrap").append(_html);
  }
}

// Change group name
$(document).on("keyup", "input[name^=name]", function () {
  var val = $(this).val();
  var get_id = $(this).attr("id");

  if ($("#" + get_id).val().length > $("#" + get_id).attr("maxlength")) {
    alert("You cannot enter more than three characters.");
    $("#" + get_id).val(
      $("#" + get_id)
        .val()
        .substr(0, $("#" + get_id).attr("maxlength"))
    );
  }
});

// Acorn toggle function
function on_click_acorns(pod_id, bean_index) {
  var $bean = $("#" + pod_id + " .acorns[index='" + bean_index + "']");
  if ($bean.hasClass("acorns_hide")) {
    $bean.addClass("acorns_show");
    $bean.removeClass("acorns_hide");
  } else {
    $bean.addClass("acorns_hide");
    $bean.removeClass("acorns_show");
  }
}

// Acorn click
$(document).on("click", ".acorns", function () {
  var pod_id = $(this).parent().parent().attr("id");
  var bean_index = $(this).attr("index");
  on_click_acorns(pod_id, bean_index);
});

// View result
function on_click_result_view() {
  var modum_num = $("#modum").val();
  // Reset
  $("#best_modum").html("");

  // If there are no acorns, cancel
  if ($(".branch").children("div").children(".acorns_show").length == 0) {
    alert("No group has earned points.");
    return;
  }

  var num_arr = [];
  // Find the group with the most acorns
  for (var n = 1; n <= modum_num; n++) {
    // Get the number of acorns and store it in an array
    num_arr.push(
      $("#branch_" + n)
        .children("div")
        .children(".acorns_show").length
    );
  }
  // Get the highest number
  var best_num = Math.max.apply(null, num_arr);

  // Find the group with the most acorns
  var best_text = new Array();
  for (var b = 1; b <= modum_num; b++) {
    if (
      $("#branch_" + b)
        .children("div")
        .children(".acorns_show").length == best_num
    ) {
      best_text.push(
        $("#branch_" + b)
          .children("input")
          .val()
      );
    }
  }
  // Add group names to the screen
  var _html = "";
  for (var k = 0; k <= best_text.length - 1; k++) {
    _html += '<span class="modum_text">' + best_text[k] + "</span>";
  }
  $("#best_modum").append(_html);

  // Change position based on the number of groups
  switch (best_text.length) {
    case 1:
      $("#best_modum").width("100%");
      $("#best_modum").css("left", "34%");
      $("#best_modum").css("top", "50%");
      $(".modum_text").width("30%");
      break;
    case 2:
      $("#best_modum").width("100%");
      $("#best_modum").css({ left: "14%", top: "50%" });
      $(".modum_text").width("30%");
      $(".modum_text").css("margin", "0 3%");
      break;
    case 3:
      $("#best_modum").width("100%");
      $("#best_modum").css("left", "2%");
      $(".modum_text").width("30%");
      $("#best_modum").css("top", "50%");
      $(".modum_text").css("margin", "0 0.8%");
      break;
    case 4:
      $("#best_modum").width("100%");
      $("#best_modum").css("left", "14%");
      $("#best_modum").css("top", "41%");
      $(".modum_text").width("30%");
      $(".modum_text").css("margin", "1% 3%");
      break;
    case 5:
      $("#best_modum").width("100%");
      $("#best_modum").css("left", "2%");
      $("#best_modum").css("top", "35%");
      $(".modum_text").width("30%");
      $(".modum_text").css({ margin: "1% 0.8%", top: "20%" });
      $(".modum_text").eq(3).css("left", "16%");
      $(".modum_text").eq(4).css("left", "17%");
      break;
    case 6:
      $("#best_modum").width("100%");
      $("#best_modum").css("left", "2%");
      $("#best_modum").css("top", "35%");
      $(".modum_text").width("30%");
      $(".modum_text").css({ margin: "1% 0.8%", top: "20%" });
      break;
    default:
  }
  // Open modal
  $("#cm_modal").css("display", "block");
}

// Check result
$(document).on("click", "#result_view", function () {
  on_click_result_view();
});

function on_click_reset() {
  // window.open('collectiveMake.html', '_self');
  var urls = location.href.split("/");
  urls[urls.length - 1] = "index.html";
  var open_url = urls.join("/");
  window.location.href = open_url;
}

// Go to the beginning
$("#reset").on("click", function () {
  on_click_reset();
});

function on_click_popup_close() {
  $("#cm_modal").css("display", "none");
}

// Close modal
$(".popup_close").on("click", function () {
  on_click_popup_close();
});
