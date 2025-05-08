chrome.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    const url = new URL(details.url);
    
    // Check if it's a search URL from Bing, Yahoo, or McAfee
    if (url.hostname.includes('bing.com') || 
        url.hostname.includes('yahoo.com') || 
        url.hostname.includes('mcafee.com')) {
      
      // Get the search query from various possible parameter names
      const query = url.searchParams.get('q') || 
                   url.searchParams.get('p') || 
                   url.searchParams.get('query');
                   
      if (query) {
        // Redirect to Google with the same search query
        chrome.tabs.update(details.tabId, {
          url: `https://www.google.com/search?q=${encodeURIComponent(query)}`
        });
      }
    }
  },
  {
    url: [{
      // Match any search URLs from these domains
      hostContains: 'bing.com'
    }, {
      hostContains: 'yahoo.com'
    }, {
      hostContains: 'mcafee.com'
    }]
  }
);
