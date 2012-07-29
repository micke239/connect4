$('#userName').blur(function() {
    if ($(this).val() === '') {
        $(this).val('choose a user name');
        $(this).addClass('blurred');
    }
});

$('#userName').focus(function() {
    if ($(this).val() === 'choose a user name') {
        $(this).val('');
        $(this).removeClass('blurred');
    }
});
/*
$('#pwd').blur(function() {
    if ($(this).val() === '') {
        $(this).val('password');
        $(this).addClass('blurred');  
    } 
});

$('#pwd').focus(function() {
    if ($(this).val() === 'password') {
        $(this).val('');        
        $(this).removeClass('blurred');
    }
});*/