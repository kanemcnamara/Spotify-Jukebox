var
  templateSource = document.getElementById('upcoming-tracks-template').innerHTML,
  template = Handlebars.compile(templateSource),
  noResultTemplateSource = document.getElementById('no-results-template').innerHTML,
  noResultTemplate = Handlebars.compile(noResultTemplateSource),
  resultsPlaceholder = document.getElementById('upcoming-tracks'),
  successAlert = document.getElementById('success-alert'),
  dangerAlert = document.getElementById('danger-alert'),
  artworkTemplateSource = document.getElementById('currently-playing-artwork-template').innerHTML,
  artworkTemplate = Handlebars.compile(artworkTemplateSource),
  artworkPlaceholder = document.getElementById('currently-playing-artwork'),
  currentlyPlayingTemplateSource = document.getElementById('currently-playing-template').innerHTML,
  currentlyPlayingTemplate = Handlebars.compile(currentlyPlayingTemplateSource),
  currentlyPlayingPlaceholder = document.getElementById('currently-playing-details'),
  overviewBg = document.getElementById('overview-bg'),
  lastRender = null;

var initLogin = function () {
  if (AUTH.isLoggedin()) {
    $("#login-button-container").hide();
    $("#overview").show();
  } else {
    $("#overview").hide();
    $("#login-button-container").show();
    $("#btn-login").click(function () {
      AUTH.login(function () {
        $("#login-button-container").hide();
        $("#overview").show();
        fetchQueue();
      });
    });
  }
};

// Stable identity of a queue response: the currently-playing track plus the
// ordered list of queued track URIs. Comparing this string (instead of the
// array reference, which is always new) is what actually detects a change.
var queueSignature = function (response) {
  var playing = response.currently_playing ? response.currently_playing.uri : "";
  var queue = (response.queue || []).map(function (track) { return track.uri; });
  return playing + "|" + queue.join(",");
};

var fetchQueue = function () {
  // Don't poll while logged out — otherwise every request 401s on a kiosk.
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
      if (response.currently_playing == null) {
        return;
      }

      // Only re-render when something actually changed.
      var signature = queueSignature(response);
      if (signature === lastRender) {
        return;
      }
      lastRender = signature;

      response.upcoming = (response.queue || []).slice(0, 5);

      resultsPlaceholder.innerHTML = template(response);
      artworkPlaceholder.innerHTML = artworkTemplate(response);
      currentlyPlayingPlaceholder.innerHTML = currentlyPlayingTemplate(response);

      var art = response.currently_playing.album.images[0];
      if (art) {
        // encodeURI + quoting keeps the URL from breaking out of url("...").
        overviewBg.style.backgroundImage = "url(\"" + encodeURI(art.url) + "\")";
        // Re-trigger the crossfade animation on each change.
        overviewBg.classList.remove('bg-enter');
        void overviewBg.offsetWidth;
        overviewBg.classList.add('bg-enter');
      }
    },
    error: function (xhr) {
      // Kiosk screen is unattended — log instead of throwing a blocking alert().
      console.error("Queue fetch failed:", xhr.responseText);
    }
  });
};

var init = function () {
  initLogin();
}
// INIT
$(document).ready(init);


window.onload = function () {
  fetchQueue();

  // function to check is token is due to expire and if so refresh it. runs every 10 minutes
  const refreshMin = 10;
  window.setInterval(function () {
    AUTH.getAccessToken();
  }, refreshMin * 60000);
  window.setInterval(function () {
    fetchQueue();
  }, 5000);
};
