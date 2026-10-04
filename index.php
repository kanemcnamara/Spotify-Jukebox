<html>

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
	<link rel="stylesheet" type="text/css" href="res/css/style.css">
	<link rel="stylesheet" type="text/css" href="res/css/base.css?0.218">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<title>Song Request</title>
</head>

<body>
	<div class="container">
		<div id="success-alert" class="alert alert-success" style="display:none;">
		</div>
		<div id="danger-alert" class="alert alert-danger" style="display:none;">

		</div>
		<div class="app-header">
			<h2 class="app-title">Song Request</h2>
		</div>
		<div id="login-button-container">
			<button class="btn btn-primary" id="btn-login">Log in with Spotify</button>
		</div>

		<div id="controls">
			<div id="logged-in-content-container">
				<p class="app-subtitle">Type a song or artist name and hit &ldquo;Search&rdquo;.</p>
				<form id="search-form" name="search">
					<input type="text" id="query" value="" class="form-control" placeholder="Song / Artist Name" autocomplete="off" />
					<input type="submit" id="search" name="search" class="btn btn-success btn-lg" value="Search" />
				</form>
			</div>
		</div>
		<div style="padding-top: 30px" id="results"></div>
	</div>
	<div class="footer" id="now-playing-bar">
		<div class="np-section">
			<span class="np-label live">Now Playing</span>
			<div class="np-track">
				<div class="np-artwork" id="currently-playing-artwork"></div>
				<div class="np-meta" id="currently-playing-track"></div>
			</div>
		</div>
		<div class="np-divider"></div>
		<div class="np-section">
			<span class="np-label">Up Next</span>
			<div class="np-track">
				<div class="np-artwork" id="next-playing-artwork"></div>
				<div class="np-meta" id="next-playing-track"></div>
			</div>
		</div>
	</div>
	<script id="results-template" type="text/x-handlebars-template">
		<div class="track-list">
			{{#each tracks.items}}
			<div class="track-row">
				<img class="track-art" src="{{ album.images.2.url }}" alt="{{ album.name }}">
				<div class="track-info">
					<span class="track-name">{{ name }}</span>
					<span class="track-artist">{{ artists.0.name }}</span>
					<span class="track-album">{{ album.name }}</span>
				</div>
				<button class="add-btn add-to-queue" data-uri="{{ uri }}" data-title="{{ name }}" data-artist="{{ artists.0.name }}">
					<span class="add-btn-text">Add</span>
				</button>
			</div>
			{{/each}}
		</div>
  </script>
	<script id="no-results-template" type="text/x-handlebars-template">
		<div class="empty-state">No tracks found. Try another search.</div>
  </script>
	<script type="text/javascript" src="res/js/auth.js?0.218"></script>
	<script type="text/javascript" src="res/js/base.js?0.218"></script>
	<!-- Scripts -->
</body>

</html>