var port = chrome.runtime.connect();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    var elt = $(request.bootstrapSelector);

    elt.toggleClass(request.style);    

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