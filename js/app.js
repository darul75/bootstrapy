

function onError(e) {
  console.log(e);
}

var bootstrapyApp = angular.module('bootstrapyApp', ['angular-storage']);

// Main Angular controller for app.
function MainController(scope, $http, asStorage) {

  $('#main').tooltip({selector: "a[rel=tooltip], button[rel=tooltip]"});

  scope.colors = ['blue', 'yellow', 'green', 'red'];

  scope.rules = [
    { name: '.row', selector: '.row' },
    { name: '.col-*', selector: 'div[class*=col-]' },    
    { name: '.table', selector: '.table' },
    { name: 'form', selector: 'form' },
    { name: '.form-inline', selector: '.form-inline' },
    { name: '.form-horizontal', selector: '.form-horizontal' },
    { name: '.form-group', selector: '.form-group' },
    { name: 'h1', selector: 'h1' },
    { name: 'h2', selector: 'h2' },
    { name: 'h3', selector: 'h3' },
    { name: 'h4', selector: 'h4' },
    { name: 'h5', selector: 'h5' },
    { name: 'h6', selector: 'h6' },
    { name: '.form-group', selector: '.form-group' },
    { name: '.visible-xs', selector: '.visible-xs' },
    { name: '.visible-sm', selector: '.visible-sm' },
    { name: '.visible-md', selector: '.visible-md' },
    { name: '.visible-lg', selector: '.visible-lg' },
    { name: '.hidden-xs', selector: '.hidden-xs' },
    { name: '.hidden-sm', selector: '.hidden-sm' },
    { name: '.hidden-md', selector: '.hidden-md' },
    { name: '.hidden-lg', selector: '.hidden-lg' }
  ];

  var data = asStorage.get('rules');

  if (data) 
    scope.rules = data;

  scope.select = function(bootstrapSelector, style) {
    var rule = null;
    for (var i=0;i<scope.rules.length;i++) {
      var rule = scope.rules[i];
      if (rule.selector !== bootstrapSelector)
        continue;
      
      if (rule.selector === bootstrapSelector) {
        rule = scope.rules[i];
        if (rule.color !== style)        
          rule.color = style;
        else
          rule.color = '';
        break;
      }
    }   

    var type = 'set';

    chrome.tabs.getSelected(null, function(tab) {     

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (style ==="")
          type = 'unset';

        chrome.tabs.sendMessage(tabs[0].id, {type:type, bootstrapSelector: bootstrapSelector, style: style, styles:scope.colors}, function(response) {
          //console.log(response.farewell);          
        });
      });

    });

    asStorage.set('rules', scope.rules);

  };
  
}

MainController.$inject = ['$scope', '$http', 'asStorage']; // For code minifiers.

//chrome.tabs.executeScript(null, {file: "content_script.js"});

// Init setup and attach event listeners.
document.addEventListener('DOMContentLoaded', function(e) {
  var closeButton = document.querySelector('#close-button');
  if (!closeButton) return;
  closeButton.addEventListener('click', function(e) {
    window.close();
  });

  // FILESYSTEM SUPPORT --------------------------------------------------------
 /* window.webkitRequestFileSystem(TEMPORARY, 1024 * 1024, function(localFs) {
    fs = localFs;
  }, onError);*/
  // ---------------------------------------------------------------------------
});
