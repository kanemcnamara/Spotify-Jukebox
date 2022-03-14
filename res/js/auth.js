// Spotify OAuth
var AUTH = (function () {
  var accessToken = "";
  var authCode = "";
  var CLIENT_ID = "1d866aedaaa94d53bb7909d33c324bf4";
  var REDIRECT_URI = "https://request.kane.network/callback.html";
  var checkVerifier = "";

  // Call Spotify to get auth Code
  var login = async function (successCallback) {

    async function getLoginURL() {

      function dec2hex(dec) {
        return ('0' + dec.toString(16)).substr(-2)
      }
      
      function generateRandomString() {
        var array = new Uint32Array(56/2);
        window.crypto.getRandomValues(array);
        return Array.from(array, dec2hex).join('');
      }
      
    verifier = generateRandomString();
      
    
    async function sha256(plain) { // returns promise ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      if (window.crypto && !window.crypto.subtle && window.crypto.webkitSubtle) {
        window.crypto.subtle = window.crypto.webkitSubtle;
    }
    
      return window.crypto.subtle.digest('SHA-256', data);
    }
    
    function base64urlencode(a) {
          var str = "";
          var bytes = new Uint8Array(a);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            str += String.fromCharCode(bytes[i]);
          }
          return btoa(str)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
        }
    
     async function challenge_from_verifier(v) {
      hashed = await sha256(v);
      base64encoded = base64urlencode(hashed);
      return base64encoded;
    }

      var challenge = await challenge_from_verifier(verifier);

      var url = "https://accounts.spotify.com/authorize?client_id=" +
      CLIENT_ID +
      "&redirect_uri=" +
      encodeURIComponent(REDIRECT_URI) +
      "&response_type=code&scope=user-read-playback-state%20user-modify-playback-state&code_challenge_method=S256&code_challenge="
      + challenge;
      return (url);
    }

    // Wait for Spotify to return code
    window.addEventListener(
      "message",
      function (event) {
        var hash = JSON.parse(event.data);
        if (hash.type == "access_token") {
         // setAccessToken(hash.access_token, hash.expires_in || 60);
          setAuthCode(hash.access_token);
          exchangeAuthCode(hash.access_token);
          if (successCallback) {
            successCallback();
          }
        }
      },
      false
    );

    var width = 450,
      height = 730,
      left = screen.width / 2 - width / 2,
      top = screen.height / 2 - height / 2;

      const win = window.open('about:blank',
      "Spotify",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left);

      getLoginURL().then(url => {
        win.location.href = url;
      }).catch(url => {
        win.location.href = 'https://request.kane.network';
      });
  };

  var getAccessToken = function () {
    var expires = parseInt(localStorage.getItem("pa_expires", "0"));
    if (isNaN(expires)){
      expires = 0;
    };
    
    if (expires == 0 || (localStorage.getItem("pa_refresh") === null))
    {
      return "";
    }

    if (new Date().getTime() > expires) {
      requestRefreshToken();
    }
    var token = localStorage.getItem("pa_token", "");
    return token;
  };

  var setAccessRefreshToken = function (response) {
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + 1000 * response.expires_in / 2);

    localStorage.setItem("pa_token", response.access_token);
    localStorage.setItem("pa_expires", expiresDate.getTime());
    localStorage.setItem("pa_refresh",response.refresh_token)
  };


  var isLoggedin = function () {
    return getAccessToken() !== "";
  };

  var setAuthCode = function(code){
    authCode = code;
  };

  var exchangeAuthCode = function (code) {
    $.ajax({
      method: 'POST',
      crossDomain : true,
      url: 'https://accounts.spotify.com/api/token',
      data: {
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier
      },
      success: function (response) {
        setAccessRefreshToken(response);
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      }
    });
  };

  var requestRefreshToken = function (code) {
    $.ajax({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      data: {
        client_id: CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem("pa_refresh")
      },
      success: function (response) {
        setAccessRefreshToken(response);
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      }
    });
  };

  return {
    login: login,
    isLoggedin: isLoggedin,
    getAccessToken: getAccessToken,
  };
})();