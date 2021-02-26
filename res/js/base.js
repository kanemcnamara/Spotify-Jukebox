
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
        type: 'track',
        limit: '20',
        market: 'AU'
      },
      headers: {
        'Authorization': 'Bearer ' + AUTH.getAccessToken()},
      success: function (response) {
        resultsPlaceholder.innerHTML = template(response); 
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
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
  // function to check is token is due to expire and if so refresh it. runs every 10 minutes
  const refreshMin = 10;
  window.setInterval(function(){ AUTH.getAccessToken(); }, refreshMin*60000);