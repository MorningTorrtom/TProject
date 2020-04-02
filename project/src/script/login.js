!function($){

    const $btn=$('.btn_box');//切换按钮
    const $btnlogin = $('.btn');
    const $box1=$('#box_center_1');
    const $box2=$('#box_center_2');
    $btn.on('click',function () {
            if( $box1.hasClass("show") ){
                // 执行隐藏
                $box1.hide().removeClass("show");
                $box2.show().addClass("show");
            }else{
                // 显示
                $box2.hide().removeClass("show");
                $box1.show().addClass("show");
            }
    });

    $btnlogin.on('click',function () {
        $.ajax({
            url:"http://localhost/project/php/login.php",
            type:'post',
            data:{
                user:$('.username').val(),
                pass:$('.password').val()
            }
        }).done(function (data) {
            if(data){
                location.href = 'index.html';
                localStorage.setItem('username', $('.username').val());
            }else{
                $('.password').val('');
                alert('用户名或者密码错误');
            }
        })
    });

}(jQuery);