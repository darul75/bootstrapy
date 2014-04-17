

function onError(e) {
  console.log(e);
}

var bootstrapyApp = angular.module('bootstrapyApp', ['angular-storage']);

bootstrapyApp.constant('rules', [
      { name: '.row', selector: '.row' },
      { name: '.col-*', selector: 'div[class*=col-]' },    

      { name: '.table', selector: '.table' },
      { name: '.table-striped', selector: '.table-striped' },
      { name: '.table-hover', selector: '.table-hover' },
      { name: '.table-condensed', selector: '.table-condensed' },
      { name: '.table-responsive', selector: '.table-responsive' },
        
      { name: '.form', selector: '.form' },
      { name: '.form-inline', selector: '.form-inline' },
      { name: '.form-horizontal', selector: '.form-horizontal' },
      { name: '.form-group', selector: '.form-group' },

      { name: '.list-unstyled', selector: '.list-unstyled' },
      { name: '.list-inline', selector: '.list-inline' },

      { name: '.initialism', selector: '.initialism' },
      { name: '.dl-horizontal', selector: '.dl-horizontal' },            

      { name: '.visible-xs', selector: '.visible-xs' },
      { name: '.visible-sm', selector: '.visible-sm' },
      { name: '.visible-md', selector: '.visible-md' },
      { name: '.visible-lg', selector: '.visible-lg' },

      { name: '.hidden-xs', selector: '.hidden-xs' },
      { name: '.hidden-sm', selector: '.hidden-sm' },
      { name: '.hidden-md', selector: '.hidden-md' },
      { name: '.hidden-lg', selector: '.hidden-lg' },

      { name: 'h1', selector: 'h1' },
      { name: 'h2', selector: 'h2' },
      { name: 'h3', selector: 'h3' },
      { name: 'h4', selector: 'h4' },
      { name: 'h5', selector: 'h5' },
      { name: 'h6', selector: 'h6' },

      { name: '.lead', selector: '.lead' },
      { name: '<small>', selector: 'small' },
      { name: '<strong>', selector: 'strong' },
      { name: '<em>', selector: 'em' },

      { name: '.text-left', selector: '.text-left' },
      { name: '.text-center', selector: '.text-center' },
      { name: '.text-right', selector: '.text-right' },
      { name: '.text-justify', selector: '.text-justify' },

      { name: '<abbr>', selector: 'abbr' },
      { name: '<address>', selector: 'address' },
      { name: '<blockquote>', selector: 'blockquote' },
      { name: '<footer>', selector: 'footer' },

      { name: '.active', selector: '.active' },
      { name: '.success', selector: '.success' },
      { name: '.info', selector: '.info' },
      { name: '.warning', selector: '.warning' },
      { name: '.danger', selector: '.danger' },

      { name: '.checkbox-inline', selector: '.checkbox-inline' },
      { name: '.radio-inline', selector: '.radio-inline' },

      { name: '.has-success', selector: '.has-success' },
      { name: '.has-warning', selector: '.has-warning' },
      { name: '.has-error', selector: '.has-error' },
      { name: '.has-feedback', selector: '.has-feedback' },

      { name: '.input-lg', selector: '.input-lg' },
      { name: '.input-sm', selector: '.input-sm' },

      { name: '.help-block', selector: '.help-block' },
      
      { name: '.btn', selector: '.btn' },
      { name: '.btn-default', selector: '.btn-default' },
      { name: '.btn-primary', selector: '.btn-primary' },
      { name: '.btn-success', selector: '.btn-success' },
      { name: '.btn-info', selector: '.btn-info' },
      { name: '.btn-warning', selector: '.btn-warning' },
      { name: '.btn-danger', selector: '.btn-danger' },
      { name: '.btn-link', selector: '.btn-link' },
      { name: '.btn-lg', selector: '.btn-lg' },
      { name: '.btn-xs', selector: '.btn-xs' },
      { name: '.btn-block', selector: '.btn-block' },
      { name: '.active', selector: '.active' },
      { name: '.disabled', selector: '.disabled' },

      { name: '.img-rounded', selector: '.img-rounded' },
      { name: '.img-circle', selector: '.img-circle' },
      { name: '.img-thumbnail', selector: '.img-thumbnail' },

      { name: '.text-muted', selector: '.text-muted' },
      { name: '.text-primary', selector: '.text-primary' },
      { name: '.text-success', selector: '.text-success' },
      { name: '.text-info', selector: '.text-info' },
      { name: '.text-warning', selector: '.text-warning' },
      { name: '.text-danger', selector: '.text-danger' },

      { name: '.bg-primary', selector: '.bg-primary' },
      { name: '.bg-success', selector: '.bg-success' },
      { name: '.bg-info', selector: '.bg-info' },
      { name: '.bg-warning', selector: '.bg-warning' },
      { name: '.bg-danger', selector: '.bg-danger' },
      
      { name: '.pull-left', selector: '.pull-left' },
      { name: '.pull-right', selector: '.pull-right' },

      { name: '.center-block', selector: '.center-block' },
      { name: '.clearfix', selector: '.clearfix' },
      
      { name: '.show', selector: '.show' },
      { name: '.hidden', selector: '.hidden' },

      { name: '.sr-only', selector: '.sr-only' },
      { name: '.text-hide', selector: '.text-hide' }        

    ]
  
  );


// Main Angular controller for app.
function MainController(scope, $http, asStorage, rules) {

  $('#main').tooltip({selector: "a[rel=tooltip], button[rel=tooltip]"});

  scope.colors = ['bootstrapy-blue', 'bootstrapy-yellow', 'bootstrapy-green', 'bootstrapy-red'];

  scope.rules = rules;

  scope.init = function() {

    var data = asStorage.get('rules');

    if (data) {
      scope.rules = data;
      // reload all
      scope.selectNone(true);
      
      scope.rules.forEach(function(rule) {

        if (rule.color && rule.color !== "") {
          scope.select(rule.selector, rule.color, true);          
        }

      });

    }

  };

  scope.selectNone = function(init) {
    if (!init)
      for (var i=0;i<scope.rules.length;i++) 
        scope.rules[i].color = '';
    sendMessage({type:'none', rules: scope.rules, styles:scope.colors});    
  };

  scope.selectAll = function() {    
    for (var i=0;i<scope.rules.length;i++) 
      scope.rules[i].color = scope.colors[Math.floor((Math.random()*3))];
    sendMessage({type:'all', rules: scope.rules, styles:scope.colors});    
  };

  scope.select = function(bootstrapSelector, style, init) {
    var rule = null;

    for (var i=0;i<scope.rules.length;i++) {

      var rule = scope.rules[i];
      if (rule.selector !== bootstrapSelector)
        continue;
      
      if (rule.selector === bootstrapSelector) {
        rule = scope.rules[i];
        if (!init) {
          if (rule.color !== style)        
            rule.color = style;
          else
            rule.color = '';
        }
        break;
      }
    }   

    var type = style === "" ? 'unset' : 'set';

    sendMessage({type:type, bootstrapSelector: bootstrapSelector, style: style, styles:scope.colors});       

  };

  var sendMessage = function(options) {

    chrome.tabs.getSelected(null, function(tab) {     

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {        

        chrome.tabs.sendMessage(tabs[0].id, options, function(response) {
          if (response && response.job === 'done')
            asStorage.set('rules', scope.rules);
        });
      });

    });


  };

  scope.init();
  
}

MainController.$inject = ['$scope', '$http', 'asStorage', 'rules']; // For code minifiers.


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
