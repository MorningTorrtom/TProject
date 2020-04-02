!function($){
const $username = $('#register-username');
const $pass = $('#register-password');
const $repass = $('#register-passwords');
const $email = $('#register-email');
let $usernameflag = true;
$username.on('blur',function () {
    $.ajax({
        type:'post',
        url:'http://localhost/project/php/registered.php',
        data:{
            username:$username.val()
        }
    }).done(function (data) {

        if (!data) {
            $('.user').hide();
                console.log($username.val());
            let  $reg = /^[a-zA-Z0-9_-]{4,16}$/ig;
            if(!$username.val() == '') {
                if ($reg.test($username.val()) == false ) {
                    $('.user').html('用户名格式错误');
                    $('.user').show();
                }else{
                    $('.user').hide();
                }
            }
            $usernameflag = true;
        } else {
            $('.user').show();
            $usernameflag = false;
        }
    })
});

//关于用户名input
function user(){
    if($username.val() == ''){
        $('.user').html('用户名不能为空');
        $('.user').show();
    }
}
//关于密码的input
function pass(){
    user();
        if($pass.val() == ''){
            $('.pass').html('密码');
            $('.pass').show();
        }
    }
//关于邮箱的input
 function email(){
    user();
    pass();
        if($email.val() == ''){
            $('.eamil').html('邮箱不能为空');
            $('.eamil').show();
        }
    }

$pass.on('focus',function () {
    user();
 });
$pass.on('blur',function () {
    if($repass.val() !=''){
        if($pass.val() != $repass.val() ){
            $('.passed').show();
        }else {
            $('.passed').hide();
        }
    }

    let  $reg1 = /^[a-zA-Z]\w{8,10}$/ig;
    if(!$pass.val() == '') {
        if ($reg1.test($pass.val()) == false ) {
            $('.pass').show();
        }else{
            $('.pass').hide();
        }
    }
    });
$repass.on('focus',function () {
    pass();
});
$repass.on('blur',function () {
      if($pass.val() != $repass.val() ){
        $('.passed').show();
      }else {
          $('.passed').hide();
      }
    });
 $email.on('blur',function () {
     let $reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
     if(!$email.val() == '') {
         if ($reg.test($email.val()) == false ) {
             $('.eamil').show();
         }else{
             $('.eamil').hide();
         }
     }
    });


$('form').on('submit',function () {
    email();
        if($username.val() == ''){
            $('.user').html('用户名不能为空');
            $('.user').show();
            $usernameflag = false;
        }else {
            $('.user').hide();
            $usernameflag = true;
        }
        if (!$usernameflag) {
        return false;
    }
})



}(jQuery);