<html>
<head>
	<link rel="icon" href="res/img/icon.ico"> <!-- Link to .ico file -->
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="robots" content="noindex, nofollow">
	<meta name="googlebot" content="noindex, nofollow">
	 
	<meta name="viewport" content="width=device-width, initial-scale=0.9">

	<script type="text/javascript" src="res/js/jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="res/js/handlebars.min-v4.7.6.js"></script>
	<link rel="stylesheet" type="text/css" href="res/css/style.css">
	<link rel="stylesheet" type="text/css" href="res/css/base.css">


	<style type="text/css">

	</style>
	<title>Song Request</title>
</head>

<body>
	<div class="container">
	<div id="success-alert" class="alert alert-success" style="display:none;">
  
</div>
<div id="danger-alert" class="alert alert-danger" style="display:none;">
  
  </div>
		<div style="display: block; margin: auto;">
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
		<script id="results-template" type="text/x-handlebars-template">
		<table class="table">
		<thead>
			<tr>
				<th scope="col">Artwork</th>
				<th scope="col">Name</th>
				<th scope="col">Artist</th>
				<th scope="col">Album</th>
				<th scope="col"></th>
			</tr>
		</thead>
    {{#each tracks.items}}
	<tr>
					<div class="row">
						<td><img src="{{ album.images.2.url }}"></td>
						<td>{{ name }}</td>
						<td>{{ artists.0.name }}</td>
						<td>{{ album.name }}</td>
						<td><button class="btn btn-success btm-sm" style="    white-space:nowrap;
    overflow:hidden;" onclick="addToQueue('{{ uri }}', ' {{ name }}' ,' {{ artists.0.name }} ')" >Add to Queue</button></td>
					</div> 
	</tr>
			{{/each}}
  </script>
	<script id="no-results-template" type="text/x-handlebars-template">
		nothing found!
  </script>
	<script type="text/javascript" src="res/js/auth.js"></script>
	<script type="text/javascript" src="res/js/query.js"></script>
	<script type="text/javascript" src="res/js/base.js"></script>

	<script>

	</script>
	<!-- Scripts -->
</body>

</html>