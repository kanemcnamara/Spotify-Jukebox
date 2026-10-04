# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Spotify-Jukebox: a purely client-side web app that lets guests search Spotify and add
tracks to the host's playback queue (a "jukebox"). Live demo: https://request.kane.network

The repo is hosted at `https://github.com/kanemcnamara/Spotify-Jukebox.git`. Note the live
site currently runs the **`add-queue`** branch (which carries the queue-overview feature); it
has not been merged into `master`.

There is **no build step, no bundler, no test suite, and no server-side code**. The `.php`
files (`index.php`, `queue.php`, `logout.php`) contain only static HTML/JS — they are named
`.php` for the host's server config but execute no PHP. All logic runs in the browser via
jQuery + Handlebars loaded from `res/js/`.

## Running / deploying

- "Build" = copy the files to a web root and serve them statically (this checkout lives under
  `/var/www/request.kane.network`). Any static file server works locally, e.g.
  `python3 -m http.server` from the repo root, then open `index.php`.
- The Spotify OAuth flow (`res/js/auth.js`) hardcodes `CLIENT_ID` and
  `REDIRECT_URI = https://request.kane.network/callback.html`. Spotify only redirects to
  redirect URIs registered on that app, so full login **only works on the deployed origin**,
  not from an arbitrary localhost — expect login to fail when testing locally unless you
  register a matching redirect URI and edit the constants.
- Cache-busting is manual: script tags reference `res/js/auth.js?0.213`, `base.js?0.213`,
  `queue.js?0.1`. **Bump these query-string versions in the `.php` HTML whenever you change a
  JS file**, or browsers will serve the stale cached copy.

## Architecture

Two independent pages share one auth module:

- **`index.php` + `res/js/base.js`** — the guest-facing request page. Search box → Spotify
  search API → Handlebars `results-template` renders a table → "Add to Queue" button calls
  `addToQueue()`. A footer polls `fetchQueue()` every 5s to show now-playing / up-next.
- **`queue.php` + `res/js/queue.js`** — a read-only kiosk/overview screen (e.g. on a TV). Polls
  the same queue endpoint every 5s and re-renders the now-playing art + next 5 tracks only when
  the track or queue changes (diffed against `lastUpdate` / `lastQueue`).
- **`res/js/auth.js`** — shared OAuth module, exposed as the `AUTH` IIFE singleton with
  `login()`, `isLoggedin()`, `getAccessToken()`. Every other file depends on this global.

### Auth flow (Spotify OAuth PKCE, all client-side)

1. `AUTH.login()` generates a PKCE `verifier` + S256 `challenge`, opens a popup to Spotify's
   authorize URL. Scopes: `user-read-playback-state user-modify-playback-state`.
2. Spotify redirects the popup to `callback.html`, which reads the `?code=` param and
   `postMessage`s it back to the opener window, then closes.
3. `auth.js`'s `message` listener exchanges the code for tokens directly against
   `accounts.spotify.com/api/token` and stores them in `localStorage`.
4. Tokens live in `localStorage` keys **`pa_token`, `pa_expires`, `pa_refresh`**.
   `getAccessToken()` transparently calls `requestRefreshToken()` once past expiry; a timer
   also pings it every 10 min. `logout.php` just `localStorage.clear()`s and redirects.

Note the `verifier` is stored as an implicit global (not declared with `var`), so it must
survive from `login()` until the `message` handler runs `exchangeAuthCode()` — keep them in
the same page load.

### Talking to Spotify

All Spotify calls are raw `$.ajax` from the browser with `Authorization: Bearer <token>`:
- Search: `GET api.spotify.com/v1/search` (`type=track`, `limit=20`, `market=AU` — change
  `market` in `base.js` for other regions).
- Add: `POST api.spotify.com/v1/me/player/queue?uri=<spotify_uri>`.
- Queue/now-playing: `GET api.spotify.com/v1/me/player/queue`.
There is no error UI beyond `alert(xhr.responseText)` in the ajax `error` callbacks.

Album art is picked by index into Spotify's `images` array: `images[2]` (smallest) for inline
lists, `images[1]` for the queue overview cards, `images[0]` (largest) for the kiosk background.

## Conventions

- Static third-party libs (`jquery-3.6.0.min.js`, `handlebars.min-v4.7.7.js`, Bootstrap CSS)
  are vendored in `res/`; `res/js/package.json` only records their versions and is not used to
  install or build anything.
- HTML markup and Handlebars `<script type="text/x-handlebars-template">` templates live
  inline in the `.php` files; JS references them by element id.
