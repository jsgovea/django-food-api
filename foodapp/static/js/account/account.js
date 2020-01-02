var formData = new FormData();
var csrftoken = getCookie("csrftoken");

$("#save_account").on("click", function() {
  formData.append("name", $("#name").val());
  formData.append("phone", $("#phone").val());
  formData.append("address", $("#address").val());
  formData.append("category", $("#category").val());
  formData.append("city", $("city").val());
  formData.append("email", $("#email").val());
  formData.append("logo", $("#logo").get(0).files[0]);
  formData.append("csrfmiddlewaretoken", csrftoken);

  $.ajax({
    type: "POST",
    url: "/update-account/",
    processData: false,
    contentType: false,
    data: formData,
    error: function(xhr, ajaxOptions, thrownError) {}
  }).done(function(res) {
    console.log(res.status);
    if(res.status == 'success'){
      for (var value of formData.values()) {
        $('#restaurant_name').text(formData.get('name'))
      }
      $("#account_notification").addClass("show-toast");
      setTimeout(function() {
        $("#account_notification").removeClass("show-toast");
      }, 1500);
    } else {
      $("#toast-3").addClass("show-toast");
      setTimeout(function() {
        $("#toast-3").removeClass("show-toast");
      }, 1500);
    }

  }
);

  // $('#account_notification').addClass('show-toast')
  // setTimeout(function () { $('#account_notification').removeClass("show-toast"); }, 1500);
});
