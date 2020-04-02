!function($){
        const $box = $('.box');
        let $arr_d =[]; //排序前的数组
        let $array =[];//排序时的数组
        let $pre =null;
        let $next =null;
    $.ajax({
        url:'http://localhost/project/php/list.php',
        dataType:'json'
    }).done(function (data) {
        console.log(data);
        let $str = '';
        $.each(data,function (index,value) {
                $str += `
               <div class="list_all">
               <div class="list_img">
                   <a href="detail.html?sid=${value.sid}" target="_blank">
                       <img img class="lazy" data-original="${value.url}" alt="">
                   </a>
               </div>
                <div class="price">￥<i>${value.price}</i></div>
                <div class="title"><a href="#">${value.title}</a></div>
                <div class="sale">销量<i id="sale_num">${value.sailnumber}</i></div>
            </div>
                `;
            $box.html($str);

            //懒加载
            $(function () {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });

            //存储排序所需数据
            $('.list_all').each(function (index,element) {
                $array[index] = $(this);
                $arr_d[index] =$(this);
            });

        });
    });

        $('#page_list').pagination({
            pageCount: 2,//总的页数
            jump: true,//是否开启跳转到指定的页数，布尔值。
            coping: true,//是否开启首页和尾页，布尔值。
            prevContent: '上一页',
            nextContent: '下一页',
            homePage: '首页',
            endPage: '尾页',
            callback:function (api) {
                $.ajax({
                    url:'http://localhost/project/php/list.php',
                    data:{
                        page:api.getCurrent()
                    },
                    dataType: 'json'
                }).done(function (data) {
                    let $str = '';
                    $.each(data,function (index,value) {
                        $str += `
                               <div class="list_all">
                               <div class="list_img">
                                   <a href="detail.html?sid=${value.sid}" target="_blank">
                                       <img img class="lazy" data-original="${value.url}" alt="">
                                   </a>
                               </div>
                                <div class="price">￥<i>${value.price}</i></div>
                                <div class="title"><a href="#">${value.title}</a></div>
                                <div class="sale">销量<i id="sale_num">${value.sailnumber}</i></div>
                            </div>
                `;
                        $box.html($str);

                        //懒加载
                        $(function () {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                        //存储排序所需数据
                        $('.list_all').each(function (index,element) {
                            $array[index] = $(this);
                            $arr_d[index] =$(this);
                        });

                    });
                });

            }
        });

        //排序
        $('.sort_cur').eq(0).on('click',function () {
            $.each($arr_d,function (index,value) {
                $box.append(value);

            });
            return;
        });
        $('.sort_cur').eq(3).on('click',function () {

                for (let i=0;i<$array.length-1;i++){
                    for(let j=0;j<$array.length-1-i;j++){
                        $pre=parseFloat($array[j].find('#sale_num').html());
                        $next=parseFloat($array[j+1].find('#sale_num').html());
                        if($pre>$next){
                            let $temp=$array[j];
                            $array[j] =  $array[j+1];
                            $array[j+1] =$temp;
                        }
                    }
                }
                $box.empty();
            $.each($array,function (index,value) {
                $box.append(value);

            });

        });

    $('.last').on('click',function () {

        for (let i=0;i<$array.length-1;i++){
            for(let j=0;j<$array.length-1-i;j++){
                $pre=parseFloat($array[j].find('#sale_num').html());
                $next=parseFloat($array[j+1].find('#sale_num').html());
                if($pre<$next){
                    let $temp=$array[j];
                    $array[j] =  $array[j+1];
                    $array[j+1] =$temp;
                }
            }
        }
        $box.empty();
        $.each($array,function (index,value) {
            $box.append(value);

        });

    });



}(jQuery);