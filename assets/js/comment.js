var inputs = $('input[type="text"]');
var googleSubmitBtn = $("#google-submit");
var input_modal = $("#input_modal");

var inputName = $("#name");
var inputComment = $("#comment");
// var inputArea = $('#area');

function isLoading(status) {
  if (status) {
    $("html, body").addClass("wait");
    googleSubmitBtn.attr("disabled", true).html("보내는중...");
  } else {
    $("html, body").removeClass("wait");
    googleSubmitBtn.attr("disabled", false).html("보내기");
  }
}

function checkInput() {
  var isEmpty = false;
  $.each(inputs, function (index, element) {
    if (element.value === "") {
      alert("입력하지 않은 칸이 있어요.");
      isEmpty = true;
      return false;
    }
  });
  return isEmpty;
}

$("#google-submit").click(function () {
  //빈값 체크
  if (checkInput()) {
    return;
  }

  // 입력중..
  isLoading(true);

  $.ajax({
    type: "GET",
    url: "https://script.google.com/macros/s/AKfycbyEo4mCfa1Ly3Gmo6OLEcfIM6vRF_GEXjVJCt0vGrlUDY8p7FP_MXt2wg9spHeY_1hb/exec",
    data: {
      이름: inputName.val(),
      내용: inputComment.val(),
      //   "사는곳": inputArea.val()
    },
    success: function (response) {
      isLoading(false);

      input_modal.html("저장되었습니다.").addClass("show");
      // location.reload();
      setTimeout(function () {
        input_modal.removeClass("show");
      }, 4000);

      //값 비워주기
      inputName.val("");
      inputComment.val("");
      //   inputArea.val('');
    },
    error: function (request, status, error) {
      isLoading(false);
      console.log("code:" + request.status + "\n" + "error:" + error);
      console.log(request.responseText);
    },
  });
});
