<?php
include "conn.php";

$pagesize = 16; //单个页面展示的数据条数

$sql = "select * from taobaogoods"; //获取所有的数据
$result = $conn->query($sql); //获取数据的结果集(记录集)

$num = $result->num_rows; //记录集的总条数

$pagenum = ceil($num / $pagesize); //获取页数


//获取前端的传来的页面，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}

$page = ($pagevalue - 1) * $pagesize;


$sql1 = "select * from taobaogoods limit $page,$pagesize";
$res = $conn->query($sql1);


$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口