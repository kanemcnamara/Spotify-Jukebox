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
  lastUpdate = null;
  lastQueue = null;

var initLogin = function () {
  if (AUTH.isLoggedin()) {} else {
    $("#logged-in-content-container").hide();
    $("#login-button-container").show();
    $("#btn-login").click(function () {
      AUTH.login(function () {
        $("#login-button-container").hide();
        $("#logged-in-content-container").show();
      })
    });
  }
}

var fetchQueue = function () {
  $.ajax({
    method: 'GET',
    url: "https://api.spotify.com/v1/me/player/queue",
    headers: {
      'Authorization': 'Bearer ' + AUTH.getAccessToken()
    },
    success: function (response) {
      if (response.currently_playing != null) {
        if (response.currently_playing.name != lastUpdate) {
          resultsPlaceholder.innerHTML = template(response);
          lastUpdate = response.currently_playing.name;
          artworkPlaceholder.innerHTML = artworkTemplate(response);
          document.getElementById('overview-bg').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('"+response.currently_playing.album.images[0].url+"')";
          currentlyPlayingPlaceholder.innerHTML = currentlyPlayingTemplate(response);
          lastQueue = response.queue;
        }
        if (response.queue != lastQueue) {
          console.log("Queue Updated.");
          resultsPlaceholder.innerHTML = template(response);
          lastQueue = response.queue;
          artworkPlaceholder.innerHTML = artworkTemplate(response);
          document.getElementById('overview-bg').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('"+response.currently_playing.album.images[0].url+"')";
          currentlyPlayingPlaceholder.innerHTML = currentlyPlayingTemplate(response);
      }
      }
    },
    error: function (xhr, status, error) {
      alert(xhr.responseText);
    }
  });
  $('#success-alert').hide();
  $('#danger-alert').hide();
  $('#results').show();
}

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