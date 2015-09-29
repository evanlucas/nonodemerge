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
