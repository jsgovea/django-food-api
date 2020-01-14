var formData = new FormData();
var csrftoken = getCookie("csrftoken");

$('.id').on('click', function () {
    $.ajax({
        type: "POST",
        url: "/change_order_status/",
        data: {
            'csrfmiddlewaretoken': csrftoken,
            'id': $('input[name=id]').val()
        },
        success: function (response) {
            $('#success-alert').attr('hidden', false);
            location.reload()
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#error-alert').attr('hidden', false)
            setTimeout(function () {
                $('#error-alert').attr('hidden', true)
            }, 3000);

        }
    });
})