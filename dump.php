<?php require('res/connect.php'); ?>
<?php
	if(isset($_POST['btn-dump']))
	{
	//Create Connection to Database
	$conn = mysqli_connect($host, $user, $password, $datbase);
	//Create Connection to Database
 
  //sql for truncating table
	mysqli_query($conn,'TRUNCATE table requests;');
	//sql for truncating table
  } 

 ?>

<script>
function clicked(e)
{  if(!confirm('Are you sure you want to delete requests?'))e.preventDefault();
 
}

</script>

<html>
	<link rel="icon" href="res/img/rjfavicon.ico">
	<link rel="stylesheet" type="text/css" href="res/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="res/css/bootstrap-theme.min.css">
  <head>
    <style>
      form {
              position: fixed;
              top: 50%;
              left: 50%;
              margin-top: -25px; 
              margin-left: -55px;
      }
    </style>
    <title>Erase Requests</title>
  </head>
  <body>
		 


    <form align="center" name="erase-requests" method="post" action="<?php echo $_POST['PHP_SELF']; ?>">
      <input class="btn btn-lg btn-danger" type="submit" id="btn-dump" name="btn-dump" value="Erase Requests" onclick="clicked(event)">
    </form>
  </body>
</html>