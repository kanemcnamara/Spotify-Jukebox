<?php
  $host = "hostname_here";
  $user = "database_user";
  $password = "database_password";
  $datbase = "some_database_name";

  mysqli_connect($host,$user,$password);
  mysqli_select_db($datbase);
?>