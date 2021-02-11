<head>
	<link rel="icon" href="res/img/icon.ico"> <!-- Link to .ico file -->
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="robots" content="noindex, nofollow">
	<meta name="googlebot" content="noindex, nofollow">
	 
	<meta name="viewport" content="width=device-width, initial-scale=0.9">

	<script type="text/javascript" src="res/jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="res/handlebars.min.js"></script>
	<link rel="stylesheet" type="text/css" href="res/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="res/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="res/css/style.css">
	<link rel="stylesheet" type="text/css" href="res/css/base.css">

	<style type="text/css">
		body {
			padding: 20px;
		}

		#search-form,
		.form-control {
			margin-bottom: 20px;
		}

		.cover {
			width: 300px;
			height: 300px;
			display: inline-block;
			background-size: cover;
		}

		.cover:hover {
			cursor: pointer;
		}

		.cover.playing {
			border: 5px solid #e45343;
		}

		body {
			background-position: center;
			background-attachment: scroll;
			background-color: white;
			background-size: cover;
		}

		img {
			max-width: 100%;
			height: auto;
		}
	</style>
	<title>Song Request</title>
</head>

<body>
	<!-- Content -->
	<div class="container">
		<div id="img" style="display: block; margin: auto; width: 20%; padding-top: 20px;">
			<img src="res/img/spotify.png" alt="logo" style="text-align: center; max-width: 100%; height: auto;">
			<h2 style="color: black; padding-top: 30px;">Song Request</h2>
		</div>
		<div style="text-align:center" id="login-button-container">
			<button class="btn btn-primary" id="btn-login">Login</button>
		</div>

		<div id="controls">
			<div id="logged-in-content-container">
				<p style="color: black;">Type a song or artist name and hit "Search".</p>
				<form id="search-form" name="search">
					<input type="text" id="query" value="" class="form-control" placeholder="Song / Artist Name" style="text-align:center" />
					<input type="submit" id="search" name="search" class="btn btn-success btn-lg" value="Search" />
				</form>


			</div>
		</div>
		<div style="padding-top: 30px" id="results"></div>

	</div>
	<!-- Content -->

	<!-- Results -->
	<script id="results-template" type="text/x-handlebars-template">
		<div style="padding-top: 30px; padding-bottom: 20px" class="row">
				<div class="col-sm-4" style="color:black; text-align:center; font-size: 150%; font-weight: bold;"> Track Name </div>
				<div class="col-sm-4" style="color:black; text-align:center; font-size: 150%; font-weight: bold;"> Artist </div>
				<div class="col-sm-4" style="color:black; text-align:center; font-size: 150%; font-weight: bold;"> Request </div>
			</div>
    {{#each tracks.items}}
				<form name="submit_request" method="post" action="<?php echo $_POST['PHP_SELF']; ?>">
					<input type="hidden" name="spotify_id" value="{{id}}">
					<input type="hidden" name="spotify_uri" value="{{uri}}">
					<input type="hidden" name="spotify_title" value="{{name}}">
					<input type="hidden" name="spotify_artist" value="{{artists.0.name}}">
					<input type="hidden" name="explicit" value="{{explicit}}">

					<div class="row">
						<div class="col-sm-4" style="color:blck; font-size:120%;"> {{name}} </div>
						<div class="col-sm-4" style="color:black; font-size:120%;"> {{artists.0.name}} </div>
						<div class="col-sm-4" style="color:green;"> <input type="submit" class="btn btn-submit btn-sm" id="btn-request" name="btn-request" value="Request Song"> </div>
					</div> 
					
				</form>
			{{/each}}
  </script>

	<script id="no-results-template" type="text/x-handlebars-template">
		nothing found!
  </script>
	<!-- Results -->
	<!-- Scripts -->
	<script type="text/javascript" src="res/js/jquery-3.2.1.js"></script>
	<script type="text/javascript" src="res/handlebars.min.js"></script>
	<script type="text/javascript" src="res/js/auth.js"></script>
	<script type="text/javascript" src="res/js/base.js"></script>
	<script type="text/javascript" src="res/js/query.js"></script>
	<!-- Scripts -->
</body>

</html>