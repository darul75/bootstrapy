var port = chrome.runtime.connect();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    var styles = request.styles;
    if (request.type === 'set') {
      var index = styles.indexOf(request.style);
      if (index > -1) {
          styles.splice(index, 1);
          for (var i=0;i<styles.length;i++) {
            $(request.bootstrapSelector).removeClass(styles[i]);  
          }
      }

      $(request.bootstrapSelector).toggleClass(request.style);
    }
    else if (request.type === 'unset') {
      for (var i=0;i<styles.length;i++) {
        $(request.bootstrapSelector).removeClass(styles[i]);  
      }      
    }    

    /*if (request.bootstrapSelector == "hello")
      sendResponse({farewell: "goodbye"});*/
});

/*window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  // console.log(event.data);

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);*/