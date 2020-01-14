var formData = new FormData();
var csrftoken = getCookie("csrftoken");

$("#save_account").on("click", function () {


  const selectedFile = document.getElementById('logo-img').files[0];
  let imgSrc = $('#restaurant-logo').attr('src').split('/');
  let img

  if (selectedFile == undefined) {
    img = imgSrc[2]

  } else {
    img = document.getElementById("meal_image").files[0].name
  }

  formData.append("name", $("#name").val());
  formData.append("phone", $("#phone").val());
  formData.append("address", $("#address").val());
  formData.append("category", $("#category").val());
  formData.append("city", $("#city").val());
  formData.append("email", $("#email").val());
  formData.append("logo", img);
  formData.append("csrfmiddlewaretoken", csrftoken);

  $.ajax({
    type: "POST",
    url: "/update-account/",
    processData: false,
    contentType: false,
    data: formData,
    error: function (xhr, ajaxOptions, thrownError) {
      $("#toast-3").addClass("show-toast");
      setTimeout(function () {
        $("#toast-3").removeClass("show-toast");
      }, 1500);
    }
  }).done(function (res) {
    if (res.status == 'success') {
      for (var value of formData.values()) {
        $('#restaurant_name').text(formData.get('name'))
      }
      $("#account_notification").addClass("show-toast");
      setTimeout(function () {
        $("#account_notification").removeClass("show-toast");
      }, 1500);
    } else {
      $("#toast-3").addClass("show-toast");
      setTimeout(function () {
        $("#toast-3").removeClass("show-toast");
      }, 1500);
    }

  }
  );

  // $('#account_notification').addClass('show-toast')
  // setTimeout(function () { $('#account_notification').removeClass("show-toast"); }, 1500);
});



function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#restaurant-logo').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function () {

  $("#logo-img").change(function () {
    readURL(this);
  });
});