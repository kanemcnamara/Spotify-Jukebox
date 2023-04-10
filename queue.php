<html lang="en-us">

<head>
	<link rel="icon" href="res/img/kane.network.ico"> <!-- Link to .ico file -->
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="robots" content="noindex, nofollow">
	<meta name="googlebot" content="noindex, nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=0.9">
	<script type="text/javascript" src="res/js/jquery-3.6.0.min.js"></script>
	<script type="text/javascript" src="res/js/handlebars.min-v4.7.7.js"></script>
	<link rel="stylesheet" type="text/css" href="res/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="res/css/queue.css">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-wed-app-status-bar-style" content="black" />
	<meta name="viewport" content="width=device-width">

	<title>Song Request Queue</title>
</head>

<body>
	<div class="container" id="login-button-container">
		<div id="success-alert" class="alert alert-success" style="display:none;"></div>
		<div id="danger-alert" class="alert alert-danger" style="display:none;"></div>
		<div style="display: block; margin: auto;">
			<h2 style="color: black; padding-top: 30px;">Song Request Queue - Overview Screen</h2>
		</div>
		<div style="text-align:center">
			<button class="btn btn-primary" id="btn-login">Login</button>
		</div>
	</div>
	<div class="bg" id="overview-bg"></div>
	<div class="container" id="overview">
		<div class="row" id="currently-playing">
			<div class="col-md-6" id="currently-playing-artwork">
			</div>
			<div class="col-md-6" id="currently-playing-details">
			</div>
		</div>
		<div class="row" id="upcoming-tracks">
		</div>
	</div>
	<script id="upcoming-tracks-template" type="text/x-handlebars-template">
		<h3>Coming Up...</h3>
		<div class="row">
			<div class="col">
			<img class="upcoming-artwork" src="{{ queue.0.album.images.1.url }}">
			<h4>{{ queue.0.name }}</h4>
			<h5 style="color:#bfbfbf">{{ queue.0.artists.0.name }}</h5>
			</div>
			<div class="col">
			<img class="upcoming-artwork" src="{{ queue.1.album.images.1.url }}">
			<h4>{{ queue.1.name }}</h4>
			<h5 style="color:#bfbfbf">{{ queue.1.artists.0.name }}</h5>
			</div>
			<div class="col">
			<img class="upcoming-artwork" src="{{ queue.2.album.images.1.url }}">
			<h4>{{ queue.2.name }}</h4>
			<h5 style="color:#bfbfbf">{{ queue.2.artists.0.name }}</h5>
			</div>
			<div class="col">
			<img class="upcoming-artwork" src="{{ queue.3.album.images.1.url }}">
			<h4>{{ queue.3.name }}</h4>
			<h5 style="color:#bfbfbf">{{ queue.3.artists.0.name }}</h5>
			</div>
			<div class="col">
			<img class="upcoming-artwork" src="{{ queue.4.album.images.1.url }}">
			<h4>{{ queue.4.name }}</h4>
			<h5 style="color:#bfbfbf">{{ queue.4.artists.0.name }}</h5>
			</div>
		</div>
 	</script>
	<script id="currently-playing-artwork-template" type="text/x-handlebars-template">
		<img src="{{ currently_playing.album.images.1.url }}">
  		</script>
	<script id="currently-playing-template" type="text/x-handlebars-template">
		<table style="text-align:center;">
			<tr>
				<td><h1 style="color:white">{{ currently_playing.name }}</h1></td>
			</tr>
			<tr>
				<td><h2 style="color:white">{{ currently_playing.artists.0.name }}</h2></td>
			</tr>
			<tr>
				<td><h4 style="color:#acacac">{{ currently_playing.album.name }}</h4></td>
			</tr>
				<table>
		</script>
	<script id="no-results-template" type="text/x-handlebars-template">
		nothing found!
  		</script>
	<script type="text/javascript" src="res/js/auth.js?0.213"></script>
	<script type="text/javascript" src="res/js/queue.js?0.1"></script>
	<!-- Scripts -->
</body>

</html>