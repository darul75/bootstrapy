

function onError(e) {
  console.log(e);
}

var bootstrapyApp = angular.module('bootstrapyApp', ['angular-storage']);


// Main Angular controller for app.
function MainController(scope, $http, asStorage, rules) {

  $('#main').tooltip({selector: "a[rel=tooltip], button[rel=tooltip]"});

  scope.colors = ['bootstrapy-blue', 'bootstrapy-yellow', 'bootstrapy-green', 'bootstrapy-red'];

  scope.rules = rules.items;
  scope.version = rules.version;

  scope.init = function() {

    var data = asStorage.get('rules');

    if (data) {

      if (data.version === scope.version) {
        scope.rules = data.items;
        // reload all
        scope.selectNone(true);
        
        scope.rules.forEach(function(rule) {

          if (rule.color && rule.color !== "") {
            scope.select(rule, rule.color, true);
          }

        });
      }
      else {
        asStorage.remove('rules');
      }

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

  scope.select = function(rule, style, init) {
    
    var bootstrapSelector = rule.selector;
    var name = rule.name;
    
    for (var i=0;i<scope.rules.length;i++) {

      var ruleItem = scope.rules[i];
      if (ruleItem.selector !== bootstrapSelector)
        continue;
      
      if (ruleItem.selector === bootstrapSelector) {        
        if (!init) {
          if (ruleItem.color !== style)        
            ruleItem.color = style;
          else
            ruleItem.color = '';
        }
        break;
      }
    }   

    var type = style === "" ? 'unset' : 'set';

    sendMessage({type: type, name: name, bootstrapSelector: bootstrapSelector, style: style, styles: scope.colors});       

  };

  var sendMessage = function(options) {

    chrome.tabs.getSelected(null, function(tab) {     

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {        

        chrome.tabs.sendMessage(tabs[0].id, options, function(response) {
          if (response && response.job === 'done')
            asStorage.set('rules', {
              version: scope.version,
              items: scope.rules
            });
        });
      });

    });


  };

  scope.init();
  
}

MainController.$inject = ['$scope', '$http', 'asStorage', 'rules']; // For code minifiers.

bootstrapyApp.constant('rules', 
  {
    version: '0.0.1',
    items: [
      { name: '.row', selector: '.row' },
      { name: '.col', selector: 'div[class*=col-]' },

      { name: '.container', selector: '.container' },
      { name: '.container-fluid', selector: '.container-fluid' },

      { name: '.table', selector: '.table' },
      { name: '.table-bordered', selector: '.table-bordered' },
      { name: '.table-striped', selector: '.table-striped' },
      { name: '.table-hover', selector: '.table-hover' },
      { name: '.table-condensed', selector: '.table-condensed' },
      { name: '.table-responsive', selector: '.table-responsive' },
        
      { name: '.form', selector: '.form' },
      { name: '.form-control', selector: '.form-control' },
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
      { name: 'small', selector: 'small' },
      { name: 'strong', selector: 'strong' },
      { name: 'em', selector: 'em' },

      { name: '.text-left', selector: '.text-left' },
      { name: '.text-center', selector: '.text-center' },
      { name: '.text-right', selector: '.text-right' },
      { name: '.text-justify', selector: '.text-justify' },

      { name: 'abbr', selector: 'abbr' },
      { name: 'address', selector: 'address' },
      { name: 'blockquote', selector: 'blockquote' },
      { name: '.blockquote-reverse', selector: '.blockquote-reverse' },
      { name: 'footer', selector: 'footer' },

      { name: 'b', selector: 'b' },      
      { name: 'i', selector: 'i' },
      { name: 'p', selector: 'p' },
      { name: 'code', selector: 'code' },

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
  }
  
  );


// Init setup and attach event listeners.
document.addEventListener('DOMContentLoaded', function(e) {
  var closeButton = document.querySelector('#close-button');
  if (!closeButton) return;
  closeButton.addEventListener('click', function(e) {
    window.close();
  });

});
