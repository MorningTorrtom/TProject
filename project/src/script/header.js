!function () {
    if (localStorage.getItem('username')){
        $('#log_re').hide();
        $('#ad_out').show();
        $('#admin span').html(localStorage.getItem('username'));
    }
    $('#out').on('click',function () {
        $('#log_re').show();
        $('#ad_out').hide();
        localStorage.removeItem('username');
    });
}();