var port = chrome.runtime.connect({name: "bootstrapy"});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    var styles = request.styles;
    var items = $(request.bootstrapSelector);

    if (request.type === 'set') {
      var index = styles.indexOf(request.style);
      if (index > -1) {
          styles.splice(index, 1);
          for (var i=0;i<styles.length;i++) {            
            items.removeClass(styles[i]);
          }
      }

      var jsClass = 'jsClass' + request.bootstrapSelector.replace('.', '');
      $('.'+jsClass).remove();

      for (var i=0;i<items.length;i++) {
        var item = $(items[i]);
        var css = $("<div class='bootstrapy-helper-box "+ jsClass +"'><div class='bootstrapy-helper-box-label'>" + request.bootstrapSelector + "</div></div>");
        /*css.css({
            'top': item.position().top + 'px',
            'left': item.position().left + 'px',
        });*/

        $(request.bootstrapSelector).prepend(css);
      }      

      $(request.bootstrapSelector).toggleClass(request.style);
    }
    else if (request.type === 'unset') {
      for (var i=0;i<styles.length;i++) {
        $(request.bootstrapSelector).removeClass(styles[i]);  
      }      
    }
    else if (request.type === 'none') {
      var rules = request.rules;
      for (var i=0;i<rules.length;i++) {
        for (var j=0;j<styles.length;j++) {
          $(rules[i].selector).removeClass(styles[j]);
        } 
      }
    }
    else if (request.type === 'all') {
      var rules = request.rules;
      for (var i=0;i<rules.length;i++) {        
        $(rules[i].selector).addClass(rules[i].color);        
      }
    }
    
    sendResponse({job: "done"});
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