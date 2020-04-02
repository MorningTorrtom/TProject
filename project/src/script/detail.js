!function () {
    let $sid=location.search.substring(1).split('=')[1];
        console.log($sid);
    const $bpic = $('#picbig');//大图
    const $bf = $('#bf'); //大放
    const $spic = $('#pic_big');//小图
    const $sf = $('#smallf');//小放
    const $sphoto = $('#pic_small');
    const $titles = $('#title');
    const $money = $('.money');
    if (!$sid){
        $sid = 1;
    }

    $.ajax({
        url:"http://localhost/project/php/getid.php",
        data: {
            sid: $sid
        },
        dataType:'json'
    }).done(function (data) {
        $sphoto.attr('src',data.url);
        $sphoto.attr('sid',data.sid);
        $bpic.attr('src',data.url);
        $titles.html(data.title);
        $money.html(data.price);
        let picarr =data.picsb.split(',');
        let $strhtml = '';
        $.each(picarr,function (index,value) {
            $strhtml+='<li><img src="' + value + '"/></li>';

        });
        $(' #list .spic_list').html($strhtml);

    });


    $sf.width($spic.width() * $bf.width() / $bpic.width() );
    $sf.height($spic.height() * $bf.height() / $bpic.height() );
    let $proportion = $bpic.width() / $spic.width();
    $spic.hover(function () {
        $sf.css('visibility','visible');
        $bf.css('visibility','visible');
        $(this).on('mouseover',function (ev) {
            let $leftvalue = ev.pageX -$sf.width()/2- $('.pic').offset().left ;
            let $topvalue = ev.pageY- $sf.height()/2 -$('.pic').offset().top;
            if($leftvalue <0){
                $leftvalue = 0;
            }
            if ($leftvalue>$spic.width()-$sf.width()){
                $leftvalue=$spic.width()-$sf.width();
            }
            if($topvalue <0){
                $topvalue = 0;
            }
            if ($topvalue>$spic.height()-$sf.height()){
                $topvalue=$spic.height()-$sf.height();
            }
            $sf.css({
                top:$topvalue,
                left:$leftvalue
            });
            $bpic.css({
                top:-$topvalue*$proportion,
                left:-$leftvalue*$proportion
            })
        });
    },function () {
        $sf.css('visibility','hidden');
        $bf.css('visibility','hidden');
    });

    //点击小图，大图相应转换
    $('.spic_list').on('click','li',function () {
        let $imgurl = $(this).find('img').attr('src');
        $bpic.attr('src',$imgurl);
        $sphoto.attr('src',$imgurl);

    });


    let $num = 6;
    let $lilen = $('.spic_list').find('li');
    $('#leftbtn').on('click',function () {
        let $lilen = $('#list ul li');
       if ($num>6){
           $num--;
           $('.spic_list').animate({
               left: -($num - 6) * $lilen.eq(0).outerWidth(true)
           });
       }

    });
    $('#rightbtn').on('click',function () {
        let $lilen = $('.spic_list').find('li');
        if ($num<$lilen.length){
            $num++;
            $('.spic_list').animate({
                left: -($num - 6) * $lilen.eq(0).outerWidth(true)
            });
        }
    });

    let arrsid = [];
    let arrnum = [];
    function cookiearray() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',');
            arrnum = jscookie.get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    $('#shop').on('click',function () {
        let $sid = $(this).parents('.content_detail').find('#pic_small').attr('sid');
        console.log($sid);
        cookiearray();
        console.log($.inArray($sid,arrsid));
        if ($.inArray($sid,arrsid)!=-1){
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#counts').val());
            console.log(arrnum[$.inArray($sid, arrsid)]);
            arrnum[$.inArray($sid, arrsid)] = $num;//赋值
            jscookie.add('cookienum', arrnum, 10);
        }else{
            arrsid.push($sid);//将编号$sid push到arrsid数组中
            jscookie.add('cookiesid', arrsid, 10);
            arrnum.push($('#counts').val());//将数量push到arrnum数组中
            jscookie.add('cookienum', arrnum, 10);
        }
        window.location.href="../html/carshopping.html";
    });


}();