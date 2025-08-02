var inputs = $("#comment");
var googleSubmitBtn = $("#google-submit");
var input_modal = $("#input_modal");

var inputName = $("#name");
var inputComment = $("#comment");
// var inputArea = $('#area');

function isLoading(status) {
  if (status) {
    $("html, body").addClass("wait");
    // googleSubmitBtn.attr("disabled", true).html("보내는중...");
    googleSubmitBtn
      .attr("disabled", true)
      .children("img")
      .attr("src", "../../assets/images/wait.svg");
  } else {
    $("html, body").removeClass("wait");
    // googleSubmitBtn.attr("disabled", false).html("보내기");
    googleSubmitBtn
      .attr("disabled", false)
      .children("img")
      .attr("src", "../../assets/images/submit.svg");
  }
}

function checkInput() {
  var isEmpty = false;
  var value = $("#comment").val().trim();
  $.each(inputs, function (index, element) {
    if (value === "") {
      alert("내용을 입력해주세요.");
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
    url: "https://script.google.com/macros/s/AKfycbwxNN5gPoMrtGJ9NyZuju6mBvxBKq1le6-FQeSKQBf7TNYLQTYUImJtH-yqC9otvQZH/exec",
    data: {
      // 이름: inputName.val(),
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
