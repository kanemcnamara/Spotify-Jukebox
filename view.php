<?php require('res/connect.php'); ?>
<?php
	if(isset($_POST['btn-update']))
	{
		 $conn = mysqli_connect($host, $user, $password, $datbase);
		 $id = $_POST['id'];
		 $status = $_POST['status'];
		mysqli_query($conn,"UPDATE requests SET status = $status WHERE id = $id");
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link rel="icon" href="res/img/icon.ico"> <!--Favicon File path here -->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="refresh" content="60" >
	<link rel="stylesheet" type="text/css" href="res/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="res/css/bootstrap-theme.min.css">
	<title>View Requests</title>
</head>
<body>
	<p1> <a href="/" class="btn btn-warning" >Back to Song Request</a></p1>
	<h1>
	<div id="img" style="display: block; margin: auto; width: 20%;">
				<img src="res/img/logolong.png" alt="logo" style="text-align: center; max-width: 100%; height: auto;">
	</div>
	</h1>
  <h1 style="text-align:center"> Song Request - View </h1>
<center>

<div id="body">
 <div id="content">
    <table align="center" class="table table-striped">
    <tr>
		<th>Request No </th>
    <th>Title</th>
    <th>Artist</th>
		<th>Explicit?</th>
    <th>Time Requested</th>
    <th>Status</th>
		<th>Played</th>
		<th>Spotify Link</th>
    </tr>
    <?php
 $conn = mysqli_connect("localhost", $user, $password, $datbase);
 $sql ="SELECT * FROM requests ORDER BY id ASC";
 $result=($conn, $sql);
 //while($row=mysql_fetch_row($result_set))
 {
 ?>
        <tr>
				<td><?php echo $row[0]; ?></td>
        <td><?php echo $row[1]; ?></td>
        <td><?php echo $row[2]; ?></td>
					<?php if($row[7] == true) { ?>
					<td class="label-danger";>Explicit</td>
					<?php } else { ?>
					<td class="label-success">Clean</td>
					<? } ?>
				<td><?php echo $row[5]; ?></td>
					<?php if($row[6] == 1) { ?>
					<td>Played</td>
					<td align="center">
						<form name="update_status" method="post" action="<?php echo $_POST['PHP_SELF']; ?>">
							<input type="hidden" name="id" value="<?php echo $row[0]; ?>">
							<input type="hidden" name="status" value="0">
							<input class="btn btn-xs btn-danger" type="submit" id="btn-update" name="btn-update" value="Mark Not Played">
						</form>
					</td>
				<?php } else { ?>
					<td>Not Played</td>
					<td align="center">
						<form name="update_status" method="post" action="<?php echo $_POST['PHP_SELF']; ?>">
							<input type="hidden" name="id" value="<?php echo $row[0]; ?>">
							<input type="hidden" name="status" value="1">
							<input class="btn btn-xs btn-success" type="submit" id="btn-update" name="btn-update" value="Mark Played">
						</form>
					</td>
				<? } ?>
				<td> <a class="btn btn-xs btn-info" href=<?php echo $row[3]; ?> > Open In Spotify</a></td>
				</tr>
				
        <?php
 }
 ?>
    </table>
    </div>
</div>

</center>
</body>

</html>