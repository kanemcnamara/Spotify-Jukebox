
var
  templateSource = document.getElementById('results-template').innerHTML,
  template = Handlebars.compile(templateSource),
  noResultTemplateSource = document.getElementById('no-results-template').innerHTML,
  noResultTemplate = Handlebars.compile(noResultTemplateSource),
  resultsPlaceholder = document.getElementById('results'),
  definiteResult = [],
  successAlert = document.getElementById('success-alert'),
  dangerAlert = document.getElementById('danger-alert');

var initLogin = function() {
  if (AUTH.isLoggedin()) {
    //searchLabels();
  } else {
    $("#logged-in-content-container").hide();
    $("#login-button-container").show();
    $("#btn-login").click(function() {
      AUTH.login(function() {
        $("#login-button-container").hide();
        $("#logged-in-content-container").show();
        //searchLabels();
      })
    });
  }
}

var addToQueue = function(spotify_uri, title, artist){
  $.ajax({
    method: 'POST',
    url: 'https://api.spotify.com/v1/me/player/queue?uri='+spotify_uri,
    headers: {
      'Authorization': 'Bearer ' + AUTH.getAccessToken()},
    success: function (response) {
      $('#success-alert').html(title + ' - ' + artist + ' has been added to the queue.');
      $('#success-alert').show();
      $('#results').hide();
      $('#query').val("");
    },
    error: function (xhr, status, error) {
      alert(xhr.responseText);
    }
  });
};

var init = function() {
  initLogin();
}
// INIT
$(document).ready(init);