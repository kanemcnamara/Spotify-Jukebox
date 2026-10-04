
var
  templateSource = document.getElementById('results-template').innerHTML,
  template = Handlebars.compile(templateSource),
  noResultTemplateSource = document.getElementById('no-results-template').innerHTML,
  noResultTemplate = Handlebars.compile(noResultTemplateSource),
  resultsPlaceholder = document.getElementById('results'),
  definiteResult = [],
  successAlert = document.getElementById('success-alert'),
  dangerAlert = document.getElementById('danger-alert');

// Slide-in toast that auto-dismisses. Reuses #success-alert / #danger-alert as
// the success/error surfaces (.text() keeps the message escaped).
var toastTimer = null;
var showToast = function (message, type) {
  var $target = $(type === 'error' ? '#danger-alert' : '#success-alert');
  $('#success-alert, #danger-alert').stop(true, true).hide();
  $target.text(message).show();
  // Restart the CSS entrance animation on repeat toasts.
  $target[0].style.animation = 'none';
  void $target[0].offsetWidth;
  $target[0].style.animation = '';
  if (toastTimer) { clearTimeout(toastTimer); }
  toastTimer = setTimeout(function () { $target.fadeOut(200); }, 3000);
};

// Placeholder rows shown while a search request is in flight.
var skeletonRows = function (count) {
  var row =
    '<div class="track-row skeleton">' +
      '<div class="track-art"></div>' +
      '<div class="track-info">' +
        '<div class="sk-line"></div>' +
        '<div class="sk-line short"></div>' +
      '</div>' +
    '</div>';
  var html = '<div class="track-list">';
  for (var i = 0; i < count; i++) { html += row; }
  return html + '</div>';
};

var initLogin = function () {
  if (AUTH.isLoggedin()) {
    //searchLabels();
  } else {
    $("#logged-in-content-container").hide();
    $("#login-button-container").show();
    $("#btn-login").click(function () {
      AUTH.login(function () {
        $("#login-button-container").hide();
        $("#logged-in-content-container").show();
        //searchLabels();
      })
    });
  }
}

var addToQueue = function (spotify_uri, title, artist, buttonEl) {
  $.ajax({
    method: 'POST',
    url: "https://api.spotify.com/v1/me/player/queue?uri=" + encodeURIComponent(spotify_uri),
    headers: {
      'Authorization': 'Bearer ' + AUTH.getAccessToken()
    },
    success: function (response) {
      showToast(title + " — added to queue", 'success');
      $('#query').val("");
      // Confirm on the button itself; leave the results up so more can be added.
      if (buttonEl) {
        $(buttonEl).addClass('added').find('.add-btn-text').text('✓ Added');
      }
    },
    error: function (xhr, status, error) {
      // 404 = NO_ACTIVE_DEVICE: Spotify needs playback started somewhere first.
      var hint = xhr.status === 404 ? " Start playback on a device first." : "";
      showToast("Couldn't add track." + hint, 'error');
    }
  });
};

// Render album art into `el`. Uses .attr() so the URL can't break out of the tag.
var renderArtwork = function (el, track) {
  var images = track.album.images;
  var img = images[2] || images[1] || images[0];
  var $el = $(el).empty();
  if (img) {
    $el.append($('<img>').attr('src', img.url).attr('alt', track.album.name));
  }
};

// Render title + artist into `el`. Uses .text() so track/artist names are
// escaped rather than injected as HTML.
var renderMeta = function (el, track) {
  $(el).empty()
    .append($('<span class="np-title">').text(track.name))
    .append($('<span class="np-artist">').text(track.artists[0].name));
};

var fetchQueue = function () {
  // Don't poll while logged out — otherwise every request 401s.
  if (!AUTH.isLoggedin()) {
    return;
  }
  $.ajax({
    method: 'GET',
    url: "https://api.spotify.com/v1/me/player/queue",
    headers: {
      'Authorization': 'Bearer ' + AUTH.getAccessToken()
    },
    success: function (response) {
      if (response.currently_playing != null) {
        renderArtwork('#currently-playing-artwork', response.currently_playing);
        renderMeta('#currently-playing-track', response.currently_playing);
      }
      var next = response.queue && response.queue[0];
      if (next) {
        renderArtwork('#next-playing-artwork', next);
        renderMeta('#next-playing-track', next);
      } else {
        $('#next-playing-artwork').empty();
        $('#next-playing-track').html('<span class="np-artist">Nothing queued</span>');
      }
    },
    error: function (xhr) {
      // Background poll — log instead of interrupting with an alert().
      console.error("Queue fetch failed:", xhr.responseText);
    }
  });
}

var init = function () {
  initLogin();
}
// INIT
$(document).ready(init);


window.onload = function () {
  var templateSource = document.getElementById('results-template').innerHTML,
    template = Handlebars.compile(templateSource),
    resultsPlaceholder = document.getElementById('results'),
    playingCssClass = 'playing',
    audioObject = null;
    fetchQueue();

  var searchTracks = function (query) {
    if (!query.trim()) {
      return;
    }
    $('#success-alert, #danger-alert').hide();
    resultsPlaceholder.innerHTML = skeletonRows(5); // instant loading feedback
    $('#results').show();
    $.ajax({
      url: 'https://api.spotify.com/v1/search?',
      data: {
        q: query,
        type: 'track',
        limit: '20',
        market: 'AU'
      },
      headers: {
        'Authorization': 'Bearer ' + AUTH.getAccessToken()
      },
      success: function (response) {
        if (response.tracks && response.tracks.items && response.tracks.items.length) {
          resultsPlaceholder.innerHTML = template(response);
        } else {
          resultsPlaceholder.innerHTML = noResultTemplate({});
        }
      },
      error: function (xhr, status, error) {
        resultsPlaceholder.innerHTML = '';
        showToast('Search failed. Please try again.', 'error');
      }
    });
  };

  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    searchTracks(document.getElementById('query').value);
    document.activeElement.blur();
  }, false);

  // Delegated handler: buttons are re-rendered on every search, so bind to the
  // stable #results container and read values from escaped data- attributes
  // rather than injecting untrusted track names into inline JS.
  $('#results').on('click', '.add-to-queue', function () {
    addToQueue($(this).data('uri'), $(this).data('title'), $(this).data('artist'), this);
  });

  // function to check is token is due to expire and if so refresh it. runs every 10 minutes
  const refreshMin = 10;
  window.setInterval(function () { AUTH.getAccessToken(); }, refreshMin * 60000);

  window.setInterval(function () { fetchQueue(); }, 5000);
}
