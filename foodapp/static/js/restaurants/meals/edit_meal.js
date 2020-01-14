var formData = new FormData();
var csrftoken = getCookie("csrftoken");

$('#save_meal').on('click', function () {

  const selectedFile = document.getElementById('meal_image').files[0];
  let imgSrc = $('#meal_show').attr('src').split('/');
  let img

  if (selectedFile == undefined) {
    img = imgSrc[2]

  } else {
    img = document.getElementById("meal_image").files[0].name
  }

  formData.append('name', $('#name').val())
  formData.append('pk', $('#pk').val())
  formData.append('description', $('#description').val())
  formData.append('price', $('#price').val())
  formData.append('category', $('#category').val())
  formData.append('meal_image', img)
  formData.append("csrfmiddlewaretoken", csrftoken)

  $.ajax({
    type: 'POST',
    url: '/save_edited_meal/',
    processData: false,
    contentType: false,
    data: formData,
  }).done(function (res) {
    if (res.status == 'success') {
      $("#success_notification").addClass("show-toast");
      setTimeout(function () {
        $("#success_notification").removeClass("show-toast");
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
