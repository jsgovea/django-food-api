var formData = new FormData();
var csrftoken = getCookie("csrftoken");

$('#add_meal').on('click', function () {
  formData.append('name', $('#name').val())
  formData.append('description', $('#description').val())
  formData.append('price', $('#price').val())
  formData.append('category', $('#category').val())
  formData.append('meal_image', document.getElementById("meal_image").files[0].name)
  formData.append("csrfmiddlewaretoken", csrftoken)

  $.ajax({
    type: 'POST',
    url: '/restaurant_create_meal/',
    processData: false,
    contentType: false,
    data: formData,
  }).done(function (res) {
    if (res.status == 'success') {
      $("#account_notification").addClass("show-toast");
      setTimeout(function () {
        $("#account_notification").removeClass("show-toast");
      }, 1500);
      window.location.replace("/restaurant_meals/");
    } else {
      $("#toast-3").addClass("show-toast");
      setTimeout(function () {
        $("#toast-3").removeClass("show-toast");
      }, 1500);
    }
  })


})


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#meal_show').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function () {

  $("#meal_image").change(function () {
    readURL(this);
  });
});