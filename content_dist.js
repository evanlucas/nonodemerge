(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict'

var injection = require('github-injection')
injection(global, function() {
  var ele = document.querySelector('.js-merge-branch-action')
  if (ele) {
    ele.classList.add('disabled')
    ele.setAttribute('disabled', 'disabled')
    ele.style.display = 'none'
  }
})

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"github-injection":2}],2:[function(require,module,exports){
'use strict';

// Grabbed from underscore.js
// http://underscorejs.org/#debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

var gitHubInjection = function (global, options, cb) {
  if (!global) {
    throw new Error('Missing argument global');
  }
  if (!global.document || !global.document.getElementById) {
    throw new Error('The given argument global is not a valid window object');
  }

  if (!cb) {
    cb = options;
    options = {};
  } else if (typeof cb !== 'function') {
    throw new Error('Callback is not a function');
  }

  if (!cb) {
    throw new Error('Missing argument callback');
  }

  options = options || {};
  options.context = options.context || null;
  options.wait = options.wait || 250;

  cb = debounce(cb, options.wait).bind(options.context);

  var domElement = global.document.getElementById('js-repo-pjax-container');
  if (!domElement || !global.MutationObserver) {
    return cb(null);
  }

  var viewSpy = new global.MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        cb(null);
      }
    });
  });

  viewSpy.observe(domElement, {
    attributes: true,
    childList: true,
    characterData: true
  });

  cb(null);
};

// Export the gitHubInjection function for **Node.js**, with
// backwards-compatibility for the old `require()` API. If we're in
// the browser, add `gitHubInjection` as a global object.
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = gitHubInjection;
  }
  exports.gitHubInjection = gitHubInjection;
} else {
  /*jshint -W040 */
  this.gitHubInjection = gitHubInjection;
  /*jshint +W040 */
}

},{}]},{},[1]);
