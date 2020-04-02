<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from registry1903 where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['registerSubmit'])) {
    $username = $_POST['registeruser'];
    $password = sha1($_POST['registerPassword']);
    $email = $_POST['registerEmail'];
      echo $username,$password,$email;
    $conn->query("insert registry1903 values(null,'$username','$password','$email',NOW())");
   header('location:http://localhost/project/dist/html/login.html');
}
