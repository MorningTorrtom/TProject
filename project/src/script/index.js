!function($){

    //懒加载和渲染猜你喜欢
    !function lazy() {
        const $gly=$('.gly_content');
        $.ajax({
            url:"http://localhost/project/php/listdata.php",
            dataType:'json'
        }).done(function (data){
            // console.log(data);
            let $strhtml = '';
            $.each(data,function (index,value) {
                $strhtml +=`<div class="product">
                <a href="#">
                    <img class="lazy" data-original="${value.url}" width="185" height="185">
                    <div class="produce_word">${value.title}</div>
                    <p>${value.price}</p>
                </a>
                </div>
                `;
            });
            $gly.html( $strhtml);

            $(function () {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });

        });
    }();

    !function () {
            const $name = $('.name');
        $.ajax({
            url:"http://localhost/project/php/assort.php",
            dataType:'json'
        }).done(function (d) {
            console.log(d);
            let $str='';
            let $li = '<div>';
            $.each(d,function (index,value) {
                let list = value.nav.split(',');
                console.log(list);
                $str += `
                  
                    <p>${value.title}</p>
                  
                `;
                $.each(list,function (index,value) {
                    $li += `
               <a href="list.html">${value}</a>                `;
                });

            });
            $('.produce_morelist .pro_sort').html($li);
            $name.html($str);
        });
    }();


    //轮播图
    !function scroll() {
        let $ul = $('.banner_scroll ul');
        $.ajax({
           url:'http://localhost/project/php/scroll.php',
            dataType: 'json'
        }).done(function (data) {
            let $list ='';
            $.each(data,function (index,value) {
                $list +=`
                 <li>
                 <a href="#">
                 <img src="${value.url}" alt="">
                 </a>
                 </li>
                `;
            });
            $ul .html($list);
             $ul.find('li').eq(0).show().siblings('li').hide();
        });

    }();
    let $num = 0;
    let $libtn = $('.scroll_btn');
    $libtn.on('mouseover',function () {
        $(this).addClass('active').siblings().removeClass('active');
      let $index = $(this).index();
      $('.banner_scroll li').eq($index).show("linear").siblings('li').hide();
      $num = $index;
    });
    function nextpage() {
        let $lilength= $libtn.length;
        if($num<$lilength) {
            $('.banner_scroll li').eq($num).show().siblings('li').hide();
            $libtn.eq($num).addClass('active').siblings().removeClass('active');
            $num++;
            if ($num === $lilength) {
                $num = 0;
            }
        }
    }
    let $setime = setInterval(function () {
        nextpage();
    },5000);

    $(".banner").mouseover(function(){
        clearInterval($setime);

    }).mouseout(function(){
        $setime = setInterval(function(){
            nextpage()
        },5000)

    });

    //商品分类
    const $li = $('#category li');
    const $list =$('.list_detail');
    const $pro_list = $('.produce_morelist');
    const $banner = $('.banner_category');


    $li.on('mouseover',function () {
        $(this).addClass('.active').siblings('li').removeClass('.active');
        $list.show();
        if($(window).scrollTop()> $banner.offset().top){
            $list.css({
                top:  $(window).scrollTop() - $banner.offset().top
            })
        }else {
            $list.css({
                top: 0
            })
        }
        $pro_list.eq($(this).index()).show().siblings('.produce_morelist').hide();
    });
    $li.on('mouseout',function () {
        $(this).removeClass('.active');
        $list.hide();
    });
    $list.on('mouseover',function () {
            $(this).show();
    });
    $list.on('mouseout',function () {
              $(this).hide();
    });

    //楼梯导航
    let $stairs = $('.leftnav');//楼梯
    let $stairs_a = $('.box_nav_name');//楼梯的阶层
    let $stairs_nav = $('.content .stairs');//对应的内容

    let $top = $(window).scrollTop();
    $top>800? $stairs.show(): $stairs.hide();

    $(window).on('scroll',function () {
        let $top = $(window).scrollTop();
        $top>800? $stairs.show(): $stairs.hide();
        $stairs_nav.each(function (index,element) {
            let $stairstop = $stairs_nav.eq(index).offset().top +  $(element).height()/2;
            if ($stairstop> $top) {
                // console.log('阶层'+$stairstop+';滚条'+$top);
                $stairs_a.removeClass('showcolor');
                $stairs_a.eq(index).addClass('showcolor');
                return false;
            }
        })
    });
    $stairs_a.not('#left_bottom').on('click',function () {
        $(this).addClass('showcolor').siblings('a').removeClass('showcolor');
        let $atop = $stairs_nav.eq($(this).index()).offset().top;
        $('html,body').animate({
            scrollTop: $atop
        });
    });
    $('#left_bottom').on('click',function () {
        $('html,body').animate({
            scrollTop: 0
        });
    });


    //显示用户信息
    if (localStorage.getItem('username')){
        $('#login').hide();
        $('#registered').hide();
        $('#admin').show();
        $('#out').show();
        $('#admin span').html(localStorage.getItem('username'));
    }
    $('#out').on('click',function () {
        $('#login').show();
        $('#registered').show();
        $('#admin').hide();
        $('#out').hide();
        localStorage.removeItem('username');
    });

    //插入底部footer
    $(".footer").load("footer.html");
}(jQuery);

