# Google Search Redirector

A Chrome browser extension that automatically redirects search queries from Bing, Yahoo, and McAfee search engines to Google Search.

## Background

I suspected McAfee was hijacking my search queries and redirecting them away from Google. Ultimately, I had to develop this extension to work around this issue and ensure my searches always go to Google regardless of which search engine tries to intercept them.

## How It Works

This extension intercepts navigation attempts to search pages on:
- Bing (`bing.com`)
- Yahoo (`search.yahoo.com`) 
- McAfee (`*.mcafee.com`)

When you're about to visit any of these search engines, the extension automatically extracts your search query and redirects you straight to Google Search instead. You never actually see the other search engines' pages.

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select this folder
5. The extension will now automatically redirect searches to Google

## Files

- `manifest.json` - Extension configuration and permissions
- `background.js` - Service worker that handles navigation interception
- `rules.json` - Declarative net request rules for URL redirects
- `CLAUDE.md` - Development guidance for future code work

## License

Free to use and modify as needed.