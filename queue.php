<html lang="en-us">

<head>
	<link rel="icon" href="res/img/kane.network.ico"> <!-- Link to .ico file -->
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="robots" content="noindex, nofollow">
	<meta name="googlebot" content="noindex, nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<meta name="theme-color" content="#121212">
	<script type="text/javascript" src="res/js/jquery-3.6.0.min.js"></script>
	<script type="text/javascript" src="res/js/handlebars.min-v4.7.7.js"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
	<link rel="stylesheet" type="text/css" href="res/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="res/css/queue.css?0.218">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<title>Song Request Queue</title>
</head>

<body>
	<div class="container" id="login-button-container">
		<div id="success-alert" class="alert alert-success" style="display:none;"></div>
		<div id="danger-alert" class="alert alert-danger" style="display:none;"></div>
		<div class="login-inner">
			<h2 class="login-title">Song Request Queue</h2>
			<button class="btn btn-primary" id="btn-login">Log in with Spotify</button>
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
			{{#each upcoming}}
			<div class="col">
			<img class="upcoming-artwork" src="{{ album.images.1.url }}">
			<h4>{{ name }}</h4>
			<h5 style="color:#bfbfbf">{{ artists.0.name }}</h5>
			</div>
			{{/each}}
		</div>
 	</script>
	<script id="currently-playing-artwork-template" type="text/x-handlebars-template">
		<img class="cp-art" src="{{ currently_playing.album.images.0.url }}" alt="{{ currently_playing.album.name }}">
  		</script>
	<script id="currently-playing-template" type="text/x-handlebars-template">
		<div class="cp-title">{{ currently_playing.name }}</div>
		<div class="cp-artist">{{ currently_playing.artists.0.name }}</div>
		<div class="cp-album">{{ currently_playing.album.name }}</div>
		</script>
	<script id="no-results-template" type="text/x-handlebars-template">
		nothing found!
  		</script>
	<script type="text/javascript" src="res/js/auth.js?0.218"></script>
	<script type="text/javascript" src="res/js/queue.js?0.218"></script>
	<!-- Scripts -->
</body>

</html>