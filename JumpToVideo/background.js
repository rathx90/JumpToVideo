chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var url = info.linkUrl;
  var xhr = new XMLHttpRequest();
  var count = 0;

  xhr.onload = function() {
    var page = document.createElement('div');
    page.innerHTML = xhr.responseText; // load background page with xhr response
    var iframes = page.getElementsByTagName('iframe');

    for (var i = 0; i < iframes.length; i++) {
      // if an iframe with a youtube src exists...
      if (iframes[i].src.indexOf("youtube") > -1) {
          count++;
          var videoIdBegin = iframes[i].src.indexOf('/embed/') + 7; // +7 to count for '/embed/'
          // No real need for videoIdEnd for youtube videos since youtube video IDs are always 11 characters long
          // var videoIdEnd = iframes[i].src.indexOf('?');

          var videoId = iframes[i].src.substring(videoIdBegin,videoIdBegin+11);

          // create new youtube tab once videoId is found.
          chrome.tabs.create({
                url: 'http://www.youtube.com/watch?v=' + videoId
              }
          );
        }
    }
    if (count === 0) {
      alert("No youtube iframes found");
    }
  };

  xhr.open('GET', url);
  xhr.send();
});

// create contextMenu for links upon loading
chrome.contextMenus.create({
  "id": 'ID1',
  "title": 'Jump To Video',
  "contexts": ['link']
});
