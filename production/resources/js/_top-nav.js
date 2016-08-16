$(document).ready(function() {
    var collapsed = true
    $('#navbar-dropdown-button').click(function() {
        collapsed ? $('#navbar-dropdown-menu').removeClass('hide') : $('#navbar-dropdown-menu').addClass('hide');
        collapsed = !collapsed;
    });
});