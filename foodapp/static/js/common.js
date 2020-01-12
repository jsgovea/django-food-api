$('#nav-menu').on('click', function(){
  $('#menu-main').addClass('sidebar-active')
})

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
var csrftoken = getCookie("csrftoken");


$(document).ready(function() {
  let current_url = window.location.href;

  switch (current_url.split('/')[3]) {
    case 'restaurant_meals':
      $('#nav-meals').addClass('menu-item-active cc_pointer')
      break;
    case '':
    $('#nav-account').addClass('menu-item-active cc_pointer')
    break;
    case 'nav-reports':
    $('#nav-orders').addClass('menu-item-active cc_pointer')
    break;
    default:
  }
});
