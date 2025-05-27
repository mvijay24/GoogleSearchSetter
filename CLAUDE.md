# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome/Chromium browser extension that redirects search queries from Bing, Yahoo, and McAfee search engines to Google Search. The extension uses Chrome Extension Manifest V3 with both service worker and declarative net request approaches.

## How It Works (Simple Explanation)

The extension intercepts you BEFORE you actually reach Bing, Yahoo, or McAfee search pages. When your browser is about to navigate to one of these search sites, the extension catches that navigation, extracts your search query from the URL, and immediately redirects you to Google instead - you never actually see the other search engine's page.

For example: You click a link or type something that would take you to `bing.com/search?q=cats`. The extension catches this navigation attempt, sees "cats" in the URL, and redirects you straight to `google.com/search?q=cats` instead. You go directly to Google without ever seeing Bing.

The extension uses `background.js` to watch for navigation attempts to these search sites, and `rules.json` to set up automatic redirect rules that work at the network level before pages even load.

## Architecture

The extension implements search redirection through two complementary mechanisms:

1. **Service Worker Approach** (`background.js`): Uses `chrome.webNavigation.onBeforeNavigate` to intercept navigation events and programmatically redirect searches via `chrome.tabs.update`

2. **Declarative Net Request** (`rules.json`): Uses Chrome's declarative net request API to define URL pattern matching and redirection rules that work at the network level

Both approaches target the same search engines (Bing, Yahoo, McAfee) and redirect to Google Search while preserving the original search query.

## File Structure

- `manifest.json`: Extension manifest defining permissions, background service worker, and declarative net request rules
- `background.js`: Service worker that handles navigation interception and tab redirection
- `rules.json`: Declarative net request rules for URL pattern matching and redirection
- `working/`: Contains duplicate files (likely for development/testing)
- `_metadata/`: Chrome extension metadata (auto-generated)

## Key Components

**Search Query Extraction**: The service worker handles multiple query parameter formats (`q`, `p`, `query`) to accommodate different search engines' URL structures.

**Host Permissions**: The extension requires broad host permissions (`*://*/*`) plus specific permissions for target domains to intercept and redirect searches.

## Extension Development

To load the extension for testing:
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select this directory
4. The extension will intercept searches from Bing, Yahoo, and McAfee and redirect them to Google

The extension requires no build process - it can be loaded directly from the source files.