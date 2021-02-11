window.onload=function(){
		var templateSource = document.getElementById('results-template').innerHTML,
			template = Handlebars.compile(templateSource),
			resultsPlaceholder = document.getElementById('results'),
			playingCssClass = 'playing',
			audioObject = null;

		var searchTracks = function (query) {
			$.ajax({
				url: 'https://api.spotify.com/v1/search?',
				data: {
					q: query,
					type: 'track,artist',
					limit: '20',
					market: 'AU'
				},
				headers: {
          'Authorization': 'Bearer ' + AUTH.getAccessToken()},
				success: function (response) {
					resultsPlaceholder.innerHTML = template(response);
					
				}
			});
			$('#success-alert').hide();
			$('#danger-alert').hide();
			$('#results').show();

		};

		document.getElementById('search-form').addEventListener('submit', function (e) {
			e.preventDefault();
			searchTracks(document.getElementById('query').value);
		}, false);

		}