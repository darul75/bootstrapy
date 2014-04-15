

function onError(e) {
  console.log(e);
}

var bootstrapyApp = angular.module('bootstrapyApp', []);

// Main Angular controller for app.
function MainController(scope, $http) {
  scope.colors = ['blue', 'yellow', 'green', 'red'];

  scope.rules = [
    { name: '.row', selector: '.row' },
    { name: '.col-*', selector: 'div[class*=col-]' },
    { name: '.table', selector: '.table-border' },
    { name: '.table', selector: '.table-border' },
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

  scope.select = function(bootstrapSelector, style) {    

    chrome.tabs.getSelected(null, function(tab) {     

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {bootstrapSelector: bootstrapSelector, style: style}, function(response) {
          console.log(response.farewell);
        });
      });

    });

  };
  
}

MainController.$inject = ['$scope', '$http']; // For code minifiers.

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
